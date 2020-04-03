<template>
  <div
    class="bg-white px-3 shadow rounded-lg overflow-hidden"
    :class="showEdit ? 'pb-4' : 'cursor-pointer'"
    style="transition: max-height 2s linear;"
    :style="{ 'max-height': showEdit ? '200rem' : '2rem' }"
  >
    <div @click="editClick">
      <div class="flex flex-row">
        <div class="float-right flex-auto pr-2">
          {{ isNaN(parseInt(min[method])) ? "..." : parseInt(min[method]) }}
        </div>

        <div
          class="w-10/12"
          :style="
            `background-image: linear-gradient(to right, ${minHex}, ${midHex}, ${maxHex});`
          "
          v-if="type == 'linear'"
        ></div>

        <div
          style="flexGrow: 1;"
          v-if="type == 'progression'"
          class="flex flex-row w-10/12"
        >
          <div
            v-for="(stop, index) in colourStops"
            :key="index"
            :style="`background-color: ${stop.hexCode}`"
            class="flex-1"
          ></div>
        </div>

        <div class="text-left flex-auto pl-2">
          {{ isNaN(parseInt(max[method])) ? "..." : parseInt(max[method]) }}
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="p-2" v-if="showEdit">
        <b-field label="Type">
          <b-radio-button v-model="type" class="ml-8" native-value="linear">
            <b-icon icon="chart-bell-curve"></b-icon>
            <span>Linear</span>
          </b-radio-button>

          <b-radio-button v-model="type" native-value="progression">
            <b-icon icon="chart-line"></b-icon>
            <span>Progression</span>
          </b-radio-button>
        </b-field>

        <b-field label="Method">
          <b-radio-button v-model="method" class="ml-8" native-value="metric">
            <span>Metric</span>
          </b-radio-button>

          <b-radio-button v-model="method" native-value="rank">
            <span>Rank</span>
          </b-radio-button>
        </b-field>

        <div v-if="type == 'linear'"></div>

        <div v-if="type == 'progression'">
          <b-field label="Stops">
            <b-input v-model="stops" type="number" min="2" max="25"></b-input>
          </b-field>
        </div>

        <b-field label="Minimum Colour"> </b-field>

        <div
          class="w-full h-8 mb-4 rounded cursor-pointer"
          @click="showMinimumColourModal = true"
          :style="`background-color: ${minHex}`"
        ></div>

        <b-modal
          :active.sync="showMinimumColourModal"
          has-modal-card
          trap-focus
        >
          <div
            class="box has-text-centered"
            style="padding: 0!important; padding-bottom: 1rem!important;"
          >
            <colour-picker
              class="m-auto"
              style="box-shadow: none!important;"
              v-model="minColourPicker"
            />
            <b-button
              class="m-auto mt-4"
              @click="showMinimumColourModal = false"
            >
              Confirm
            </b-button>
          </div>
        </b-modal>

        <b-field label="Mid Colour" v-if="type == 'linear'"> </b-field>

        <div
          class="w-full h-8 mb-4 rounded cursor-pointer"
          @click="showMidColourModal = true"
          :style="`background-color: ${midHex}`"
          v-if="type == 'linear'"
        ></div>

        <b-modal :active.sync="showMidColourModal" has-modal-card trap-focus>
          <div
            class="box has-text-centered"
            style="padding: 0!important; padding-bottom: 1rem!important;"
          >
            <colour-picker
              class="m-auto"
              style="box-shadow: none!important;"
              v-model="midColourPicker"
            />
            <b-button class="m-auto mt-4" @click="showMidColourModal = false">
              Confirm
            </b-button>
          </div>
        </b-modal>

        <b-field label="Maximum Colour"> </b-field>

        <div
          class="w-full h-8 mb-4 rounded cursor-pointer"
          @click="showMaximumColourModal = true"
          :style="`background-color: ${maxHex}`"
        ></div>

        <b-modal
          :active.sync="showMaximumColourModal"
          has-modal-card
          trap-focus
        >
          <div
            class="box has-text-centered"
            style="padding: 0!important; padding-bottom: 1rem!important;"
          >
            <colour-picker
              class="m-auto"
              style="box-shadow: none!important;"
              v-model="maxColourPicker"
            />
            <b-button
              class="m-auto mt-4"
              @click="showMaximumColourModal = false"
            >
              Confirm
            </b-button>
          </div>
        </b-modal>

        <b-button class="m-auto mt-4" @click="save">
          Save
        </b-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { Chrome } from "vue-color";

export default {
  components: {
    "colour-picker": Chrome
  },
  props: {
    min: Object,
    max: Object
  },
  data() {
    return {
      type: "progression", // or "linear"
      stops: "8",
      method: "rank",
      showEdit: false,
      showMinimumColourModal: false,
      showMidColourModal: false,
      showMaximumColourModal: false,
      minColourPicker: {
        rgba: {
          r: 0,
          g: 255,
          b: 0
        }
      },
      midColourPicker: {
        rgba: {
          r: 255,
          g: 255,
          b: 0
        }
      },
      maxColourPicker: {
        rgba: {
          r: 255,
          g: 0,
          b: 0
        }
      }
    };
  },
  methods: {
    editClick() {
      if (!this.showEdit) {
        this.showEdit = true;
      }
    },
    toHex(colour) {
      var red = colour.r.toString(16).padStart(2, "0");
      var green = colour.g.toString(16).padStart(2, "0");
      var blue = colour.b.toString(16).padStart(2, "0");
      return `#${red}${green}${blue}`;
    },
    save() {
      this.showEdit = false;
      this.$emit("updatefunction", this.colourFunction);
    }
  },
  mounted() {
    this.$emit("updatefunction", this.colourFunction);
  },
  watch: {
    min: function() {
      console.log(this.min);
      console.log(this.max);
      this.$emit("updatefunction", this.colourFunction);
    },
    max: function() {
      console.log(this.min);
      console.log(this.max);
      this.$emit("updatefunction", this.colourFunction);
    }
  },
  computed: {
    minColour() {
      return this.minColourPicker.rgba;
    },
    midColour() {
      return this.midColourPicker.rgba;
    },
    maxColour() {
      return this.maxColourPicker.rgba;
    },
    colourStops() {
      var stops = Math.max(Math.min(parseInt(this.stops), 25), 2);
      if (isNaN(stops)) {
        stops = 8;
      }

      var redStep = (this.maxColour.r - this.minColour.r) / (stops - 1);
      var greenStep = (this.maxColour.g - this.minColour.g) / (stops - 1);
      var blueStep = (this.maxColour.b - this.minColour.b) / (stops - 1);

      var result = [...Array(stops - 1)].map((x, index) => {
        var result = {
          colour: {
            r: this.minColour.r + parseInt(index * redStep),
            g: this.minColour.g + parseInt(index * greenStep),
            b: this.minColour.b + parseInt(index * blueStep)
          }
        };
        result.hexCode = this.toHex(result.colour);
        return result;
      });
      result.push({
        colour: this.maxColour,
        hexCode: this.toHex(this.maxColour)
      });
      return result;
    },
    minHex() {
      return this.toHex(this.minColour);
    },
    midHex() {
      return this.toHex(this.midColour);
    },
    maxHex() {
      return this.toHex(this.maxColour);
    },
    colourFunction() {
      const type = this.type;
      const minColourOrig = this.minColour;
      const midColourOrig = this.midColour;
      const maxColourOrig = this.maxColour;
      const colourStops = this.colourStops;
      const stops = this.stops;
      const toHex = this.toHex;
      return function(metrics) {
        /* eslint no-console: ["error", { allow: ["log", "error"] }] */
        //console.log(max);
        var metric = metrics[this.method];
        var relativeMetric =
          (metric - this.min[this.method]) /
          (this.max[this.method] - this.min[this.method]);
        if (isNaN(relativeMetric)) {
          relativeMetric = 1;
        }
        relativeMetric = Math.min(relativeMetric, 1);
        if (type == "progression") {
          var stopCount = Math.max(Math.min(parseInt(stops), 25), 2);
          if (isNaN(stopCount)) {
            stopCount = 8;
          }
          var index = Math.floor(relativeMetric * stopCount);
          if (index == stopCount) {
            index--;
          }
          return colourStops[index].hexCode;
        } else {
          var minColour, maxColour;
          if (relativeMetric < 0.5) {
            minColour = minColourOrig;
            maxColour = midColourOrig;
          } else {
            minColour = midColourOrig;
            maxColour = maxColourOrig;
          }
          var result = {
            r: parseInt(
              minColour.r + relativeMetric * (maxColour.r - minColour.r)
            ),
            g: parseInt(
              minColour.g + relativeMetric * (maxColour.g - minColour.g)
            ),
            b: parseInt(
              minColour.b + relativeMetric * (maxColour.b - minColour.b)
            )
          };
          return toHex(result);
        }
      }.bind(this);
    }
  }
};
</script>

<style>
.animation-content {
  z-index: 99;
}
</style>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 flex flex-col" style="height: 50%;">
      <b-field label="Time Strata"></b-field>

      <b-field>
        <b-checkbox v-model="allTimeStrata">
          All
        </b-checkbox>
      </b-field>

      <div class="overflow-auto">
        <b-field
          v-for="timeStrataValue in metaTimeStrata"
          :key="timeStrataValue.key"
        >
          <b-checkbox
            v-model="timeStrata"
            :native-value="timeStrataValue.key"
            :disabled="allTimeStrata"
          >
            {{ timeStrataValue.value }}
          </b-checkbox>
        </b-field>
      </div>
    </div>

    <div class="mb-20 w-full flex flex-row" style="height:10%;">
      <div class="w-1/2 p-1">
        <a class="button is-dark w-full" @click="apply">
          <Check />
          Confirm
        </a>
      </div>
      <div class="w-1/2 p-1">
        <a class="button is-danger w-full" @click="remove">
          <TrashCan />
          Reset
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";

import Check from "vue-material-design-icons/Check.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  components: {
    Check,
    TrashCan
  },
  data() {
    return {
      allTimeStrata: false
    };
  },
  mounted() {
    if (this.timeStrata.length == this.metaTimeStrata.length) {
      this.allTimeStrata = true;
    }
  },
  computed: {
    ...mapGetters({
      metaTimeStrata: "metaStore/timeStrata"
    }),
    timeStrata: {
      get() {
        return this.$store.state.parameterStore.timeStrata;
      },
      set(value) {
        this.$store.commit("parameterStore/setTimeStrata", value);
      }
    }
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.allTimeStrata = true;
    }
  },
  watch: {
    allTimeStrata: function() {
      if (this.allTimeStrata) {
        this.timeStrata = this.metaTimeStrata.map(x => x.key);
      } else {
        this.timeStrata = [];
      }
    }
  }
};
</script>

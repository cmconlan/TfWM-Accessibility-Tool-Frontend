<template>
  <div class="flex flex-col h-full">
    <div class="p-4 flex flex-col" style="height: 50%;">
      <b-field label="Points of Interest"></b-field>

      <b-field>
        <b-checkbox v-model="allPointOfInterestTypes">
          All
        </b-checkbox>
      </b-field>

      <div class="overflow-auto">
        <b-field
          v-for="pointOfInterestTypesValue in metaPointOfInterestTypes"
          :key="pointOfInterestTypesValue.key"
        >
          <b-checkbox
            v-model="pointOfInterestType"
            :native-value="pointOfInterestTypesValue.key"
            :disabled="allPointOfInterestTypes"
          >
            {{ pointOfInterestTypesValue.value }}
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
      allPointOfInterestTypes: false
    };
  },
  mounted() {
    if (
      this.pointOfInterestType.length == this.metaPointOfInterestTypes.length
    ) {
      this.allPointOfInterestTypes = true;
    }
  },
  computed: {
    ...mapGetters({
      metaPointOfInterestTypes: "metaStore/pointOfInterestTypes"
    }),
    pointOfInterestType: {
      get() {
        return this.$store.state.parameterStore.pointOfInterestTypes;
      },
      set(value) {
        this.$store.commit("parameterStore/setPointOfInterestTypes", value);
      }
    }
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.allPointOfInterestTypes = true;
    }
  },
  watch: {
    allPointOfInterestTypes: function() {
      if (this.allPointOfInterestTypes) {
        this.pointOfInterestType = this.metaPointOfInterestTypes.map(
          x => x.key
        );
      } else {
        this.pointOfInterestType = [];
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 flex flex-col" style="height: 50%;">
      <div class="overflow-auto">
        <b-field
          v-for="populationMetricsValue in metaPopulationMetrics"
          :key="populationMetricsValue.key"
        >
          <b-radio
            v-model="populationMetric"
            :native-value="populationMetricsValue.key"
          >
            {{ populationMetricsValue.value }}
          </b-radio>
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
  computed: {
    ...mapGetters({
      metaPopulationMetrics: "metaStore/populationMetric"
    }),
    populationMetric: {
      get() {
        return this.$store.state.parameterStore.populationMetric;
      },
      set(value) {
        this.$store.commit("parameterStore/setPopulationMetric", value);
      }
    }
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.populationMetric = this.$store.state.metaStore.populationMetric[0].key;
    }
  }
};
</script>

<template>
  <div>
    <section class="p-4">
      <b-field label="Accessibility Metric"></b-field>

      <b-field
        v-for="accessibilityMetricsValue in metaAccessibilityMetrics"
        :key="accessibilityMetricsValue.key"
      >
        <b-radio
          v-model="accessibilityMetric"
          :native-value="accessibilityMetricsValue.key"
        >
          {{ accessibilityMetricsValue.value }}
        </b-radio>
      </b-field>
    </section>

    <div class="absolute bottom-0 mb-20 w-full flex flex-row">
      <div class="w-1/2 p-1">
        <a class="button is-dark w-full" @click="apply">
          <Check />
          Back
        </a>
      </div>
      <div class="w-1/2 p-1">
        <a class="button is-danger w-full" @click="remove">
          <TrashCan />
          Remove
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
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.accessibilityMetric = this.metaAccessibilityMetrics[0];
    }
  },
  computed: {
    ...mapGetters({
      metaAccessibilityMetrics: "metaStore/accessibilityMetric"
    }),
    accessibilityMetric: {
      get() {
        return this.$store.state.parameterStore.accessibilityMetric;
      },
      set(value) {
        this.$store.commit("parameterStore/setAccessibilityMetric", value);
      }
    }
  }
};
</script>

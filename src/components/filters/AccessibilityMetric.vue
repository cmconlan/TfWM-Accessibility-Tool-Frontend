<template>
  <div class="p-4">
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

    <a class="button is-danger mt-4" @click="remove">
      <TrashCan />
      Remove
    </a>
    <a class="button is-accent float-right mt-4" @click="apply">
      <Check />
      Apply
    </a>
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
      EventBus.$emit("refreshFilters");
      this.$emit("close");
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

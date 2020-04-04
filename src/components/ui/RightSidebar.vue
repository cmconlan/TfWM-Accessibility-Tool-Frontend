<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="h-full has-background-white overflow-hidden"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      key="home"
    >
      <h1 class="title has-text-dark m-3 hidden text-right lg:block">Accessibility</h1>
      <h1 class="title has-text-dark m-3 is-4 text-right lg:hidden block">Accessibility</h1>
      <h2 class="subtitle m-3 has-text-primary is-6 text-right">
        Map Accessibility Score
      </h2>

      <h2
        class="subtitle mx-3 mt-16 has-text-dark is-5 text-right"
        style="margin-bottom: 0;"
      >
        <b>Filters</b>
      </h2>
      <transition name="slide-fade" mode="out-in">
        <b-menu v-if="!currentFilter">
          <b-menu-list>
            <FilterHeader
              filter-name="Points of Interest"
              :filter-string="poiFilterString"
              :reversed="true"
              @click="currentFilter = 'poi'"
            />
            <FilterHeader
              filter-name="Time Strata"
              :filter-string="timeStrataFilterString"
              :reversed="true"
              @click="currentFilter = 'time-strata'"
            />
            <FilterHeader
              filter-name="Accessibility Metric"
              :filter-string="accessibilityMetricFilterString"
              :reversed="true"
              @click="currentFilter = 'accessibility-metric'"
            />
          </b-menu-list>
        </b-menu>

        <PointsOfInterest
          v-else-if="currentFilter == 'poi'"
          @close="closeFilter"
        />

        <TimeStrata
          v-else-if="currentFilter == 'time-strata'"
          @close="closeFilter"
        />

        <AccessibilityMetric
          v-else-if="currentFilter == 'accessibility-metric'"
          @close="closeFilter"
        />
      </transition>
      <div
        class="absolute bottom-0 w-full pr-16 py-4 hover:bg-gray-300 cursor-pointer text-right"
        style="transition: 0.2s"
        @click="$emit('collapse')"
      >
        Collapse
        <ArrowCollapseRight class="float-right pl-2" />
      </div>
    </div>
  </transition>
</template>

<script>
import FilterHeader from "@/components/filters/FilterHeader";
import PointsOfInterest from "@/components/filters/PointsOfInterest";
import TimeStrata from "@/components/filters/TimeStrata";
import AccessibilityMetric from "@/components/filters/AccessibilityMetric";
import ArrowCollapseRight from "vue-material-design-icons/ArrowCollapseRight.vue";

export default {
  components: {
    FilterHeader,
    PointsOfInterest,
    TimeStrata,
    AccessibilityMetric,
    ArrowCollapseRight
  },
  data() {
    return {
      currentFilter: null
    };
  },
  methods: {
    closeFilter() {
      this.currentFilter = null;
      this.$store.dispatch("metricStore/fetchAccessibilityMetrics");
    }
  },
  computed: {
    poiFilterString() {
      var result = "";

      if (
        this.$store.state.parameterStore.pointOfInterestTypes.length ==
        this.$store.state.metaStore.pointOfInterestTypes.length
      ) {
        result += "&nbsp&nbsp&nbspAll<br>";
      } else {
        this.$store.state.parameterStore.pointOfInterestTypes.map(
          pointOfInterest => {
            var keyValPair = this.$store.state.metaStore.pointOfInterestTypes.find(
              x => x.key == pointOfInterest
            );
            result += `${keyValPair.value}<br>`;
          }
        );
      }

      return result;
    },
    timeStrataFilterString() {
      var result = "";

      if (
        this.$store.state.parameterStore.timeStrata.length ==
        this.$store.state.metaStore.timeStrata.length
      ) {
        result += "&nbsp&nbsp&nbspAll<br>";
      } else {
        this.$store.state.parameterStore.timeStrata.map(
          timeStrata => {
            var keyValPair = this.$store.state.metaStore.timeStrata.find(
              x => x.key == timeStrata
            );
            result += `${keyValPair.value}<br>`;
          }
        );
      }

      return result;
    },
    accessibilityMetricFilterString() {
      var keyValPair = this.$store.state.metaStore.accessibilityMetric.find(
        x => x.key == this.$store.state.parameterStore.accessibilityMetric
      );
      return keyValPair.value;
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>

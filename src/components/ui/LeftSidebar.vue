<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="w-64 h-full has-background-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      key="home"
    >
      <img src="@/assets/images/window_device.png" class="w-56 m-auto" />
      <transition name="slide-fade" mode="out-in">
        <b-menu v-if="!currentFilter">
          <b-menu-list>
            <FilterHeader
              filter-name="Demographic Group"
              filter-string="All"
              @click="currentFilter = 'demographic'"
            />
            <FilterHeader
              filter-name="Accessibility Metric"
              filter-string="All"
              @click="currentFilter = 'accessibility-metric'"
            />
            <FilterHeader
              filter-name="Geographic Area"
              filter-string="All"
              @click="currentFilter = 'geographic-area'"
            />
            <FilterHeader
              filter-name="Time Strata"
              filter-string="All"
              @click="currentFilter = 'time-strata'"
            />
            <FilterHeader
              filter-name="Points of Interest"
              filter-string="All"
              @click="currentFilter = 'points-of-interest'"
            />
          </b-menu-list>
        </b-menu>

        <DemographicFilter
          v-else-if="currentFilter == 'demographic'"
          @close="currentFilter = null"
        />

        <AccessibilityMetric
          v-else-if="currentFilter == 'accessibility-metric'"
          @close="currentFilter = null"
        />

        <GeographicArea
          v-else-if="currentFilter == 'geographic-area'"
          @close="currentFilter = null"
        />

        <TimeStrata
          v-else-if="currentFilter == 'time-strata'"
          @close="currentFilter = null"
        />

        <PointsOfInterest
          v-else-if="currentFilter == 'points-of-interest'"
          @close="currentFilter = null"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import FilterHeader from "@/components/filters/FilterHeader";
import DemographicFilter from "@/components/filters/DemographicFilter";
import AccessibilityMetric from "@/components/filters/AccessibilityMetric";
import GeographicArea from "@/components/filters/GeographicArea";
import TimeStrata from "@/components/filters/TimeStrata";
import PointsOfInterest from "@/components/filters/PointsOfInterest";

export default {
  components: {
    FilterHeader,
    DemographicFilter,
    AccessibilityMetric,
    GeographicArea,
    TimeStrata,
    PointsOfInterest
  },
  data() {
    return {
      currentFilter: null
    };
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
  transform: translateX(-200px);
  opacity: 0;
}
</style>

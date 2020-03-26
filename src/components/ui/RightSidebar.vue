<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="h-full has-background-white overflow-hidden"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      key="home"
    >
      <h1 class="title has-text-dark m-3 text-right">Accessibility</h1>
      <h2 class="subtitle m-3 has-text-primary is-6 text-right">Map Accessibility Score</h2>

      <h2 class="subtitle mx-3 mt-16 has-text-dark is-5 text-right" style="margin-bottom: 0;"><b>Filters</b></h2>
      <transition name="slide-fade" mode="out-in">
        <b-menu v-if="!currentFilter">

          <b-menu-list>
            <FilterHeader
              filter-name="Demographic Group"
              :filter-string="demographicFilterString"
              @click="currentFilter = 'demographic'"
            />
            <FilterHeader
              filter-name="Population Metric"
              :filter-string="populationMetricFilterString"
              @click="currentFilter = 'population-metric'"
            />
          </b-menu-list>
        </b-menu>

        <DemographicFilter
          v-else-if="currentFilter == 'demographic'"
          @close="currentFilter = null"
        />

        <PopulationMetric
          v-else-if="currentFilter == 'population-metric'"
          @close="currentFilter = null"
        />

      </transition>
      <div class="absolute bottom-0 mb-6 w-full pr-16 py-2 hover:bg-gray-300 cursor-pointer text-right" style="transition: 0.2s" @click="$emit('collapse')">
        Collapse
        <ArrowCollapseRight class="float-right pl-2" />
      </div>
    </div>
  </transition>
</template>

<script>
import FilterHeader from "@/components/filters/FilterHeader";
import PopulationMetric from "@/components/filters/PopulationMetric";
import DemographicFilter from "@/components/filters/DemographicFilter";
import ArrowCollapseRight from "vue-material-design-icons/ArrowCollapseRight.vue";

export default {
  components: {
    FilterHeader,
    PopulationMetric,
    DemographicFilter,
    ArrowCollapseRight
  },
  data() {
    return {
      currentFilter: null
    };
  },
  computed: {
    demographicFilterString() {
      var result = "All";
      return result;
    },
    populationMetricFilterString() {
      return "All";
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
  transform: translateX(-200px);
  opacity: 0;
}
</style>

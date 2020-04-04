<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="h-full has-background-white overflow-hidden"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      key="home"
    >
      <h1 class="title has-text-dark m-3 hidden lg:block">Population</h1>
      <h1 class="title has-text-dark m-3 is-4 lg:hidden block">Population</h1>
      <h2 class="subtitle m-3 has-text-primary is-6">Map Population Density</h2>

      <h2
        class="subtitle mx-3 mt-16 has-text-dark is-5"
        style="margin-bottom: 0;"
      >
        <b>Filters</b>
      </h2>
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
          @close="closeFilter"
        />

        <PopulationMetric
          v-else-if="currentFilter == 'population-metric'"
          @close="closeFilter"
        />
      </transition>
      <div
        class="absolute bottom-0 w-full pl-10 py-4 hover:bg-gray-300 cursor-pointer"
        style="transition: 0.2s"
        @click="$emit('collapse')"
      >
        <ArrowCollapseLeft class="float-left pr-2" />
        Collapse
      </div>
    </div>
  </transition>
</template>

<script>
import FilterHeader from "@/components/filters/FilterHeader";
import PopulationMetric from "@/components/filters/PopulationMetric";
import DemographicFilter from "@/components/filters/DemographicFilter";
import ArrowCollapseLeft from "vue-material-design-icons/ArrowCollapseLeft.vue";

export default {
  components: {
    FilterHeader,
    PopulationMetric,
    DemographicFilter,
    ArrowCollapseLeft
  },
  data() {
    return {
      currentFilter: null
    };
  },
  methods: {
    closeFilter() {
      this.currentFilter = null;
      this.$store.dispatch("metricStore/fetchPopulationMetrics");
    }
  },
  computed: {
    demographicFilterString() {
      var result = "";

      if (
        this.$store.state.parameterStore.demographic.length ==
        this.$store.state.metaStore.demographic.length
      ) {
        result += "&nbsp&nbsp&nbspAll<br>";
      } else {
        this.$store.state.parameterStore.demographic.map(demographic => {
          var keyValPair = this.$store.state.metaStore.demographic.find(
            x => x.key == demographic
          );
          result += `&nbsp&nbsp&nbsp- ${keyValPair.value}<br>`;
        });
      }

      return result;
    },
    populationMetricFilterString() {
      var selectedKey = this.$store.state.parameterStore.populationMetric;
      var result = this.$store.state.metaStore.populationMetric.find(
        x => x.key == selectedKey
      );
      return result ? result.value : "";
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

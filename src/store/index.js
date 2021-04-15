import Vue from "vue";
import Vuex from "vuex";
import Moment from "moment";

import metaService from "@/services/metaService";
import metricService from "@/services/metricService";

Vue.use(Vuex);

const metaStore = {
  namespaced: true,
  state: {
    timeStrata: [],
    demographic: [],
    populationMetric: [],
    accessibilityMetric: [],
    pointOfInterestTypes: []
  },
  mutations: {
    setTimeStrata(state, value) {
      state.timeStrata = value;
    },
    setDemographic(state, value) {
      state.demographic = value;
    },
    setPopulationMetric(state, value) {
      state.populationMetric = value;
    },
    setAccessibilityMetric(state, value) {
      state.accessibilityMetric = value;
    },
    setPointOfInterestTypes(state, value) {
      state.pointOfInterestTypes = value;
    }
  },
  actions: {
    fetchAllMetaData({ commit }) {
      var requests = [];
      requests.push(
        metaService.fetchDemographic().then(response => {
          commit("setDemographic", response.data);
        })
      );
      requests.push(
        metaService.fetchTimeStrata().then(response => {
          commit("setTimeStrata", response.data);
        })
      );
      requests.push(
        metaService.fetchPopulationMetric().then(response => {
          commit("setPopulationMetric", response.data);
        })
      );
      requests.push(
        metaService.fetchAccessibilityMetric().then(response => {
          commit("setAccessibilityMetric", response.data);
        })
      );
      requests.push(
        metaService.fetchPointOfInterestTypes().then(response => {
          commit("setPointOfInterestTypes", response.data);
        })
      );
      return Promise.all(requests);
    }
  },
  getters: {
    demographic: state => {
      return state.demographic;
    },
    timeStrata: state => {
      return state.timeStrata;
    },
    populationMetric: state => {
      return state.populationMetric;
    },
    accessibilityMetric: state => {
      return state.accessibilityMetric;
    },
    pointOfInterestTypes: state => {
      return state.pointOfInterestTypes;
    }
  }
};

const parameterStore = {
  namespaced: true,
  state: {
    demographic: [],
    timeStrata: [],
    populationMetric: null,
    accessibilityMetric: null,
    pointOfInterestTypes: []
  },
  mutations: {
    setDemographic(state, value) {
      state.demographic = value;
    },
    setTimeStrata(state, value) {
      state.timeStrata = value;
    },
    setPopulationMetric(state, value) {
      state.populationMetric = value;
    },
    setAccessibilityMetric(state, value) {
      state.accessibilityMetric = value;
    },
    setPointOfInterestTypes(state, value) {
      state.pointOfInterestTypes = value;
    }
  },
  actions: {
    initialiseParameters({ commit, rootGetters }) {
      commit(
        "setDemographic",
        rootGetters["metaStore/demographic"].map(x => x.key)
      );
      commit(
        "setTimeStrata",
        rootGetters["metaStore/timeStrata"].map(x => x.key)
      );
      commit(
        "setPopulationMetric",
        rootGetters["metaStore/populationMetric"][0]
          ? rootGetters["metaStore/populationMetric"][0].key
          : null
      );
      commit(
        "setAccessibilityMetric",
        rootGetters["metaStore/accessibilityMetric"][0]
          ? rootGetters["metaStore/accessibilityMetric"][0].key
          : null
      );
      commit(
        "setPointOfInterestTypes",
        rootGetters["metaStore/pointOfInterestTypes"].map(x => x.key)
      );
    }
  },
  getters: {
    demographic: state => {
      return state.demographic;
    },
    timeStrata: state => {
      return state.timeStrata;
    },
    populationMetric: state => {
      return state.populationMetric;
    },
    accessibilityMetric: state => {
      return state.accessibilityMetric;
    },
    pointOfInterestTypes: state => {
      return state.pointOfInterestTypes;
    },
    populationMetricParamString: state => {
      var result = `?population-metric=${state.populationMetric}`;
      state.demographic.map(demographic => {
        result += `&demographic-group=${demographic}`;
      });
      state.pointOfInterestTypes.map(POIType => {
        result += `&point-of-interest-types=${POIType}`;
      });
      state.timeStrata.map(strata => {
        result += `&time-strata=${strata}`;
      });
      return result;
    },
    accessibilityMetricParamString: state => {
      var result = `?accessibility-metric=${state.accessibilityMetric}`;
      state.pointOfInterestTypes.map(POIType => {
        result += `&point-of-interest-types=${POIType}`;
      });
      state.timeStrata.map(strata => {
        result += `&time-strata=${strata}`;
      });
      return result;
    }
  }
};

const mapStore = {
  namespaced: true,
  state: {
    mapSync: true,
    selectedOA: null,
    masterMapId: null,
    masterMapTimestamp: Moment()
  },
  mutations: {
    setMapSync(state, value) {
      state.mapSync = value;
    },
    setSelectedOA(state, value) {
      state.selectedOA = value;
    },
    setMasterMapId(state, value) {
      state.masterMapId = value;
      state.masterMapTimestamp = Moment();
    }
  },
  getters: {
    masterMapId: state => {
      return state.masterMapId;
    },
    masterMapTimestamp: state => {
      return state.masterMapTimestamp;
    }
  }
};

const metricStore = {
  namespaced: true,
  state: {
    outputAreas: null,
    populationMetrics: [],
    accessibilityMetrics: [],
    populationMetricError: false,
    accessibilityMetricError: false,
    highLevelAccessibilityMetrics: [],
    demographicLevelAccessibilityMetrics: [],
  },
  mutations: {
    setOutputAreas(state, value) {
      state.outputAreas = value;
    },
    setPopulationMetrics(state, value) {
      state.populationMetrics = value;
    },
    setAccessibilityMetrics(state, value) {
      state.accessibilityMetrics = value;
    },
    setPopulationMetricError(state, value) {
      state.populationMetricError = value;
    },
    setAccessibilityMetricError(state, value) {
      state.accessibilityMetricError = value;
    },
    setHighLevelAccessibilityMetrics(state, value) {
      state.highLevelAccessibilityMetrics = value;
    },
    setDemographicLevelAccessibilityMetrics(state, value) {
      state.demographicLevelAccessibilityMetrics = value;
    },
  },
  actions: {
    fetchOutputAreas({ commit }) {
      return metricService.fetchOutputAreas().then(response => {
        commit("setOutputAreas", response.data);
      });
    },
    fetchPopulationMetrics({ commit, rootGetters }) {
      commit("setPopulationMetrics", []);
      return metricService
        .fetchPopulationMetrics(
          rootGetters["parameterStore/populationMetricParamString"]
        )
        .then(response => {
          commit("setPopulationMetrics", response.data);
        })
        .catch(() => {
          commit("setPopulationMetricError", true);
        });
    },
    fetchAccessibilityMetrics({ commit, rootGetters }) {
      commit("setAccessibilityMetrics", []);
      return metricService
        .fetchAccessibilityMetrics(
          rootGetters["parameterStore/accessibilityMetricParamString"]
        )
        .then(response => {
          commit("setAccessibilityMetrics", response.data['oa-level']);
          commit("setHighLevelAccessibilityMetrics", response.data['high-level']);
          commit("setDemographicLevelAccessibilityMetrics", response.data['demographic-level']);
        })
        .catch(() => {
          commit("setAccessibilityMetricError", true);
        });
    },
    fetchAll({ dispatch }) {
      return dispatch("fetchAccessibilityMetrics").then(() => {
        return dispatch("fetchPopulationMetrics").then(() => {
          return dispatch("fetchOutputAreas");
        });
      });
    }
  },
  getters: {
    outputAreas: state => {
      return state.outputAreas;
    },
    populationMetrics: state => {
      return state.populationMetrics;
    },
    accessibilityMetrics: state => {
      return state.accessibilityMetrics;
    },
    populationMetric: state => id => {
      return state.populationMetrics[id];
    },
    accessibilityMetric: state => id => {
      return state.accessibilityMetrics[id];
    },
    highLevelAccessibilityMetrics: state => {
      return state.highLevelAccessibilityMetrics;
    },
    demographicLevelAccessibilityMetrics: state => {
      return state.demographicLevelAccessibilityMetrics;
    },
    populationMetricMin: state => {
      if (state.populationMetrics.length == 0) {
        return { metric: NaN, rank: NaN };
      }
      return {
        metric: Math.min(
          ...Object.values(state.populationMetrics).map(x => x.metric)
        ),
        rank: 1
      };
    },
    populationMetricMax: state => {
      if (state.populationMetrics.length == 0) {
        return { metric: NaN, rank: NaN };
      }
      return {
        metric: Math.max(
          ...Object.values(state.populationMetrics).map(x => x.metric)
        ),
        rank: Object.values(state.populationMetrics).length
      };
    },
    accessibilityMetricMin: state => {
      if (state.accessibilityMetrics.length == 0) {
        return { metric: NaN, rank: NaN };
      }
      return {
        metric: Math.min(
          ...Object.values(state.accessibilityMetrics).map(x => x.metric)
        ),
        rank: 1
      };
    },
    accessibilityMetricMax: state => {
      if (state.accessibilityMetrics.length == 0) {
        return { metric: NaN, rank: NaN };
      }
      return {
        metric: Math.max(
          ...Object.values(state.accessibilityMetrics).map(x => x.metric)
        ),
        rank: Object.values(state.accessibilityMetrics).length
      };
    }
  }
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    mapStore,
    metaStore,
    metricStore,
    parameterStore
  }
});

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
    }
  }
};

const mapStore = {
  namespaced: true,
  state: {
    masterMapId: null,
    masterMapTimestamp: Moment()
  },
  mutations: {
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
    accessibilityMetrics: []
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
    }
  },
  actions: {
    fetchOutputAreas({ commit }) {
      return metricService.fetchOutputAreas().then(response => {
        commit("setOutputAreas", response.data);
      });
    },
    fetchPopulationMetrics({ commit }) {
      return metricService.fetchPopulationMetrics().then(response => {
        commit("setPopulationMetrics", response.data);
      });
    },
    fetchAccessibilityMetrics({ commit }) {
      return metricService.fetchAccessibilityMetrics().then(response => {
        commit("setAccessibilityMetrics", response.data);
      });
    },
    fetchAll({ dispatch }) {
      return Promise.all([
        dispatch("fetchOutputAreas"),
        dispatch("fetchPopulationMetrics"),
        dispatch("fetchAccessibilityMetrics")
      ]);
    }
  },
  getters: {
    outputAreas: (state, getters) => {
      if (!state.outputAreas) {
        return null;
      }
      if (state.populationMetrics.length == 0) {
        return null;
      }
      if (state.accessibilityMetrics.length == 0) {
        return null;
      }
      var result = { ...state.outputAreas };
      result.features = result.features.map(oa => {
        var id = oa.properties.id;
        var populationMetric = state.populationMetrics.find(
          x => (x.output_area_id = id)
        ).metric;
        var accessibilityMetric = state.accessibilityMetrics.find(
          x => (x.output_area_id = id)
        ).accessibility;
        oa.properties.populationMetric = populationMetric;
        oa.properties.relativePopulationMetric =
          (populationMetric - getters.populationMetricMin) /
          (getters.populationMetricMax - getters.populationMetricMin);
        oa.properties.accessibilityMetric = accessibilityMetric;
        oa.properties.relativeAccessibilityMetric =
          (accessibilityMetric - getters.accessibilityMetricMin) /
          (getters.accessibilityMetricMax - getters.accessibilityMetricMin);
        return oa;
      });
      return result;
    },
    populationMetricMin: state => {
      if (state.populationMetrics.length == 0) {
        return 0;
      }
      return state.populationMetrics.reduce((prev, curr) =>
        prev.metric < curr.metric ? prev : curr
      ).metric;
    },
    populationMetricMax: state => {
      if (state.populationMetrics.length == 0) {
        return 100;
      }
      return state.populationMetrics.reduce((prev, curr) =>
        prev.metric > curr.metric ? prev : curr
      ).metric;
    },
    accessibilityMetricMin: state => {
      if (state.accessibilityMetrics.length == 0) {
        return 0;
      }
      return state.accessibilityMetrics.reduce((prev, curr) =>
        prev.accessibility < curr.accessibility ? prev : curr
      ).accessibility;
    },
    accessibilityMetricMax: state => {
      if (state.accessibilityMetrics.length == 0) {
        return 100;
      }
      return state.accessibilityMetrics.reduce((prev, curr) =>
        prev.accessibility > curr.accessibility ? prev : curr
      ).accessibility;
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

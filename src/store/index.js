import Vue from "vue";
import Vuex from "vuex";
import Moment from "moment";

import metaService from "@/services/metaService";

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
    timeStrata: null,
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
        rootGetters["metaStore/timeStrata"][0]
          ? rootGetters["metaStore/timeStrata"][0].key
          : null
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
      return state.ethnicity;
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

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    mapStore,
    metaStore,
    parameterStore
  }
});

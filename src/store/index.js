import Vue from "vue";
import Vuex from "vuex";
import Moment from "moment";

import metaService from "@/services/metaService";

Vue.use(Vuex);

const metaStore = {
  namespaced: true,
  state: {
    ethnicity: [],
    timeStrata: [],
    geographicArea: [],
    employmentStatus: [],
    disabilityStatus: [],
    accessibilityMetric: [],
    pointOfInterestTypes: []
  },
  mutations: {
    setEthnicity(state, value) {
      state.ethnicity = value;
    },
    setTimeStrata(state, value) {
      state.timeStrata = value;
    },
    setGeographicArea(state, value) {
      state.geographicArea = value;
    },
    setEmploymentStatus(state, value) {
      state.employmentStatus = value;
    },
    setDisabilityStatus(state, value) {
      state.disabilityStatus = value;
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
        metaService.fetchEthnicity().then(response => {
          commit("setEthnicity", response.data);
        })
      );
      requests.push(
        metaService.fetchTimeStrata().then(response => {
          commit("setTimeStrata", response.data);
        })
      );
      requests.push(
        metaService.fetchGeographicArea().then(response => {
          commit("setGeographicArea", response.data);
        })
      );
      requests.push(
        metaService.fetchEmploymentStatus().then(response => {
          commit("setEmploymentStatus", response.data);
        })
      );
      requests.push(
        metaService.fetchDisabilityStatus().then(response => {
          commit("setDisabilityStatus", response.data);
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
    ethnicity: state => {
      return state.ethnicity;
    },
    timeStrata: state => {
      return state.timeStrata;
    },
    geographicArea: state => {
      return state.geographicArea;
    },
    employmentStatus: state => {
      return state.employmentStatus;
    },
    disabilityStatus: state => {
      return state.disabilityStatus;
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
    ageRange: {
      min: 0,
      max: 100
    },
    ethnicity: [],
    timeStrata: null,
    geographicArea: [],
    employmentStatus: [],
    disabilityStatus: [],
    accessibilityMetric: null,
    pointOfInterestTypes: []
  },
  mutations: {
    setAgeRangeMin(state, value) {
      state.ageRange.min = value;
    },
    setAgeRangeMax(state, value) {
      state.ageRange.max = value;
    },
    setEthnicity(state, value) {
      state.ethnicity = value;
    },
    setTimeStrata(state, value) {
      state.timeStrata = value;
    },
    setGeographicArea(state, value) {
      state.geographicArea = value;
    },
    setEmploymentStatus(state, value) {
      state.employmentStatus = value;
    },
    setDisabilityStatus(state, value) {
      state.disabilityStatus = value;
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
      commit("setAgeRangeMin", 0);
      commit("setAgeRangeMax", 100);
      commit(
        "setEthnicity",
        rootGetters["metaStore/ethnicity"].map(x => x.key)
      );
      commit(
        "setTimeStrata",
        rootGetters["metaStore/timeStrata"][0]
          ? rootGetters["metaStore/timeStrata"][0].key
          : null
      );
      commit(
        "setGeographicArea",
        rootGetters["metaStore/geographicArea"].map(x => x.key)
      );
      commit(
        "setEmploymentStatus",
        rootGetters["metaStore/employmentStatus"].map(x => x.key)
      );
      commit(
        "setDisabilityStatus",
        rootGetters["metaStore/disabilityStatus"].map(x => x.key)
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
    ethnicity: state => {
      return state.ethnicity;
    },
    ageRange: state => {
      return state.ageRange;
    },
    timeStrata: state => {
      return state.timeStrata;
    },
    geographicArea: state => {
      return state.geographicArea;
    },
    employmentStatus: state => {
      return state.employmentStatus;
    },
    disabilityStatus: state => {
      return state.disabilityStatus;
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

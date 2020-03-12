import Vue from "vue";
import Vuex from "vuex";

import metaService from "@/services/metaService";

Vue.use(Vuex);

const metaStore = {
  namespaced: true,
  state: {
    ethnicity: [],
    timeStrata: [],
    GeographicArea: [],
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
      state.GeographicArea = value;
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
    fetchAllMetaData ({ commit }) {
      metaService.fetchEthnicity().then (response => {
        commit("setEthnicity", response.data);
      });
      metaService.fetchTimeStrata().then (response => {
        commit("setTimeStrata", response.data);
      });
      metaService.fetchGeographicArea().then (response => {
        commit("setGeographicArea", response.data);
      });
      metaService.fetchEmploymentStatus().then (response => {
        commit("setEmploymentStatus", response.data);
      });
      metaService.fetchDisabilityStatus().then (response => {
        commit("setDisabilityStatus", response.data);
      });
      metaService.fetchAccessibilityMetric().then (response => {
        commit("setAccessibilityMetric", response.data);
      });
      metaService.fetchPointOfInterestTypes().then (response => {
        commit("setPointOfInterestTypes", response.data);
      });
    }
  },
  getters: {
    ethnicity: state => {
      return state.ethnicity
    },
    timeStrata: state => {
      return state.timeStrata
    },
    GeographicArea: state => {
      return state.GeographicArea
    },
    employmentStatus: state => {
      return state.employmentStatus
    },
    disabilityStatus: state => {
      return state.disabilityStatus
    },
    accessibilityMetric: state => {
      return state.accessibilityMetric
    },
    pointOfInterestTypes: state => {
      return state.pointOfInterestTypes
    }
  }
}

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
    metaStore
  }
});

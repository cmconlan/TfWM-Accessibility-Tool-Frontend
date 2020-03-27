import * as API from "@/services/api";

export default {
  fetchDemographic() {
    return API.client.get(`/meta/demographic`);
  },
  fetchTimeStrata() {
    return API.client.get(`/meta/time-strata`);
  },
  fetchPopulationMetric() {
    return API.client.get(`/meta/population-metric`);
  },
  fetchAccessibilityMetric() {
    return API.client.get(`/meta/accessibility-metric`);
  },
  fetchPointOfInterestTypes() {
    return API.client.get(`/meta/point-of-interest-type`);
  }
};

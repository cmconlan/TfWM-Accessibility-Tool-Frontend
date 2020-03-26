import * as API from "@/services/api";

export default {
  fetchEthnicity() {
    return API.client.get(`/meta/ethnicity`);
  },
  fetchTimeStrata() {
    return API.client.get(`/meta/time-strata`);
  },
  fetchGeographicArea() {
    return API.client.get(`/meta/geographic-area`);
  },
  fetchEmploymentStatus() {
    return API.client.get(`/meta/employment-status`);
  },
  fetchDisabilityStatus() {
    return API.client.get(`/meta/disability-status`);
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

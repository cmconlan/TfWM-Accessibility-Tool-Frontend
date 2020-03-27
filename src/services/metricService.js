import * as API from "@/services/api";

export default {
  fetchOutputAreas() {
    return API.client.get(`/output-areas`);
  },
  fetchPopulationMetrics() {
    return API.client.get(`/population-metrics`);
  },
  fetchAccessibilityMetrics() {
    return API.client.get(`/accessibility-metrics`);
  }
};

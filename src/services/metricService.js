import * as API from "@/services/api";

export default {
  fetchOutputAreas() {
    return API.client.get(`/output-areas`);
  },
  fetchPopulationMetrics(paramString) {
    return API.client.get(`/population-metrics${paramString}`);
  },
  fetchAccessibilityMetrics(paramString) {
    return API.client.get(`/accessibility-metrics${paramString}`);
  }
};

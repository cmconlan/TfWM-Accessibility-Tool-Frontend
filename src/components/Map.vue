<template>
  <div style="height: calc(100vh - 3rem)">
    <l-map
      v-if="isVisible"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <b-loading :is-full-page="false" :active="loading" :can-cancel="true" style="z-index: 99999;"></b-loading>
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geojson" :options-style="styleFunction" />
    </l-map>
    <ColourScale
      :min="min"
      :max="max"
      class="absolute top-0 right-0 w-1/2 m-2"
      style="z-index: 9999;"
      @updatefunction="updateColourFunction"
    />
  </div>
</template>

<script>
import Moment from "moment";
import { mapGetters } from "vuex";

import { latLng } from "leaflet";
import { EventBus } from "@/event-bus.js";
import ColourScale from "@/components/ui/ColourScale";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer,
    ColourScale
  },
  mounted() {
    EventBus.$on("refreshMaps", () => {
      window.dispatchEvent(new Event("resize"));
      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 600);
    });
    EventBus.$on("updateMapCenter", (id, newCenter) => {
      if (id != this.id) {
        this.center = newCenter;
      }
    });
    EventBus.$on("updateMapZoom", (id, newZoom) => {
      if (id != this.id) {
        this.zoom = newZoom;
      }
    });
  },
  props: {
    id: Number,
    metricType: String,
    isVisible: Boolean
  },
  methods: {
    updateColourFunction(fn) {
      this.colourFunctionUpdateWatch = !this.colourFunctionUpdateWatch;
      this.colourFunction = fn;
    },
    centerUpdate(center) {
      this.center = center;

      var timeout = this.$store.getters["mapStore/masterMapTimestamp"].isBefore(
        Moment().subtract(2000, "milliseconds")
      );
      var thisIsMasterMap =
        this.$store.getters["mapStore/masterMapId"] == this.id;

      if (
        timeout ||
        thisIsMasterMap ||
        this.$store.getters["mapStore/masterMapId"] == null
      ) {
        this.$store.commit("mapStore/setMasterMapId", this.id);
      }
      if (this.$store.getters["mapStore/masterMapId"] == this.id) {
        EventBus.$emit("updateMapCenter", this.id, center);
        EventBus.$emit("updateMapZoom", this.id, this.zoom);
      }
    },
    zoomUpdate(zoom) {
      this.zoom = zoom;

      var timeout = this.$store.getters["mapStore/masterMapTimestamp"].isBefore(
        Moment().subtract(2000, "milliseconds")
      );
      var thisIsMasterMap =
        this.$store.getters["mapStore/masterMapId"] == this.id;

      if (
        timeout ||
        thisIsMasterMap ||
        this.$store.getters["mapStore/masterMapId"] == null
      ) {
        this.$store.commit("mapStore/setMasterMapId", this.id);
      }
      if (this.$store.getters["mapStore/masterMapId"] == this.id) {
        EventBus.$emit("updateMapZoom", this.id, zoom);
        EventBus.$emit("updateMapCenter", this.id, this.center);
      }
    }
  },
  computed: {
    ...mapGetters({
      geojsonSource: "metricStore/outputAreas",
      populationMetrics: "metricStore/populationMetrics",
      accessibilityMetrics: "metricStore/accessibilityMetrics"
    }),
    styleFunction() {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */

      const colourFunction = this.colourFunction;
      /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "updateWatch" }]*/
      const updateWatch = this.colourFunctionUpdateWatch;

      return ((outputArea) => {
        var metric;

        if (this.metricType == "population") {
          metric = this.$store.getters['metricStore/populationMetric'](outputArea.id);
        } else {
          metric = this.$store.getters['metricStore/accessibilityMetric'](outputArea.id);
        }

        if (!metric) {
          this.OAsLoaded ++;
          return {
            weight: 0.5,
            color: "#050505",
            opacity: 1,
            fillColor: "#000000",
            fillOpacity: 1
          };
        }
        var colour = colourFunction(metric);

        this.OAsLoaded ++;

        return {
          weight: 0.5,
          color: "#050505",
          opacity: 1,
          fillColor: colour,
          fillOpacity: 0.4
        };
      }).bind(this);
    },
    geojson() {
      return (isNaN(this.min.rank) || isNaN(this.max.rank)) ? null : this.geojsonSource;
    },
    min() {
      if (this.metricType == "population") {
        return this.$store.getters["metricStore/populationMetricMin"];
      } else {
        return this.$store.getters["metricStore/accessibilityMetricMin"];
      }
    },
    max() {
      if (this.metricType == "population") {
        return this.$store.getters["metricStore/populationMetricMax"];
      } else {
        return this.$store.getters["metricStore/accessibilityMetricMax"];
      }
    },
    loading() {
      return this.OAsLoaded < this.totalOAs;
    }
  },
  watch: {
    geojson: function() {
      this.totalOAs = this.geojson.features.length;
      this.OAsLoaded = 0;
    },
    populationMetrics: function () {
      this.OAsLoaded = 0;
    },
    accessibilityMetrics: function () {
      this.OAsLoaded = 0;
    }
  },
  data() {
    return {
      center: latLng(52.5, -1.83),
      zoom: 11,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>',
      mapOptions: {
        zoomSnap: 0.5
      },
      totalOAs: 1,
      OAsLoaded: 0,
      colourFunction: null,
      colourFunctionUpdateWatch: false
    };
  }
};
</script>

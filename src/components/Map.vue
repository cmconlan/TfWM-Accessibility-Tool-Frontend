<template>
  <div style="height: calc(100vh - 3rem)">
    <l-map :zoom="zoom" :center="center" :options="mapOptions" @update:center="centerUpdate" @update:zoom="zoomUpdate">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geojson" :options-style="styleFunction" />
    </l-map>
    <div class="absolute bg-white top-0 right-0 w-1/2 m-2 rounded-full px-3 flex flex-row" style="z-index: 999999999;">
      <div class="float-right w-1/12">
        {{ min }}
      </div>
      <div class="w-10/12 bg-blue-500 mx-2" style="background-image: linear-gradient(to right, green, yellow, red);">
      </div>
      <div class="text-right w-1/12">
        {{ max }}
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import { mapGetters } from "vuex";

import { latLng } from "leaflet";
import { EventBus } from "@/event-bus.js"
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LGeoJson,
    LTileLayer
  },
  mounted() {
    EventBus.$on('refreshMaps', () => {
      window.dispatchEvent(new Event('resize'));
      setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 600);
    });
    EventBus.$on('updateMapCenter', (id, newCenter) => {
      if (id != this.id) {
        this.center = newCenter;
      }
    });
    EventBus.$on('updateMapZoom', (id, newZoom) => {
      if (id != this.id) {
        this.zoom = newZoom;
      }
    });
  },
  props: {
    id: Number,
    metricType: String
  },
  methods: {
    centerUpdate(center) {
      this.center = center;

      var timeout = this.$store.getters['mapStore/masterMapTimestamp'].isBefore(Moment().subtract(500, "milliseconds"))
      var thisIsMasterMap = this.$store.getters['mapStore/masterMapId'] == this.id;

      if (timeout || thisIsMasterMap || this.$store.getters['mapStore/masterMapId'] == null) {
        this.$store.commit('mapStore/setMasterMapId', this.id);
      }
      if (this.$store.getters['mapStore/masterMapId'] == this.id) {
        EventBus.$emit('updateMapCenter', this.id, center);
        EventBus.$emit('updateMapZoom', this.id, this.zoom);
      }
    },
    zoomUpdate(zoom) {
      this.zoom = zoom;

      var timeout = this.$store.getters['mapStore/masterMapTimestamp'].isBefore(Moment().subtract(500, "milliseconds"))
      var thisIsMasterMap = this.$store.getters['mapStore/masterMapId'] == this.id;

      if (timeout || thisIsMasterMap || this.$store.getters['mapStore/masterMapId'] == null) {
        this.$store.commit('mapStore/setMasterMapId', this.id);
      }
      if (this.$store.getters['mapStore/masterMapId'] == this.id) {
        EventBus.$emit('updateMapZoom', this.id, zoom);
        EventBus.$emit('updateMapCenter', this.id, this.center);
      }
    },
    styleFunction(outputArea) {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */

      console.log(outputArea);

      var metric;
      if (this.metricType == 'population') {
        console.log("population");
        metric = outputArea.properties.relativePopulationMetric;
      } else {
        console.log("access");
        metric = outputArea.properties.relativeAccessibilityMetric;
      }
      console.log(metric);

      var colour;
      if (metric < 0.5) {
        colour = `#${(metric * 255).toString(16).padStart(2, '0')}FF00`;
      } else {
        colour = `#FF${((1 - metric) * 255).toString(16).padStart(2, '0')}00`;
      }
      console.log(colour);

      return {
        weight: 1.5,
        color: colour,
        opacity: 1,
        fillColor: colour,
        fillOpacity: 0.4
      };
    }
  },
  computed: {
    ...mapGetters({
      geojson: "metricStore/outputAreas"
    }),
    min() {
      if (this.metricType == 'population') {
        return this.$store.getters['metricStore/populationMetricMin'];
      } else {
        return this.$store.getters['metricStore/accessibilityMetricMin'];
      }
    },
    max() {
      if (this.metricType == 'population') {
        return this.$store.getters['metricStore/populationMetricMax'];
      } else {
        return this.$store.getters['metricStore/accessibilityMetricMax'];
      }
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
      }
    };
  }
};
</script>

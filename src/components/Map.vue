<template>
  <div style="height: calc(100vh - 3rem)">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 11,
      center: latLng(52.5, -1.83),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '<a href="http://osm.org/copyright">OpenStreetMap</a>',
      mapOptions: {
        zoomSnap: 0.50
      }
    };
  }
};
</script>

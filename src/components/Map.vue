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
      <l-geo-json
        :geojson="geojson"
        :options-style="styleFunction"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LGeoJson,
    LTileLayer
  },
  methods: {
    styleFunction(x) {
    /* eslint no-console: ["error", { allow: ["log", "error"] }] */

      console.log(x);
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: "#ECEFF1",
          fillOpacity: 1
        };
      };
    },
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
      },
      geojson: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "stroke": "#555555",
              "stroke-width": 2,
              "stroke-opacity": 1,
              "fill": "#555555",
              "fill-opacity": 0.5,
              "test": "test"
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -1.5616464614868162,
                    52.37077828509749
                  ],
                  [
                    -1.5622901916503906,
                    52.373791403989124
                  ],
                  [
                    -1.5561962127685547,
                    52.37724968708041
                  ],
                  [
                    -1.553363800048828,
                    52.38060291509318
                  ],
                  [
                    -1.5530633926391602,
                    52.38235801885472
                  ],
                  [
                    -1.5543937683105469,
                    52.38447976756064
                  ],
                  [
                    -1.557912826538086,
                    52.385056027378766
                  ],
                  [
                    -1.562376022338867,
                    52.385501313904584
                  ],
                  [
                    -1.5654659271240234,
                    52.38605136752974
                  ],
                  [
                    -1.5667963027954102,
                    52.385344154467134
                  ],
                  [
                    -1.5661525726318357,
                    52.383327225358606
                  ],
                  [
                    -1.566925048828125,
                    52.383091474383455
                  ],
                  [
                    -1.568942070007324,
                    52.38358916941018
                  ],
                  [
                    -1.5696287155151367,
                    52.382803332593134
                  ],
                  [
                    -1.5717315673828125,
                    52.38319625275005
                  ],
                  [
                    -1.5766239166259763,
                    52.38026236449064
                  ],
                  [
                    -1.5773534774780271,
                    52.37895253000267
                  ],
                  [
                    -1.576066017150879,
                    52.37785223900584
                  ],
                  [
                    -1.5703153610229492,
                    52.378297598188176
                  ],
                  [
                    -1.5691137313842773,
                    52.376516134508854
                  ],
                  [
                    -1.570272445678711,
                    52.37389620442528
                  ],
                  [
                    -1.567697525024414,
                    52.37284818887275
                  ],
                  [
                    -1.564650535583496,
                    52.372297970752534
                  ],
                  [
                    -1.5628910064697266,
                    52.37049006295402
                  ],
                  [
                    -1.5616464614868162,
                    52.37077828509749
                  ]
                ]
              ]
            }
          }
        ]
      }
    };
  }
};
</script>

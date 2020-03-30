# Map
`components/Map.vue`

This component instantiates a map object and overlays geoJSON data to show the corresponding output areas and population metrics.

## Children

No Children

## Props

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | Number | The ID of the map |
| metricType | String | The type of metric the map is showing (`'population'` or `'accessibility'`) |

## Reactive State

| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| `center` | latLng | `latLng(52.5, -1.83)` | The current center of the map |
| `zoom` | Number | `11` | The current zoom of the map |
| `url` | String | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | The URL that is used to fetch the map tiles |
| `attribution` | String | `<a href="http://osm.org/copyright">OpenStreetMap</a>` | The attribution to show on the map |
| `mapOptions` | Object | `{ zoomSnap: 0.5 }` | Options that are passed to the map object |

## Computed Properties

| Name | Description |
| ---- | ----------- |
| `min` | Gets the correct minimum metric for the metric this map is showing |
| `max` | Gets the correct maximum metric for the metric this map is showing |

## Methods
| Name | Description |
| ---- | ----------- |
| `centerUpdate` | Called when the map's center is changed. If this map is the master map, sends out a request for all other maps to update their centre position. |
| `zoomUpdate` | Called when the map's zoom is changed. If this map is the master map, sends out a request for all other maps to update their zoom. |
| `styleFunction` | Returns a style object to style the GeoJSON of a given output area. |

## Lifecycle Hooks

### Mounted
When mounted, this component refreshes the maps and sets up the component to listen to requests for it to update its map's centre and zoom.

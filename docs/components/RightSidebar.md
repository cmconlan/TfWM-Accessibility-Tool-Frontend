# Right Sidebar
`components/ui/RightSidebar.vue`

This component is shown as the right sidebar. It contains a number of filters used for the accessibility map.

## Children

 - [FilterHeader](FilterHeader)
 - [PointsOfInterest](PointsOfInterest)
 - [TimeStrata](TimeStrata)
 - [AccessibilityMetric](AccessibilityMetric)

## Reactive State

| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| `currentFilter` | String | `null` | The current filter being edited by the user (or `null` if no filter is being edited) |

## Computed Properties

| Name | Description |
| ---- | ----------- |
| `poiFilterString` | A human readable interpretation of the point of interest types filter to be shown on the sidebar |
| `timeStrataFilterString` | A human readable interpretation of the time strata filter to be shown on the sidebar |
| `accessibilityMetricFilterString` | A human readable interpretation of the accessibility metric filter to be shown on the sidebar |

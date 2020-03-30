# Left Sidebar
`components/ui/LeftSidebar.vue`

This component is shown as the left sidebar. It contains a number of filters used for the population map.

## Children

 - [FilterHeader](FilterHeader.html)
 - [PopulationMetric](PopulationMetric.html)
 - [DemographicFilter](DemographicFilter.html)

## Reactive State

| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| `currentFilter` | String | `null` | The current filter being edited by the user (or `null` if no filter is being edited) |

## Computed Properties

| Name | Description |
| ---- | ----------- |
| `demographicFilterString` | A human readable interpretation of the demographic filter to be shown on the sidebar |
| `populationMetricFilterString` | A human readable interpretation of the population metric filter to be shown on the sidebar |

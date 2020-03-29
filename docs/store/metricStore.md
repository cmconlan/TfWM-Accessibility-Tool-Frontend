# Metric Store

This module holds all the output areas and metrics that have been fetched from the API, and makes them accessible through a single `outputAreas` getter. It also provides getters for the minimum and maximum values of the two metrics.

## State

This module has no state that should be directly accessed.

## Mutations

This module has no mutations that should be directly committed.

## Actions

### fetchOutputAreas
This action fetches all output areas from the API and stores them in the module's store. This action returns a promise that resolves once the API call is completed, or fails if the API request fails.
```js
this.$store
  .dispatch("metricStore/fetchOutputAreas")
  .then(() => {
    console.log("Successfully fetched all output areas");
  })
  .catch(() => {
    console.log("Error fetching output areas");
  });
```

### fetchPopulationMetrics
This action fetches all population metrics from the API and stores them in the module's store. This action returns a promise that resolves once the API call is completed, or fails if the API request fails.
```js
this.$store
  .dispatch("metricStore/fetchPopulationMetrics")
  .then(() => {
    console.log("Successfully fetched all population metrics");
  })
  .catch(() => {
    console.log("Error fetching population metrics");
  });
```

### fetchAccessibilityMetrics
This action fetches all accessibility metrics from the API and stores them in the module's store. This action returns a promise that resolves once the API call is completed, or fails if the API request fails.
```js
this.$store
  .dispatch("metricStore/fetchAccessibilityMetrics")
  .then(() => {
    console.log("Successfully fetched all accessibility metrics");
  })
  .catch(() => {
    console.log("Error fetching accessibility metrics");
  });
```

### fetchAll
This action fetches all output areas, population metrics and accessibility metrics from the API and stores them in the module's store. This action returns a promise that resolves once all API calls are completed, or fails if any API request fails.
```js
this.$store
  .dispatch("metricStore/fetchAll")
  .then(() => {
    console.log("Successfully fetched all output areas and metrics");
  })
  .catch(() => {
    console.log("Error fetching all output areas and metrics");
  });
```

## Getters

### outputAreas
Gets all fetched output areas with the population and accessibility metrics injected.

If either population metrics, accessibility metrics or output areas have not been fetched, the getter will return `null`.

The population metric is injected twice into the properties field of each output area, once as the raw value into `populationMetric`, and again as a relative value (between 0 and 1 representing the positioning between the maximum and minumum population metric across all output areas) into `relativePopulationMetric`.

The same approach is taken with the accessibility metric, being injected as `accessibilityMetric` and `relativeAccessibilityMetric`.
```js
computed: {
  ...mapGetters([ "metricStore/outputAreas" ])
}
```

### populationMetricMin
Gets the minimum population metric across all output areas. Returns 0 if no population metrics have been fetched.
```js
computed: {
  ...mapGetters([ "metricStore/populationMetricMin" ])
}
```

### populationMetricMax
Gets the maximum population metric across all output areas. Returns 100 if no population metrics have been fetched.
```js
computed: {
  ...mapGetters([ "metricStore/populationMetricMax" ])
}
```

### accessibilityMetricMin
Gets the minimum accessibility metric across all output areas. Returns 0 if no accessibility metrics have been fetched.
```js
computed: {
  ...mapGetters([ "metricStore/accessibilityMetricMin" ])
}
```

### accessibilityMetricMax
Gets the maximum accessibility metric across all output areas. Returns 100 if no accessibility metrics have been fetched.
```js
computed: {
  ...mapGetters([ "metricStore/accessibilityMetricMax" ])
}
```

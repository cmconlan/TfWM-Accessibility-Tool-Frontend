# Services

This SPA uses services to interact with the backend API. Using services allows for all of the API interaction to be held in a handful of files. This means that if, for example, an API endpoint's URL is updated, it must only be changed once - in the service that uses it.

Services are all held in the `/src/services` directory.

## API service - `api.js`
The API service is the boilerplate service used by all other services to access the API. It simply provides a boilerplate axios client with the base URL pre-populated to the value set in the `.env` file under the key `VUE_APP_API_BASE`.

This service should only ever be used in other services to act as a starting point for making other API requests.

### Example
```js
import * as API from "@/services/api";

// Make a GET request to http://my-api-url/my-endpoint
var myPromise = API.client.get(`/my-endpoint`);
```

## Meta Service - `metaService.js`
The meta service provides access to all `/meta` endpoints. Each function returns a promise that will resolve once the request is complete.

```js
import metaService from "@/services/metaService";
```

### Methods

#### `fetchDemographic()`
Performs a GET request on `/meta/demographic`.
```js
metaService.fetchDemographic().then(response => {
  console.log(`Demographics: ${response.data}`);
})
```

#### `fetchTimeStrata()`
Performs a GET request on `/meta/time-strata`.
```js
metaService.fetchTimeStrata().then(response => {
  console.log(`Time strata: ${response.data}`);
})
```

#### `fetchPopulationMetric()`
Performs a GET request on `/meta/population-metric`.
```js
metaService.fetchPopulationMetric().then(response => {
  console.log(`Population metrics: ${response.data}`);
})
```

#### `fetchAccessibilityMetric()`
Performs a GET request on `/meta/accessibility-metric`.
```js
metaService.fetchAccessibilityMetric().then(response => {
  console.log(`Accessibility metrics: ${response.data}`);
})
```

#### `fetchPointOfInterestTypes()`
Performs a GET request on `/meta/point-of-interest-type`.
```js
metaService.fetchPointOfInterestTypes().then(response => {
  console.log(`Point of interest types: ${response.data}`);
})
```

## Metric Service - `metricService.js`
The metric service provides access to all endpoints that fetch metrics or output areas. Each function returns a promise that will resolve once the request is complete.

```js
import metricService from "@/services/metricService";
```

### Methods

#### `fetchOutputAreas()`
Performs a GET request on `/output-areas`.
```js
metricService.fetchOutputAreas().then(response => {
  console.log(`Output Areas: ${response.data}`);
})
```

#### `fetchPopulationMetrics()`
Performs a GET request on `/population-metrics`.
```js
metricService.fetchPopulationMetrics().then(response => {
  console.log(`Population Metrics: ${response.data}`);
})
```

#### `fetchAccessibilityMetrics()`
Performs a GET request on `/accessibility-metrics`.
```js
metricService.fetchAccessibilityMetrics().then(response => {
  console.log(`Accessibility Metrics: ${response.data}`);
})
```

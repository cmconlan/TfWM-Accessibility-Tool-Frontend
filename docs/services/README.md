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

#### `fetchEthnicity()`
Performs a GET request on `/meta/ethnicity`.
```js
metaService.fetchEthnicity().then(response => {
  console.log(`Ethnicities: ${response.data}`);
})
```

#### `fetchTimeStrata()`
Performs a GET request on `/meta/time-strata`.
```js
metaService.fetchTimeStrata().then(response => {
  console.log(`Time strata: ${response.data}`);
})
```

#### `fetchGeographicArea()`
Performs a GET request on `/meta/geographic-area`.
```js
metaService.fetchGeographicArea().then(response => {
  console.log(`Georgaphic area: ${response.data}`);
})
```

#### `fetchEmploymentStatus()`
Performs a GET request on `/meta/employment-status`.
```js
metaService.fetchEmploymentStatus().then(response => {
  console.log(`Employment status: ${response.data}`);
})
```

#### `fetchDisabilityStatus()`
Performs a GET request on `/meta/disability-status`.
```js
metaService.fetchDisabilityStatus().then(response => {
  console.log(`Disability status: ${response.data}`);
})
```

#### `fetchAccessibilityMetric()`
Performs a GET request on `/meta/accessibility-metric`.
```js
metaService.fetchAccessibilityMetric().then(response => {
  console.log(`Accessibility metric: ${response.data}`);
})
```

#### `fetchPointOfInterestTypes()`
Performs a GET request on `/meta/point-of-interest-type`.
```js
metaService.fetchPointOfInterestTypes().then(response => {
  console.log(`Point of interest types: ${response.data}`);
})
```

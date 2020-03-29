# Meta Store

The meta store handles all data retrieved from the `/meta/` endpoints of the API. It can fetch, store and get this data, however should never be mutated.

## State

This module has no state that should be directly accessed.

## Mutations

This module has no mutations that should be directly committed.

## Actions

### fetchAllMetaData
This action fetches all the metadata from the API and stores it in this module's store. It returns a promise that will resolve once all API requests have been completed successfully, or fail if any one request fails.
```js
this.$store
  .dispatch("metaStore/fetchAllMetaData")
  .then(() => {
    console.log("Successfully fetched all metadata");
  })
  .catch(() => {
    console.log("Error fetching all metadata");
  });
```

## Getters

### demographic
Get all demographics that have been fetched from the API.
```js
computed: {
  ...mapGetters([ "metaStore/demographic" ])
}
```

### timeStrata
Get all time stratas that have been fetched from the API.
```js
computed: {
  ...mapGetters([ "metaStore/timeStrata" ])
}
```

### populationMetric
Get all population metrics that have been fetched from the API.
```js
computed: {
  ...mapGetters([ "metaStore/populationMetric" ])
}
```

### accessibilityMetric
Get all accessibility metrics that have been fetched from the API.
```js
computed: {
  ...mapGetters([ "metaStore/accessibilityMetric" ])
}
```

### pointOfInterestTypes
Get all point of interest types that have been fetched from the API.
```js
computed: {
  ...mapGetters([ "metaStore/pointOfInterestTypes" ])
}
```

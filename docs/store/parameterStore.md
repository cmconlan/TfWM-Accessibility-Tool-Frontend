# Parameter Store

The parameter module holds all parameters that the user has selected. It can also initialise the parameters to their preferred default value.

## State

This module has no state that should be directly accessed.

## Mutations

### setDemographic
Sets the demographic filter to the supplied value.
```js
this.$store.commit("parameterStore/setDemographic", 'my-demographic');
```

### setTimeStrata
Sets the time strata filter to the supplied value.
```js
this.$store.commit("parameterStore/setTimeStrata", 'my-time-strata');
```

### setPopulationMetric
Sets the population metric filter to the supplied value.
```js
this.$store.commit("parameterStore/setPopulationMetric", 'my-population-metric');
```

### setAccessibilityMetric
Sets the accessibility metric filter to the supplied value.
```js
this.$store.commit("parameterStore/setAccessibilityMetric", 'my-accessibility-metric');
```

### setPointOfInterestTypes
Sets the point of interest type filter to the supplied value.
```js
this.$store.commit("parameterStore/setPointOfInterestTypes", 'my-point-of-interest-type');
```

## Actions

### initialiseParameters
This action initialises all parameters to their default values.
```js
this.$store.dispatch("parameterStore/initialiseParameters");
```

## Getters

### demographic
Gets the current demographic filter.
```js
computed: {
  ...mapGetters([ "parameterStore/demographic" ])
}
```

### timeStrata
Gets the current time strata filter.
```js
computed: {
  ...mapGetters([ "parameterStore/timeStrata" ])
}
```

### populationMetric
Gets the current population metric filter.
```js
computed: {
  ...mapGetters([ "parameterStore/populationMetric" ])
}
```

### accessibilityMetric
Gets the current accessibility metric filter.
```js
computed: {
  ...mapGetters([ "parameterStore/accessibilityMetric" ])
}
```

### pointOfInterestTypes
Gets the current point of interest types filter.
```js
computed: {
  ...mapGetters([ "parameterStore/pointOfInterestTypes" ])
}
```

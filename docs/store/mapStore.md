# Map Store

This module holds data around which map is currently in control of any map movements.

## State

This module has no state that should be directly accessed.

## Mutations

### setDemographic
Sets the ID of the master map, and records the timestamp that this was set.
```js
this.$store.commit("mapStore/setMasterMapId", 1);
```

## Actions

This module has no actions.

## Getters

### masterMapId
Gets the ID of the current master map.
```js
computed: {
  ...mapGetters([ "mapStore/masterMapId" ])
}
```

### masterMapTimestamp
Gets the timestamp of the last mutation of masterMapId.
```js
computed: {
  ...mapGetters([ "mapStore/masterMapTimestamp" ])
}
```

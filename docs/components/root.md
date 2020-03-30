# Root Component
`App.vue`

The root component is the root of the document. All other components are children of this component. It's responsibilities include holding all child components, in addition to initialising the application by fetching all the required data from the API.

## Children

 - [Header](Header)
 - [PageContent](PageContent)

## Reactive State

| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| `apiError` | Boolean | `false` | Set to true if an error occurs when accessing the API |

## Lifecycle Hooks

### Mounted
When mounted, this component dispatches the [`fetchAllMetaData` action](../store/metaStore.html#fetchallmetadata).

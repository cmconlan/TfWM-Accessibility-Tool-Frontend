# Store

This SPA uses [Vuex](https://vuex.vuejs.org/) to manage the global application state.

## Structure

The store is split into 4 modules, as outlined in the table below.

| Module Name    | Purpose |
| -----------    | ------- |
| [metaStore](metaStore)      | Store and manage all meta data. For example, storing all the demographics known to the system. |
| [parameterStore](parameterStore) | Store all the parameters that the user has selected on the frontend. |
| [metricStore](metricStore)    | Store and manage all metrics data. This is where the output areas are stored, along with all metrics data for these output areas. |
| [mapStore](mapStore)       | Store to manage all map related values. This includes one center and zoom that both maps follow. |

## A Note About Store Docs

In this documentation, only the elements of the store that are supposed to be interacted with are documented. For example, if a module contains a state called `myState`, but this state has a getter called `myGetter` and can be set using a mutation called `myMutation`, only `myGetter` and `myMutation` will be documented, as this is the preferred way of interacting with `myState`.

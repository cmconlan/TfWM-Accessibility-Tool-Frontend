# Page Content
`components/ui/PageContent.vue`

The page content component sits below the header and includes the left and right sidebars in addition to the 2 maps. It is responsible for managing how all of these child components interact with each other, and which should be visible at any one time.

## Children

 - [Map](Map)
 - [LeftSidebar](LeftSidebar)
 - [RightSidebar](RightSidebar)

## Reactive State

| Name | Type | Default Value | Description |
| ---- | ---- | ------------- | ----------- |
| `showLeftSidebarMaster` | Boolean | `true` | Holds if the user has selected to show the left sidebar or not |
| `showRightSidebarMaster` | Boolean | `true` | Holds if the user has selected to show the right sidebar or not |
| `showLeftSidebarOnFinish` | Boolean | `false` | Holds if the left sidebar should be shown after the left map has just been re-opened |
| `showRightSidebarOnFinish` | Boolean | `false` | Holds if the right sidebar should be shown after the right map has just been re-opened |
| `showLeftMap` | Boolean | `true` | Holds if the user has selected to show the left map or not |
| `showRightMap` | Boolean | `true` | Holds if the user has selected to show the right map or not |
| `showLeftMapCollapse` | Boolean | `false` | Holds if the left map collapse UI should be shown or not |
| `showRightMapCollapse` | Boolean | `false` | Holds if the right map collapse UI should be shown or not |

## Computed Properties

| Name | Description |
| ---- | ----------- |
| `showLeftSidebar` | Using the data in the reactive state, makes the final decision on if the left sidebar should be shown or not |
| `showRightSidebar` | Using the data in the reactive state, makes the final decision on if the right sidebar should be shown or not |
| `mapWidth` | Returns the correct map width |
| `leftPaneStyle` | Returns the correct width style for the left pane |
| `rightPaneStyle` | Returns the correct width style for the right pane |

## Methods
| Name | Description |
| ---- | ----------- |
| `paneRisizeStarted` | Called when a pane is started to be resized. Determines how the UI should react to this |
| `paneResized` | Called every time a pane is resized. Determines how the UI should react to this |
| `paneResizeStopped` | Called every time a pane is finished being resized. Determines how the UI should react to this |

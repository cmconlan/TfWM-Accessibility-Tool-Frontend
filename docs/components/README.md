# Components

This SPA is made of a hierarchy of Vue components. Each component has a well defined, distinct purpose and can track it's own reactive state.

Each component also has a parent, and can have a number of children. The exception to this rule is the [root](root) component, that has no parent.

## Component hierarchy

As is standard Vue practise, the components are arranged in a hierarchy as shown in the image below.

![Component Hierarchy]($withBase('/assets/components.svg'))

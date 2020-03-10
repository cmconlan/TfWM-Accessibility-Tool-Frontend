<template>
  <div class="p-4">
    Demographic Group

    <a class="button is-danger mt-4" @click="remove">
      <TrashCan />
      Remove
    </a>
    <a class="button is-accent float-right mt-4" @click="apply">
      <Check />
      Apply
    </a>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

import Check from "vue-material-design-icons/Check.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  components: {
    Check,
    TrashCan
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    }
  }
};
</script>

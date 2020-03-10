<template>
  <div class="p-4 w-full flex flex-col">
    Right Sidebar
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["rightSidebarData"])
  }
};
</script>

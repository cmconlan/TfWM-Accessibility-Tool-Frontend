<template>
  <div class="w-full h-full ml-64">
    <PageHeader class="relative z-10" />
    <div class="columns h-full">
      <div
        id="main-content"
        class="column overflow-auto"
        :class="rightSidebarShow ? 'is-10' : 'is-12'"
      >
        <transition name="header-fade" mode="out-in">
          <Home class="m-8" v-if="page == 'home'" />
        </transition>
      </div>
      <div class="column is-2">
        <RightSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Home from "@/views/Home";
import PageHeader from "@/components/ui/PageHeader";
import RightSidebar from "@/components/ui/RightSidebar";

export default {
  components: {
    PageHeader,
    Home,
    RightSidebar
  },
  computed: {
    ...mapGetters(["page", "rightSidebarShow"])
  }
};
</script>

<style>
#main-content {
  transition: width 0.3s;
}
</style>

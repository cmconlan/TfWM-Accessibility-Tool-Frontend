<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="w-64 p-2 h-full has-background-primary-dark text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      v-if="page == 'home'"
      key="home"
    >
      <HomeLeftSidebar />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import HomeLeftSidebar from "@/components/home/HomeLeftSidebar";

export default {
  components: {
    HomeLeftSidebar
  },
  computed: {
    ...mapGetters(["page"])
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>

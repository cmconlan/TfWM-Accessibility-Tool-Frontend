<template>
  <transition name="header-fade" mode="out-in">
    <div
      class="w-full h-10 p-2 pl-6 has-background-white"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px 0px;"
      key="home"
      v-if="page == 'home'"
    >
      <HomePageHeader />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import HomePageHeader from "@/components/home/HomePageHeader";

export default {
  components: {
    HomePageHeader,
  },
  computed: {
    ...mapGetters(["page"])
  }
};
</script>

<style>
.header-fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.3s;
}
.header-fade-leave-active {
  transition: all 0.3s ease;
}
.header-fade-enter,
.header-fade-leave-to {
  opacity: 0;
}
</style>

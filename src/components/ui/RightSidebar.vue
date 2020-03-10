<template>
  <transition name="right-slide-fade" mode="out-in">
    <div
      class="has-background-white h-full"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
      key="home"
      v-if="page == 'home' && rightSidebarShow"
    >
      <HomeRightSidebar />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import HomeRightSidebar from "@/components/home/HomeRightSidebar";

export default {
  components: {
    HomeRightSidebar
  },
  watch: {
    page: function() {
      this.$store.dispatch("set_right_sidebar_show", false);
    }
  },
  computed: {
    ...mapGetters(["page", "rightSidebarShow"])
  }
};
</script>

<style>
.right-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.right-slide-fade-leave-active {
  transition: all 0.3s ease;
}
.right-slide-fade-enter,
.right-slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>

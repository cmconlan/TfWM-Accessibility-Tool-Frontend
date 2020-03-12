<template>
  <div class="w-full h-full ml-64">
    <transition name="header-fade" mode="out-in">
      <div class="w-full h-full">
        <Map class="w-full h-full" />
      </div>
    </transition>
  </div>
</template>

<script>
import Map from "@/components/Map";

export default {
  components: {
    Map
  }
};
</script>

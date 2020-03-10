<template>
  <div class="w-full h-full ml-64">
    <transition name="header-fade" mode="out-in">
      <div class="w-full h-full">
        <l-map
          class="w-32 h-32"
          :zoom="3"
          :center="[47.413220, -1.219482]"
        >
        </l-map>
      </div>
    </transition>
  </div>
</template>

<script>
import { LMap } from 'vue2-leaflet';

export default {
  components: {
    LMap
  },
};
</script>

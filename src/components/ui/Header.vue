<template>
  <b-navbar
    class="is-primary overflow-hidden h-12"
    style="min-height: 0!important;"
  >
    <template slot="brand"></template>

    <template slot="start"></template>

    <template slot="end">
      <nav class="level">
        <div class="level-right">
          <div class="level-item">
            <div class="mr-4 cursor-pointer flex flex-row hover:text-blue-500 transition duration-100" @click="showSettings = !showSettings">
              <MenuLeft v-if="!showSettings" />
              <MenuRight v-if="showSettings" />
              <Cogs />
            </div>
            <transition name="slide-fade">
              <div v-if="showSettings" class="mr-4">
                <b-switch v-model="mapSync" type="is-info">Sync Map Movements</b-switch>
              </div>
            </transition>
          </div>
        </div>
      </nav>
    </template>

  </b-navbar>
</template>

<script>
import Cogs from "vue-material-design-icons/Cogs.vue";
import MenuLeft from "vue-material-design-icons/MenuLeft.vue";
import MenuRight from "vue-material-design-icons/MenuRight.vue";

export default {
  components: {
    Cogs,
    MenuLeft,
    MenuRight
  },
  data() {
    return {
      showSettings: false
    }
  },
  computed: {
    mapSync: {
      get() {
        return this.$store.state.mapStore.mapSync;
      },
      set(value) {
        this.$store.commit("mapStore/setMapSync", value);
      }
    }
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

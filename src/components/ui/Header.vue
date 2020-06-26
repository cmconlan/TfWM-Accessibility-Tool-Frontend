<template>
  <b-navbar
    class="is-primary overflow-hidden h-12"
    style="min-height: 0!important;"
    :mobile-burger="false"
  >
    <template slot="brand"></template>

    <template slot="start">
      <h1 class="title is-3 has-text-light m-1 ml-3 hidden sm:block">Transport Access Tool</h1>
      <b-tag rounded size="is-medium shadow is-accent ml-2 font-bold" style="margin-top: .3rem;">BETA</b-tag>
    </template>

    <template slot="end">
      <nav class="level">
        <div class="level-right">
          <div class="level-item">
            <div
              class="mr-4 cursor-pointer flex flex-row hover:text-blue-500 transition duration-100"
              @click="showSettings = !showSettings"
            >
              <MenuLeft v-if="!showSettings" />
              <MenuRight v-if="showSettings" />
              <Cogs />
            </div>
            <transition name="slide-fade">
              <div v-if="showSettings" class="mr-4">
                <b-switch v-model="mapSync" type="is-info"
                  >Sync Map Movements</b-switch
                >
              </div>
            </transition>
          </div>
          <div class="level-item has-background-primary z-50">
            <div
              class="mr-4 cursor-pointer flex flex-row hover:text-blue-500 transition duration-100"
              @click="showLicenses = true"
            >
              <BookInformationVariant />
            </div>
            <b-modal
              :active.sync="showLicenses"
              width="75%"
              id="license-modal"
              has-modal-card
              trap-focus
            >
              <LicenseModal />
            </b-modal>
          </div>
        </div>
      </nav>
    </template>
  </b-navbar>
</template>

<script>
import Cogs from "vue-material-design-icons/Cogs.vue";
import LicenseModal from "@/components/modals/LicenseModal";
import MenuLeft from "vue-material-design-icons/MenuLeft.vue";
import MenuRight from "vue-material-design-icons/MenuRight.vue";
import BookInformationVariant from "vue-material-design-icons/BookInformationVariant.vue";

export default {
  components: {
    Cogs,
    MenuLeft,
    MenuRight,
    LicenseModal,
    BookInformationVariant
  },
  data() {
    return {
      showSettings: false,
      showLicenses: false
    };
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
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

#license-modal .animation-content {
  width: 75%;
}
</style>

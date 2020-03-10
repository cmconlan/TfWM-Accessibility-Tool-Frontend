<template>
  <b-navbar class="is-primary overflow-hidden h-16">
    <template slot="brand">
      <div
        class="w-64 py-2 pr-8"
        style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      >
        <img class="" src="@/assets/images/logo.png" />
      </div>
    </template>
    <template slot="start">
      <b-navbar-item
        :active="page == 'home'"
        @click="$store.dispatch('set_page', 'home')"
      >
        <div
          class="mx-6 w-full flex flex-row"
          :class="{ 'has-text-grey-light': page != 'home' }"
        >
          HOME
          <chevron-down />
        </div>
      </b-navbar-item>
    </template>

  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

import ChevronDown from "vue-material-design-icons/ChevronDown.vue";

export default {
  components: {
    ChevronDown
  },
  computed: {
    ...mapGetters(["page"])
  }
};
</script>

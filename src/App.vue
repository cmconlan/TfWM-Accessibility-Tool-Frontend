<template>
  <div id="app" class="flex flex-col h-screen">
    <transition name="slide-up">
      <div v-if="started && loading" class="opacity-1 absolute w-full h-full has-background-primary has-text-centered" style="z-index: 9999999999999999;">
        <radar-spinner
          class="m-auto"
          style="margin-top: 30vh"
          :animation-duration="2000"
          :size="170"
          color="#FFFFFF"
        />
        <h1 class="title is-1 mt-8 has-text-white">Loading...</h1>
      </div>
    </transition>
    <div
      v-if="apiError"
      class="w-full h-full absolute bg-white text-center"
      style="z-index: 999999999; backdrop-filter: blur(5px); background-color: rgba(255, 255, 255, .15);"
    >
      <div
        class="inline-block w-1/2 h-1/3 bg-white rounded p-8"
        style="margin-top: 30vh"
      >
        <h1 class="title is-1 w-full text-center has-text-primary h-full pb-8">
          Oops... Something Went Wrong
        </h1>
        <h2 class="subtitle is-3 w-full text-center has-text-dark h-full pb-2">
          We can't connect to our API
        </h2>
        Try reloading the page, or contact
        transport-access-tool@dcs.warwick.ac.uk.
      </div>
    </div>
    <div
      v-if="!loading && !smallScreenContinue"
      class="w-full h-full absolute bg-white text-center visible md:invisible"
      style="z-index: 999999999; backdrop-filter: blur(5px); background-color: rgba(255, 255, 255, .15);"
    >
      <div
        class="inline-block w-11/12 h-1/3 bg-white rounded p-8 shadow border border-gray-200"
        style="margin-top: 10vh"
      >
        <h1 class="title is-3 w-full text-center has-text-primary h-full pb-8">
          Just a heads up
        </h1>
        <div>
          We've detected that your screen size is very small. This application is designed to work on larger screens, so you may have a sub-optimal experience if you continue. We recommend accessing this site on a desktop or laptop computer.
        </div>
        <b-button class="is-primary mt-4" @click="smallScreenContinue = true">
          Continue Anyway
        </b-button>
      </div>
    </div>
    <Header v-if="!loading" style="position: fixed;" class="w-full" />
    <div
      v-if="!loading"
      class="flex-grow flex flex-row mt-12"
      style="background-color: #F0F0F0; height: 85%;"
    >
      <PageContent class="relative z-10" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/ui/Header";
import { RadarSpinner } from 'epic-spinners';
import PageContent from "@/components/ui/PageContent";

export default {
  components: {
    Header,
    PageContent,
    RadarSpinner
  },
  data() {
    return {
      loading: true,
      started: false,
      apiError: false,
      smallScreenContinue: false,
    };
  },
  mounted() {
    this.started = true;
    this.$store
      .dispatch("metaStore/fetchAllMetaData")
      .then(() => {
        this.$store.dispatch("parameterStore/initialiseParameters");
        this.$store.dispatch("metricStore/fetchAll").finally(() => {
          this.loading = false;
        });
      })
      .catch(() => {
        this.apiError = true;
        this.loading = false;
      });
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
html {
  overflow: hidden !important;
}

.slide-up-enter-active {
  transition: all .3s ease;
  transition-delay: 0.5s;
}
.slide-up-leave-active {
  transition: all 1.5s ease;
}
.slide-up-enter {
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-95vh);
}

</style>

<style lang="scss">
// Import Tailwind
@import url("https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css");

// Import work sans font
@import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #5a3069;
$primary-invert: findColorInvert($primary);
$dark: #3f4246;
$dark-invert: findColorInvert($dark);
$info: #5698d2;
$info-invert: findColorInvert($info);
$success: #9a9a08;
$success-invert: findColorInvert($success);
$warning: #c8a019;
$warning-invert: findColorInvert($warning);
$danger: #b4153a;
$danger-invert: findColorInvert($danger);
$primary-dark: #3f4246;
$primary-dark-invert: findColorInvert($primary-dark);
$accent: #5698d2;
$accent-invert: findColorInvert($accent);

$title-color: #ffffff;
$loading-background: rgba(0, 0, 0, 0.5);

// Set font
$family-primary: "Work Sans";

// Setup $colors to use as bulma classes
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "primary-dark": (
    $primary-dark,
    $primary-dark-invert
  ),
  "accent": (
    $accent,
    $accent-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  )
);

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

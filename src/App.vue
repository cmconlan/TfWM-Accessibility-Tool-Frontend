<template>
  <div id="app" class="flex flex-col h-screen">
    <Header style="position: fixed;" class="w-full" />
    <div class="flex-grow flex flex-row mt-16" style="background-color: #F0F0F0;">
      <LeftSidebar class="relative z-20" style="position: fixed;" />
      <PageContent class="relative z-10" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/ui/Header";
import PageContent from "@/components/ui/PageContent";
import LeftSidebar from "@/components/ui/LeftSidebar";

export default {
  components: {
    Header,
    PageContent,
    LeftSidebar
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
// Import Tailwind
@import url("https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css");

// Import work sans font
@import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #285795;
$primary-invert: findColorInvert($primary);
$primary-dark: #234b80;
$primary-dark-invert: findColorInvert($primary-dark);
$accent: #ee7623;
$accent-invert: findColorInvert($accent);

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
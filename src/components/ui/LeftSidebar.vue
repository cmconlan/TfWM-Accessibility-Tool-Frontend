<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="w-64 h-full has-background-white text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      key="home"
    >
      <img src="@/assets/images/window_device.png" class="w-56 m-auto" />
      <b-menu>
        <b-menu-list>
          Example sidebar
        </b-menu-list>
      </b-menu>
    </div>
  </transition>
</template>

<script>

export default {
  components: {
  }
};
</script>

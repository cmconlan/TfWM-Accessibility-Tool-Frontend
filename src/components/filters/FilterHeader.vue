<template>
  <b-menu-item class="text-white py-2" :expanded="true" @click="$emit('click')">
    <template slot="label">
      <div class="flex flex-row">
        <div class="w-1/12" v-if="reversed">
          <ChevronLeft />
        </div>

        <div class="flex-grow" :class="reversed ? 'text-right' : 'text-left'">
          {{ filterName }}
          <div
            class="pl-4 w-11/12 truncate ... italic text-sm has-text-grey-light"
            v-html="filterString"
          ></div>
        </div>

        <div class="w-1/12" v-if="!reversed">
          <ChevronRight />
        </div>
      </div>
    </template>
  </b-menu-item>
</template>

<script>
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

export default {
  components: {
    ChevronLeft,
    ChevronRight
  },
  props: {
    filterName: String,
    filterString: String,
    reversed: { type: Boolean, default: false }
  }
};
</script>

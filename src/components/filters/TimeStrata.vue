<template>
  <div class="p-4">
    <b-field label="Time Strata"></b-field>

    <b-field
      v-for="timeStrataValue in metaTimeStrata"
      :key="timeStrataValue.key"
    >
      <b-radio v-model="timeStrata" :native-value="timeStrataValue.key">
        {{ timeStrataValue.value }}
      </b-radio>
    </b-field>

    <a class="button is-danger mt-4" @click="remove">
      <TrashCan />
      Remove
    </a>
    <a class="button is-accent float-right mt-4" @click="apply">
      <Check />
      Apply
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/event-bus.js";

import Check from "vue-material-design-icons/Check.vue";
import TrashCan from "vue-material-design-icons/TrashCan.vue";

export default {
  components: {
    Check,
    TrashCan
  },
  computed: {
    ...mapGetters({
      metaTimeStrata: "metaStore/timeStrata"
    }),
    timeStrata: {
      get() {
        return this.$store.state.parameterStore.timeStrata;
      },
      set(value) {
        this.$store.commit("parameterStore/setTimeStrata", value);
      }
    }
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    }
  }
};
</script>

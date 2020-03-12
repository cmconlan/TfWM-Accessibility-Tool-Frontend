<template>
  <div class="p-4">
    <b-field label="Points of Interest"></b-field>

    <b-field>
      <b-checkbox v-model="allPointOfInterestTypes">
        All
      </b-checkbox>
    </b-field>

    <b-field
      v-for="pointOfInterestTypesValue in metaPointOfInterestTypes"
      :key="pointOfInterestTypesValue.key"
    >
      <b-checkbox
        v-model="pointOfInterestType"
        :native-value="pointOfInterestTypesValue.key"
        :disabled="allPointOfInterestTypes"
      >
        {{ pointOfInterestTypesValue.value }}
      </b-checkbox>
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
  data() {
    return {
      allPointOfInterestTypes: false
    };
  },
  computed: {
    ...mapGetters({
      metaPointOfInterestTypes: "metaStore/pointOfInterestTypes"
    }),
    pointOfInterestType: {
      get() {
        return this.$store.state.parameterStore.pointOfInterestTypes;
      },
      set(value) {
        this.$store.commit("parameterStore/setPointOfInterestTypes", value);
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
  },
  watch: {
    allPointOfInterestTypes: function() {
      if (this.allPointOfInterestTypes) {
        this.pointOfInterestType = this.metaPointOfInterestTypes.map(
          x => x.key
        );
      } else {
        this.pointOfInterestType = [];
      }
    }
  }
};
</script>

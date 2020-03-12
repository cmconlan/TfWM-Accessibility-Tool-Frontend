<template>
  <div class="p-4">
    <b-field label="Geographic Area"></b-field>

    <b-field>
      <b-checkbox v-model="allGeographicAreas">
        All
      </b-checkbox>
    </b-field>

    <b-field
      v-for="geographicAreaValue in metaGeographicArea"
      :key="geographicAreaValue.key"
    >
      <b-checkbox
        v-model="geographicArea"
        :native-value="geographicAreaValue.key"
        :disabled="allGeographicAreas"
      >
        {{ geographicAreaValue.value }}
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
      allGeographicAreas: false
    };
  },
  computed: {
    ...mapGetters({
      metaGeographicArea: "metaStore/geographicArea"
    }),
    geographicArea: {
      get() {
        return this.$store.state.parameterStore.geographicArea;
      },
      set(value) {
        this.$store.commit("parameterStore/setGeographicArea", value);
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
    allGeographicAreas: function() {
      if (this.allGeographicAreas) {
        this.geographicArea = this.metaGeographicArea.map(x => x.key);
      } else {
        this.geographicArea = [];
      }
    }
  }
};
</script>

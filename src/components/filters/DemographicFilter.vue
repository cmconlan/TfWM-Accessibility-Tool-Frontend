<template>
  <div>
    <section class="p-4">
      <b-field label="Demographic Group"></b-field>

      <b-field>
        <b-checkbox v-model="allDemographics">
          All
        </b-checkbox>
      </b-field>

      <b-field
        v-for="demographicValue in metaDemographic"
        :key="demographicValue.key"
      >
        <b-checkbox
          v-model="demographic"
          :native-value="demographicValue.key"
          :disabled="allDemographics"
        >
          {{ demographicValue.value }}
        </b-checkbox>
      </b-field>
    </section>

    <div class="absolute bottom-0 mb-20 w-full flex flex-row">
      <div class="w-1/2 p-1">
        <a class="button is-dark w-full" @click="apply">
          <Check />
          Back
        </a>
      </div>
      <div class="w-1/2 p-1">
        <a class="button is-danger w-full" @click="remove">
          <TrashCan />
          Remove
        </a>
      </div>
    </div>
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
      allDemographics: false
    };
  },
  mounted() {
    if (this.demographic.length == this.metaDemographic.length) {
      this.allDemographics = true;
    }
  },
  computed: {
    ...mapGetters({
      metaDemographic: "metaStore/demographic"
    }),
    demographic: {
      get() {
        return this.$store.state.parameterStore.demographic;
      },
      set(value) {
        this.$store.commit("parameterStore/setDemographic", value);
      }
    }
  },
  watch: {
    allDemographics: function() {
      if (this.allDemographics) {
        this.demographic = this.metaDemographic.map(x => x.key);
      } else {
        this.demographic = [];
      }
    }
  },
  methods: {
    apply() {
      EventBus.$emit("refreshFilters");
      this.$emit("close");
    },
    remove() {
      this.allDemographics = true;
    }
  }
};
</script>

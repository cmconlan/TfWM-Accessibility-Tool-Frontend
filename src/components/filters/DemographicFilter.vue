<template>
  <div class="p-4">
    <section>
      <b-field label="Age Range">
        <b-slider v-model="ageRange" :min="0" :max="100" :step="1"> </b-slider>
        {{ ageRange[0] }} - {{ ageRange[1] }}
      </b-field>

      <b-field label="Ethnicity"></b-field>

      <b-field>
        <b-checkbox v-model="allEthnicities">
          All
        </b-checkbox>
      </b-field>

      <b-field
        v-for="enthnicityValue in metaEthnicity"
        :key="enthnicityValue.key"
      >
        <b-checkbox
          v-model="ethnicity"
          :native-value="enthnicityValue.key"
          :disabled="allEthnicities"
        >
          {{ enthnicityValue.value }}
        </b-checkbox>
      </b-field>

      <b-field label="Employment Status"></b-field>

      <b-field>
        <b-checkbox v-model="allEmploymentStatuses">
          All
        </b-checkbox>
      </b-field>

      <b-field
        v-for="employmentStatusValue in metaEmploymentStatus"
        :key="employmentStatusValue.key"
      >
        <b-checkbox
          v-model="employmentStatus"
          :native-value="employmentStatusValue.key"
          :disabled="allEmploymentStatuses"
        >
          {{ employmentStatusValue.value }}
        </b-checkbox>
      </b-field>

      <b-field label="Disability Status"></b-field>

      <b-field>
        <b-checkbox v-model="allDisabilityStatuses">
          All
        </b-checkbox>
      </b-field>

      <b-field
        v-for="disabilityStatusValue in metaDisabilityStatus"
        :key="disabilityStatusValue.key"
      >
        <b-checkbox
          v-model="disabilityStatus"
          :native-value="disabilityStatusValue.key"
          :disabled="allDisabilityStatuses"
        >
          {{ disabilityStatusValue.value }}
        </b-checkbox>
      </b-field>
    </section>

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
      allEthnicities: false,
      allEmploymentStatuses: false,
      allDisabilityStatuses: false
    };
  },
  computed: {
    ...mapGetters({
      metaEthnicity: "metaStore/ethnicity",
      metaEmploymentStatus: "metaStore/employmentStatus",
      metaDisabilityStatus: "metaStore/disabilityStatus"
    }),
    ageRange: {
      get() {
        return [
          this.$store.state.parameterStore.ageRange.min,
          this.$store.state.parameterStore.ageRange.max
        ];
      },
      set(value) {
        this.$store.commit("parameterStore/setAgeRangeMin", value[0]);
        this.$store.commit("parameterStore/setAgeRangeMax", value[1]);
      }
    },
    ethnicity: {
      get() {
        return this.$store.state.parameterStore.ethnicity;
      },
      set(value) {
        this.$store.commit("parameterStore/setEthnicity", value);
      }
    },
    employmentStatus: {
      get() {
        return this.$store.state.parameterStore.employmentStatus;
      },
      set(value) {
        this.$store.commit("parameterStore/setEmploymentStatus", value);
      }
    },
    disabilityStatus: {
      get() {
        return this.$store.state.parameterStore.disabilityStatus;
      },
      set(value) {
        this.$store.commit("parameterStore/setDisabilityStatus", value);
      }
    }
  },
  watch: {
    allEthnicities: function() {
      if (this.allEthnicities) {
        this.ethnicity = this.metaEthnicity.map(x => x.key);
      } else {
        this.ethnicity = [];
      }
    },
    allEmploymentStatuses: function() {
      if (this.allEmploymentStatuses) {
        this.employmentStatus = this.metaEmploymentStatus.map(x => x.key);
      } else {
        this.employmentStatus = [];
      }
    },
    allDisabilityStatuses: function() {
      if (this.allDisabilityStatuses) {
        this.disabilityStatus = this.metaDisabilityStatus.map(x => x.key);
      } else {
        this.disabilityStatus = [];
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

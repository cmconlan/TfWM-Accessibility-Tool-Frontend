<template>
  <div>
    <section class="p-4">
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
      allEthnicities: false,
      allEmploymentStatuses: false,
      allDisabilityStatuses: false
    };
  },
  mounted() {
    if (this.ethnicity.length == this.metaEthnicity.length) {
      this.allEthnicities = true;
    }
    if (this.employmentStatus.length == this.metaEmploymentStatus.length) {
      this.allEmploymentStatuses = true;
    }
    if (this.disabilityStatus.length == this.metaDisabilityStatus.length) {
      this.allDisabilityStatuses = true;
    }
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
      this.allEthnicities = true;
      this.allEmploymentStatuses = true;
      this.allDisabilityStatuses = true;
      this.ageRange = [0, 100];
    }
  }
};
</script>

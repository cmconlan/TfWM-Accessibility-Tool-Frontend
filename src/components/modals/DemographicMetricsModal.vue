<template>
  <div class="modal-card" style="width: 100%!important;">
    <header class="modal-card-head">
      <p class="modal-card-title">Demographic Metrics</p>
    </header>

    <section class="modal-card-body">
      <b-table
        :data="metrics"
        default-sort="demographic"
      >
        <template slot-scope="props">
          <b-table-column field="demographic" label="Demographic" searchable sortable>
            {{ props.row.demographic }}
          </b-table-column>

          <b-table-column field="WASS" label="Weighted Average Access Score" sortable>
            {{ props.row.WASS }}
          </b-table-column>

          <b-table-column field="ARM" label="Access Relative to Mean" sortable>
            {{ props.row.ARM }}
          </b-table-column>

          <!-- TODO: Fix this on the API side -->
          <!-- <b-table-column field="JI" label="Jain's Index" sortable>
            {{ props.row.JI }}
          </b-table-column> -->
        </template>
      </b-table>
    </section>

    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      demographics: "metaStore/demographic",
      demographicMetrics: "metricStore/demographicLevelAccessibilityMetrics"
    }),
    metrics() {
      return Object.keys(this.demographicMetrics).map(demographic => ({
        ...this.demographicMetrics[demographic],
        demographic: this.demographics.find(x => x.key == demographic).value
      }));
    }
  }
};
</script>

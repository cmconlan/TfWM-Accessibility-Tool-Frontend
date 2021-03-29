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

          <b-table-column field="JI" label="Jain's Index" sortable>
            {{ props.row.JI }}
          </b-table-column>

          <!-- <b-table-column field="version" label="Version">
            {{ props.row.version }}
          </b-table-column>

          <b-table-column field="description" label="Description">
            {{ props.row.description }}
          </b-table-column>

          <b-table-column field="licenses" label="License" sortable>
            {{ props.row.licenses }}
          </b-table-column>

          <b-table-column field="links" label="Links">
            <b-tooltip
              v-for="link in props.row.links"
              :label="link.tooltip"
              :key="link.icon"
            >
              <a :href="link.link" target="_">
                <b-icon
                  class="mr-1 cursor-pointer text-black hover:text-blue-500 transition duration-100"
                  :icon="link.icon"
                />
              </a>
            </b-tooltip>
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

<template>
  <div class="modal-card" style="width: 100%!important;">
    <header class="modal-card-head">
      <p class="modal-card-title">Licenses</p>
    </header>

    <section class="modal-card-body">
      <b-table
        :data="licenseData"
        :paginated="true"
        :per-page="10"
        default-sort="name"
      >
        <template slot-scope="props">
          <b-table-column field="name" label="Package" sortable>
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="version" label="Version">
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
          </b-table-column>
        </template>
      </b-table>
    </section>

    <footer class="modal-card-foot">
      <nav class="level w-full">
        <div class="level-left">
          <div class="level-item">
            <button class="button" type="button" @click="$parent.close()">
              Close
            </button>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a href="/licenses.json" download target="_blank">
              <button class="button float-right is-primary" type="button">
                Download License Info
              </button>
            </a>
          </div>
        </div>
      </nav>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      licenseData: [],
      loading: false
    };
  },
  mounted() {
    this.loadLicenseData();
  },
  methods: {
    loadLicenseData() {
      this.loading = true;
      axios
        .get("/licenses.json")
        .then(response => {
          var result = Object.values(response.data);
          result.map(license => {
            license.links = [];
            if (license.repository.includes("github.com")) {
              license.links.push({
                icon: "github",
                link: license.repository,
                tooltip: "View on GitHub"
              });
              if (license.licenseFile != "") {
                var prefix = "node_modules/" + license.name + "/";
                var githubLicenseLink = license.repository + "/blob/master/";
                githubLicenseLink += license.licenseFile.slice(prefix.length);
                license.links.push({
                  icon: "file-document",
                  link: githubLicenseLink,
                  tooltip: "View License"
                });
              }
            }
            return license;
          });
          this.licenseData = result;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

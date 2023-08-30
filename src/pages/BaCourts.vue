<template>
  <main>
    <div class="q-pa-md">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="center"
        narrow-indicator
      >
        <q-tab name="liste" :label="$t('TAB_LISTE')" />
        <q-tab name="map" :label="$t('TAB_MAP')" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="liste">
          <div class="q-pa-md">
            <q-table
              flat
              :rows="searchResults"
              :columns="columns"
              row-key="name"
              :pagination="initialPagination"
              :visible-columns="visibleColumns"
              :filter="filter"
            >
              <template v-slot:top-right>
                <q-input
                  style="min-width: 400px"
                  rounded
                  outlined
                  dense
                  debounce="300"
                  v-model="filter"
                  :placeholder="$t('SEARCH_COURTS')"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template v-slot:top-left>
                <q-card class="q-pa-md" flat>
                  {{ count }}&nbsp;{{ $t("RECORDS_FOUND") }}
                </q-card>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td colspan="80%">
                    <div
                      class="q-pa-md"
                      style="font-weight: 500; font-size: larger"
                    >
                      {{ props.row.itemLabel.value }}
                    </div>
                    <q-card flat light>
                      <q-card-section v-if="props.row.Image">
                        <q-img
                          style="
                            border-radius: 5px;
                            min-width: 200px;
                            max-width: 400px;
                            min-height: 150px;
                            max-height: 300px;
                            padding-inline: 12px;
                          "
                          :src="props.row.Image.value"
                        />
                      </q-card-section>
                      <q-card-section
                        style="word-break: break-all"
                        class="q-pa-sm"
                        v-if="
                          props.row.itemDescription &&
                          props.row.itemDescription.value
                        "
                      >
                        {{ props.row.itemDescription.value }}&nbsp;<a
                          :href="props.row.item.value"
                          target="_blank"
                          >(FactGrid)</a
                        >
                      </q-card-section>
                      <q-expansion-item
                        switch-toggle-side
                        expand-separator
                        icon="perm_identity"
                        :label="$t('COURTS_PERSONS')"
                        @show="loadAgents($event, props.row.item.value)"
                      >
                        <q-card-section
                          v-if="
                            courtDetails[props.row.item.value] &&
                            courtDetails[props.row.item.value].length
                          "
                        >
                          <ul>
                            <li
                              v-for="entry in courtDetails[
                                props.row.item.value
                              ]"
                              v-bind:key="entry.item.value"
                            >
                              <span v-if="entry.item && entry.itemLabel">
                                <router-link
                                  :to="
                                    'details/Q' +
                                    entry.item.value.split('/Q').pop()
                                  "
                                  >{{ entry.itemLabel.value }}</router-link
                                >
                                &nbsp;<span v-if="entry.itemDescription"
                                  >({{ entry.itemDescription.value }})</span
                                ></span
                              >
                            </li>
                          </ul>
                        </q-card-section>
                        <q-card-section v-else>
                          {{ $t("NO_DATA") }}
                        </q-card-section>
                      </q-expansion-item>
                    </q-card>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
        <q-tab-panel name="map"><div id="map"></div></q-tab-panel>
      </q-tab-panels>
    </div>
  </main>
</template>

<script>
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
import { ref } from "vue";
import { useQuasar } from "quasar";
import mapboxgl from "mapbox-gl";
import addLang from "../services/lang.js";

const columns = [
  {
    name: "id",
    required: true,
    field: (row) => row.item.value,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "content",
    required: true,
    align: "left",
    field: (row) => row.itemLabel.value,
    format: (val) => `${val}`,
    sortable: false,
  },
];

export default {
  name: "BaCourts",
  data() {
    return {
      searchResults: ref([]),
      courtDetails: ref([]),
      count: ref(0),
      tab: ref("liste"),
      center: [12.0, 55.0],
      zoom: ref(5),
      nodata: ref(false),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      filter: ref(""),
      visibleColumns: [
        {
          name: "content",
        },
      ],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      columns,
    };
  },
  methods: {
    async loadAgents($event, courtId) {
      try {
        const url = addLang("/courts/Q" + courtId.split("/Q").pop());
        const res = await this.$api.get(url);
        this.courtDetails[courtId] = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      try {
        const url = addLang("/courts");
        const res = await this.$api.get(url);
        this.count = res.data.length;
        this.searchResults = res.data;
      } catch (error) {
        console.log(error);
      }
      this.createMap();
    },

    async createMap() {
      await waitForElm("#map");
      this.map = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1IjoiaWx5YXNtaXJub3YiLCJhIjoiY2xpNmJwZGk0MTZ1bTNxbWxmcmkxYWRjciJ9.0SwOGuKrTdSjcEJlCsNAVQ",
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        minzoom: 3,
        center: this.center,
        zoom: this.zoom,
        hash: false,
      });

      this.map.on("move", () => {
        this.center = this.map.getCenter();
      });
      this.map.on("zoom", () => {
        this.zoom = this.map.getZoom();
      });

      if (Object.entries(this.searchResults).length) {
        for (const court of this.searchResults) {
          if (court.Latitude && court.Longitude) {
            const marker = new mapboxgl.Marker({
              color: "blue",
              draggable: false,
            })
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  "<a href= '" +
                    court.item.value +
                    "' target='_blank' style='text-transform: capitalize;'>" +
                    court.itemLabel.value +
                    "</a>"
                )
              )
              .setLngLat([court.Longitude.value, court.Latitude.value])
              .addTo(this.map);
          }
        }
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style scoped>
#map {
  align-items: safe;
  height: 600px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid rgb(134, 130, 130);
  border-radius: 12px;
}
</style>

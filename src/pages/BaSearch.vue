<template>
  <div class="q-pa-md">
    <q-separator inlet></q-separator>

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
        <template v-slot:top-left>
          <q-card style="min-width: 480px" flat>
            <q-card-section>
              <q-input
                rounded
                outlined
                dense
                debounce="300"
                v-model="filter"
                :placeholder="$t('SEARCH_PERSONS')"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-expansion-item
                switch-toggle-side
                expand-separator
                icon="settings"
                :label="$t('ADVANCED_SEARCH')"
              >
                <div class="ba-table align-self-center q-pa-md">
                  <div class="row">
                    <div class="col">
                      {{ $t("BIRTH_YEARS") }}
                    </div>
                    <div class="col">
                      <date-picker
                        style="max-width: 180px"
                        v-model:value="filterYears"
                        type="year"
                        range
                        :placeholder="$t('TIMESPAN')"
                      ></date-picker>
                    </div>
                  </div>
                </div>
                <q-btn flat padding="m" color="blue" push @click="reload()">
                  <div class="row items-center no-wrap">
                    <q-icon left name="search" />
                    <div class="text-center">{{ $t("APPLY") }}</div>
                  </div>
                </q-btn>
                <q-btn flat padding="m" color="blue" push @click="reset()">
                  <div class="row items-center no-wrap">
                    <q-icon left name="cached" />
                    <div class="text-center">{{ $t("RESET") }}</div>
                  </div>
                </q-btn>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </template>
        <template v-slot:top-right>
          <q-card class="q-pa-md" flat>
            {{ count }}&nbsp;{{ $t("RECORDS_FOUND") }}
          </q-card>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td colspan="90%">
              <div class="q-pa-md" style="font-weight: 500; font-size: larger">
                &#9642;&nbsp;{{ props.row.itemLabel.value }}
              </div>
              <q-card flat light>
                <q-card-section
                  style="word-break: break-all"
                  class="q-pa-sm"
                  v-if="
                    props.row.itemDescription && props.row.itemDescription.value
                  "
                >
                  {{ props.row.itemDescription.value }}
                </q-card-section>
                <q-card-section
                  class="q-pa-sm"
                  v-if="props.row.Date_of_birth || props.row.Date_of_death"
                >
                  <span v-if="props.row.Date_of_birth">
                    {{ $t("BORN") }}:
                    <FactGridDate
                      :datestring="props.row.Date_of_birth.value"
                      :precision="
                        Number(props.row.Date_of_birth_precision.value)
                      "
                      :calendar="props.row.Date_of_birth_calendar.value"
                    />;&nbsp;</span
                  >
                  <span v-if="props.row.Date_of_death">
                    {{ $t("DIED") }}:
                    <FactGridDate
                      :datestring="props.row.Date_of_death.value"
                      :precision="
                        Number(props.row.Date_of_death_precision.value)
                      "
                      :calendar="props.row.Date_of_death_calendar.value"
                  /></span>
                </q-card-section>
              </q-card>

              <q-btn
                flat
                padding="m"
                color="blue"
                push
                @click="
                  $router.push(
                    'details/Q' + props.row.item.value.split('/Q').pop()
                  )
                "
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="preview" />
                  <div class="text-center">{{ $t("SHOW") }}</div>
                </div>
              </q-btn>

              <q-btn
                flat
                padding="m"
                color="blue"
                push
                @click="openInFactGrid(props.row.item.value)"
              >
                <div class="row items-center no-wrap">
                  <q-icon left name="open_in_new" />
                  <div class="text-center">FactGrid</div>
                </div>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import FactGridDate from "../components/FactGridDate.vue";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import addLang from "../services/lang.js";

import { useQuasar } from "quasar";

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
  name: "BaSearch",
  components: {
    FactGridDate,
    DatePicker,
  },
  data() {
    return {
      searchResults: ref([]),
      count: ref(0),
      filterYears: [new Date(1600, 1, 1), new Date(1800, 1, 1)],
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
    openInFactGrid(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
    reload() {
      this.getData(true);
    },
    reset() {
      this.getData(false);
    },
    showOnMap() {},
    async getData(withFilter) {
      try {
        var path = "/agents";
        if (withFilter) {
          path += String(
            "?birthFrom=" +
              this.filterYears[0].getFullYear() +
              "&birthTo=" +
              this.filterYears[1].getFullYear()
          );
        }
        const res = await this.$api.get(addLang(path));
        this.count = res.data.length;
        this.searchResults = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getData(false);
  },
};
</script>

<style>
.ba-table {
  vertical-align: middle;
}

.mx-input {
  border-radius: 12px;
}
</style>

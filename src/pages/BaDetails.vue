<template>
  <div class="q-pa-md agent-details" v-if="agentDetails">
    <div class="flex flex-left column">
      <div class="row bg-grey-1" style="width: 100%; padding: 0px">
        <div
          id="parent"
          class="fit column inline wrap justify-start items-stretch content-stretch"
          style="overflow: hidden"
        >
          <q-card>
            <q-card-section horizontal>
              <q-card v-if="agentDetails.Image">
                <q-img
                  style="
                    border-radius: 15px;
                    min-width: 200px;
                    max-height: 300px;
                    padding-inline: 12px;
                  "
                  :src="agentDetails.Image.value"
                />
              </q-card>

              <q-card style="padding: 16px">
                <div class="text-h5">
                  {{ agentDetails.itemLabel.value }}
                </div>
                <div
                  style="font-size: larger"
                  v-if="agentDetails.itemDescription"
                >
                  {{ agentDetails.itemDescription.value }}
                </div>

                <div
                  v-if="
                    agentDetails.Date_of_birth || agentDetails.Date_of_death
                  "
                >
                  <span v-if="agentDetails.Date_of_birth">
                    {{ $t("BORN") }}:&nbsp;
                    <FactGridDate
                      :datestring="agentDetails.Date_of_birth.value"
                      :precision="
                        Number(agentDetails.Date_of_birth_precision.value)
                      "
                      :calendar="agentDetails.Date_of_birth_calendar.value"
                    />
                  </span>
                  <span v-if="agentDetails.Place_of_birthLabel">
                    in
                    {{ agentDetails.Place_of_birthLabel.value }};&nbsp;
                  </span>

                  <span v-if="agentDetails.Date_of_death">
                    {{ $t("DIED") }}:&nbsp;
                    <FactGridDate
                      :datestring="agentDetails.Date_of_death.value"
                      :precision="
                        Number(agentDetails.Date_of_death_precision.value)
                      "
                      :calendar="agentDetails.Date_of_death_calendar.value"
                    />
                  </span>
                  <span v-if="agentDetails.Place_of_deathLabel">
                    in&nbsp;
                    {{ agentDetails.Place_of_deathLabel.value }}
                  </span>
                </div>
              </q-card>
            </q-card-section>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="center"
              narrow-indicator
            >
              <q-tab name="details" :label="$t('TAB_DETAILS')" />
              <q-tab name="map" :label="$t('TAB_MAP')" />
              <q-tab name="graph" :label="$t('TAB_GRAPH')" />
              <q-tab name="timeline" :label="$t('TAB_TIMELINE')" />
              <q-tab name="tools" :label="$t('TAB_TOOLS')" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="details">
                <q-card
                  horizontal
                  light
                  bordered
                  style="
                    min-height: 500px;
                    width: 90%;
                    padding: 12px;
                    margin: auto;
                  "
                  class="details"
                >
                  <q-card-section
                    class="q-pa-sm"
                    v-if="agentDetails.SurnameLabel"
                  >
                    {{ $t("SURNAME") }}: {{ agentDetails.SurnameLabel.value }}
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="firstnames && firstnames[0].property"
                  >
                    {{ $t("FIRSTNAMES") }}:&nbsp;
                    <span
                      v-for="entry in firstnames"
                      v-bind:key="entry.property"
                    >
                      <span v-if="!entry.property.value.includes('Q464939')">
                        <a :href="entry.property.value" target="_blank">
                          {{ entry.propertyLabel.value }}</a
                        >;&nbsp;</span
                      >
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="agentDetails.MotherLabel || agentDetails.FatherLabel"
                  >
                    {{ $t("PARENTS") }}:&nbsp;<span
                      v-if="agentDetails.MotherLabel"
                    >
                      {{ $t("MOTHER") }}:&nbsp;
                      {{ agentDetails.MotherLabel.value }};&nbsp;
                    </span>
                    <span v-if="agentDetails.FatherLabel">
                      {{ $t("FATHER") }}:&nbsp;
                      {{ agentDetails.FatherLabel.value }}
                    </span>
                  </q-card-section>

                  <q-card-section class="q-pa-sm" v-if="agentDetails.FromLabel">
                    {{ $t("ORIGIN") }}: {{ agentDetails.FromLabel.value }}
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="addresses && addresses[0].property"
                  >
                    {{ $t("STAY") }}:&nbsp;
                    <span
                      v-for="entry in addresses"
                      v-bind:key="entry.property"
                    >
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="spouses && spouses[0].property"
                  >
                    {{ $t("SPOUSES") }}:&nbsp;
                    <span v-for="entry in spouses" v-bind:key="entry.property">
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>
                  <q-card-section
                    class="q-pa-sm"
                    v-if="unmarriedpartners && unmarriedpartners[0].property"
                  >
                    {{ $t("UNMARRIED_PARTNERS") }}:&nbsp;
                    <span
                      v-for="entry in unmarriedpartners"
                      v-bind:key="entry.property"
                    >
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="children && children[0].property"
                  >
                    {{ $t("CHILDREN") }}:&nbsp;
                    <span v-for="entry in children" v-bind:key="entry.property">
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="agentDetails.Date_of_baptism"
                  >
                    {{ $t("BAPTISM") }}:&nbsp;
                    <FactGridDate
                      :datestring="agentDetails.Date_of_baptism.value"
                      :precision="
                        Number(agentDetails.Date_of_baptism_precision.value)
                      "
                      :calendar="agentDetails.Date_of_baptism_calendar.value"
                    />
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="
                      agentDetails.GraveLabel || agentDetails.Date_of_burial
                    "
                    >{{ $t("BURIED") }}:&nbsp;
                    <span v-if="agentDetails.GraveLabel">
                      <a :href="agentDetails.Grave.value" target="_blank">
                        {{ agentDetails.GraveLabel.value }}
                      </a></span
                    >&nbsp;
                    <span v-if="agentDetails.Date_of_burial">
                      <FactGridDate
                        :datestring="agentDetails.Date_of_burial.value"
                        :precision="
                          Number(agentDetails.Date_of_burial_precision.value)
                        "
                        :calendar="agentDetails.Date_of_burial_calendar.value"
                      />
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="career && career[0].property"
                  >
                    {{ $t("CAREER") }}:&nbsp;
                    <span v-for="entry in career" v-bind:key="entry.property">
                      <span v-if="!entry.property.value.includes('Q464939')">
                        <a :href="entry.property.value" target="_blank">
                          {{ entry.propertyLabel.value }}</a
                        >;&nbsp;</span
                      >
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="religions && religions[0].property"
                  >
                    {{ $t("RELIGIONS") }}:&nbsp;
                    <span
                      v-for="entry in religions"
                      v-bind:key="entry.property"
                    >
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="employer && employer[0].property"
                  >
                    {{ $t("EMPLOYER") }}:&nbsp;
                    <span v-for="entry in employer" v-bind:key="entry.property">
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>

                  <q-card-section
                    class="q-pa-sm"
                    v-if="stayIns && stayIns[0].property"
                  >
                    {{ $t("STAYINS") }}:&nbsp;
                    <span v-for="entry in stayIns" v-bind:key="entry.property">
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>
                  <q-separator inset="item" />
                  <q-card-section
                    class="q-pa-sm"
                    v-if="sources && sources[0].property"
                  >
                    {{ $t("SOURCES") }}:&nbsp;
                    <span v-for="entry in sources" v-bind:key="entry.property">
                      <a :href="entry.property.value" target="_blank">
                        {{ entry.propertyLabel.value }}</a
                      >;&nbsp;
                    </span>
                  </q-card-section>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="map">
                <div class="mapbox-element">
                  <MapboxMap :geodata="geodata" />
                </div>
              </q-tab-panel>

              <q-tab-panel name="graph">
                <BAGraph
                  :agent="agentDetails.itemLabel.value"
                  :agent-link="agentDetails.item.value"
                  :groups="groups"
                />
              </q-tab-panel>
              <q-tab-panel name="timeline">
                <iframe
                  style="fg-embedded"
                  src="https://database.factgrid.de/query/embed.html#SELECT%20%3FEvent%20%3FEventLabel%20%3FChildLabel%20%3Fdate%20WHERE%0A%7B%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP83%20%3Fstatement1.%0A%20%20%20%20%20%3Fstatement1%20ps%3AP83%20%3FEvent.%0A%20%20%20%20%20%3Fstatement1%20pq%3AP49%20%3Fdate.%0A%20%20%20%7D%0A%20%20UNION%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP91%20%3Fstatement2.%0A%20%20%20%20%20%3Fstatement2%20ps%3AP91%20%3FEvent.%0A%20%20%20%20%20%3Fstatement2%20pq%3AP49%20%3Fdate.%0A%20%20%20%20%7D%0A%20%20UNION%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP315%20%3Fstatement3.%0A%20%20%20%20%20%3Fstatement3%20ps%3AP315%20%3Fdate.%0A%20%20%20%20%20%3Fstatement3%20pq%3AP49%20%3Fstarttime.%0A%20%20%20%20OPTIONAL%20%7B%20%3Fstatement3%20pq%3AP50%20%3Fendtime.%20%7D%20%7D%0A%20%20UNION%0A%20%20%7B%20%20wd%3AQ1308%20p%3AP77%20%3Fstatement4.%0A%20%20%20%20%20%20%3Fstatement4%20ps%3AP77%20%3Fdate.%20%7D%0A%20%20UNION%0A%20%20%7B%20%20wd%3AQ1308%20p%3AP150%20%3Fstatement5.%0A%20%20%20%20%20%20%3Fstatement5%20ps%3AP150%20%3FChild.%0A%20%20%20%20%20%20%20%20%20%20%20%20%3FChild%20wdt%3AP77%20%3Fdate.%20%7D%0A%20%20%0A%20%20%0A%0A%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22de%22.%20%7D%0A%7D%0AORDER%20BY%20%3Fdate"
                ></iframe>
                <vue-horizontal-timeline
                  v-if="false"
                  :items="timelineEvents"
                ></vue-horizontal-timeline>
                <vue-timeline
                  v-if="false"
                  :data="timelineEvents2"
                ></vue-timeline>
              </q-tab-panel>
              <q-tab-panel name="tools">
                <q-card
                  class="q-pa-md"
                  light
                  bordered
                  style="
                    min-height: 500px;
                    width: 90%;
                    padding: 12px;
                    margin: auto;
                  "
                >
                  <q-card-section class="q-pa-sm">
                    {{ agentDetails.itemLabel.value }} in FactGrid:
                    <a :href="agentDetails.item.value" target="_blank"
                      >Q{{ agentDetails.item.value.split("/Q").pop() }}</a
                    >
                  </q-card-section>
                  <q-card-section class="q-pa-sm" v-if="agentDetails.GND_ID">
                    {{ $t("GND_ID") }}: {{ agentDetails.GND_ID.value }} (<a
                      :href="'https://d-nb.info/' + agentDetails.GND_ID.value"
                      target="_blank"
                    >
                      {{ $t("DIED") }}</a
                    >)
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    {{ agentDetails.itemLabel.value }}
                    <a
                      :href="
                        'https://www.entitree.com/factgrid/de/all/Q' +
                        agentDetails.item.value.split('/Q').pop()
                      "
                      target="_blank"
                      >in EntiTree</a
                    >
                  </q-card-section>
                  <q-card-section>
                    <q-expansion-item
                      v-if="false"
                      switch-toggle-side
                      expand-separator
                      label="Test"
                    >
                      <iframe
                        class="fg-embedded"
                        src="https://database.factgrid.de/query/embed.html#SELECT%20%3FEvent%20%3FEventLabel%20%3FChildLabel%20%3Fdate%20WHERE%0A%7B%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP83%20%3Fstatement1.%0A%20%20%20%20%20%3Fstatement1%20ps%3AP83%20%3FEvent.%0A%20%20%20%20%20%3Fstatement1%20pq%3AP49%20%3Fdate.%0A%20%20%20%7D%0A%20%20UNION%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP91%20%3Fstatement2.%0A%20%20%20%20%20%3Fstatement2%20ps%3AP91%20%3FEvent.%0A%20%20%20%20%20%3Fstatement2%20pq%3AP49%20%3Fdate.%0A%20%20%20%20%7D%0A%20%20UNION%0A%20%20%20%7B%20wd%3AQ1308%20p%3AP315%20%3Fstatement3.%0A%20%20%20%20%20%3Fstatement3%20ps%3AP315%20%3Fdate.%0A%20%20%20%20%20%3Fstatement3%20pq%3AP49%20%3Fstarttime.%0A%20%20%20%20OPTIONAL%20%7B%20%3Fstatement3%20pq%3AP50%20%3Fendtime.%20%7D%20%7D%0A%20%20UNION%0A%20%20%7B%20%20wd%3AQ1308%20p%3AP77%20%3Fstatement4.%0A%20%20%20%20%20%20%3Fstatement4%20ps%3AP77%20%3Fdate.%20%7D%0A%20%20UNION%0A%20%20%7B%20%20wd%3AQ1308%20p%3AP150%20%3Fstatement5.%0A%20%20%20%20%20%20%3Fstatement5%20ps%3AP150%20%3FChild.%0A%20%20%20%20%20%20%20%20%20%20%20%20%3FChild%20wdt%3AP77%20%3Fdate.%20%7D%0A%20%20%0A%20%20%0A%0A%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22de%22.%20%7D%0A%7D%0AORDER%20BY%20%3Fdate"
                        referrerpolicy="origin"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                      ></iframe>
                    </q-expansion-item>
                  </q-card-section>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import BAGraph from "../components/Graph.vue";
import MapboxMap from "../components/MapboxMap.vue";
import FactGridDate from "../components/FactGridDate.vue";
import VueHorizontalTimeline from "../components/3rd-party/VueHorizontalTimeline.vue";
import addLang from "../services/lang.js";

var groups = null;
var timelineEvents = null;

export default {
  name: "BaDetails",

  components: {
    MapboxMap,
    BAGraph,
    FactGridDate,
    VueHorizontalTimeline,
  },

  data() {
    return {
      agentDetails: ref(null),
      career: ref(null),
      spouses: ref(null),
      unmarriedpartners: ref(null),
      children: ref(null),
      religions: ref(null),
      firstnames: ref(null),
      stayIns: ref(null),
      addresses: ref(null),
      employer: ref(null),
      godchildren: ref(null),
      godfathers: ref(null),
      godparents: ref(null),
      masters: ref(null),
      carrier: ref(null),
      sources: ref(null),
      geodata: ref([]),
      timelineEvents: ref([]),
      tab: ref("details"),
      groups,
      agentId: ref(this.$route.params.id),
    };
  },

  methods: {
    async forceRender() {
      this.renderComponent = false;
      await this.$nextTick();
      this.renderComponent = true;
    },
    addTimeline() {
      this.timelineEvents2 = [];
      this.timelineEvents = [];
    },
    addListToGraph(id, data) {
      if (data && data.length && data[0].property) {
        var index = this.groups.findIndex((item) => item.id === id);
        this.groups[index].data = [];
        for (const entry of data) {
          this.groups[index].data.push({
            name: entry.propertyLabel.value,
            url: entry.property.value,
          });
        }
      }
    },

    addSingleEntryToGraph(id, data) {
      if (data) {
        var index = this.groups.findIndex((item) => item.id === id);
        this.groups[index].data = [];

        this.groups[index].data.push({
          name: data.name,
          url: data.url,
        });
      }
    },
    async getData() {
      try {
        const apiPrefix = "/agents/" + this.$route.params.id;
        const detailsRes = await this.$api.get(addLang(apiPrefix));
        this.agentDetails = detailsRes.data;

        // Data for lists
        const careerRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/career")
        );
        this.career = careerRes.data;

        const spouseRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/spouse")
        );
        this.spouses = spouseRes.data;
        this.addListToGraph(4, this.spouses);

        const unmarriedpartnersRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/unmarriedpartners")
        );
        this.unmarriedpartners = unmarriedpartnersRes.data;
        this.addListToGraph(9, this.unmarriedpartners);

        const stayInRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/stay-in")
        );
        this.stayIns = stayInRes.data;

        const addressesInRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/address")
        );
        this.addresses = addressesInRes.data;

        const firstnamesRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/firstname")
        );
        this.firstnames = firstnamesRes.data;

        const religionsRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/religion")
        );
        this.religions = religionsRes.data;

        const sourcesRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/source")
        );
        this.sources = sourcesRes.data;

        // Data for graph
        const mastersRes = await this.$api.get(
          addLang(apiPrefix + "/relations/master")
        );
        this.masters = mastersRes.data;
        this.addListToGraph(0, this.masters);

        const godparentsRes = await this.$api.get(
          addLang(apiPrefix + "/relations/godparent")
        );
        this.godparents = godparentsRes.data;
        this.addListToGraph(1, this.godparents);

        const godfathersRes = await this.$api.get(
          addLang(apiPrefix + "/relations/godfather")
        );
        this.godfathers = godfathersRes.data;
        this.addListToGraph(12, this.godfathers);

        const godchildrenRes = await this.$api.get(
          addLang(apiPrefix + "/relations/godchild")
        );
        this.godchildren = godchildrenRes.data;
        this.addListToGraph(2, this.godchildren);

        const childrenRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/child")
        );
        this.children = childrenRes.data;
        this.addListToGraph(3, this.children);

        const carrierRes = await this.$api.get(
          addLang(apiPrefix + "/listproperty/carrier")
        );
        this.carrier = carrierRes.data;
        this.addListToGraph(10, this.carrier);

        if (this.agentDetails.MotherLabel) {
          this.addSingleEntryToGraph(7, {
            name: this.agentDetails.MotherLabel.value,
            url: this.agentDetails.Mother.value,
          });
        }

        if (this.agentDetails.FatherLabel) {
          this.addSingleEntryToGraph(8, {
            name: this.agentDetails.FatherLabel.value,
            url: this.agentDetails.Father.value,
          });
        }

        // Get geo data for the map
        const stayInGeoRes = await this.$api.get(
          addLang(apiPrefix + "/geo/stay-in")
        );
        this.geodata.push({ group: "stayin", data: stayInGeoRes.data });

        const birthplaceGeoRes = await this.$api.get(
          addLang(apiPrefix + "/geo/birthplace")
        );
        this.geodata.push({ group: "birthplace", data: birthplaceGeoRes.data });

        const deathplaceGeoRes = await this.$api.get(
          addLang(apiPrefix + "/geo/deathplace")
        );
        this.geodata.push({ group: "deathplace", data: deathplaceGeoRes.data });
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getData();
  },
  created() {
    this.addTimeline();
    this.groups = [
      {
        id: 0,
        name: "Dienstherr/Dienstherrin",
        data: [],
      },
      {
        id: 1,
        name: "Taufpaten",
        data: [],
      },
      {
        id: 2,
        name: "Patenkinder",
        data: [],
      },
      {
        id: 3,
        name: "Ehekinder",
        data: [],
      },
      {
        id: 4,
        name: "Ehepartner",
        data: [],
      },
      {
        id: 5,
        name: "Kinder",
        data: [],
      },
      {
        id: 6,
        name: "Verwandte",
        data: [],
      },
      {
        id: 7,
        name: "Mutter",
        data: [],
      },
      {
        id: 8,
        name: "Vater",
        data: [],
      },
      {
        id: 9,
        name: "Unverheiratete Partnerschaften",
        data: [],
      },
      {
        id: 10,
        name: "An der Verschleppung des Subjektes beteiligte Person",
        data: [],
      },
      {
        id: 11,
        name: "Arbeitgeber",
        data: [],
      },
      {
        id: 12,
        name: "Paten",
        data: [],
      },
    ];
  },
};
</script>
<style lang="scss" scoped>
.mapbox-element {
  width: 100%;
  height: 100%;
}

iframe {
  width: 100%;
  min-height: 480px;
  border: 0;
}
.fg-embedded {
  min-height: 480px;
}
</style>

<template>
  <main>
    <div id="map" v-if="!nodata"></div>
    <div id="nodata" v-if="nodata">{{ $t("NO_DATA") }}</div>

    <table class="legend" cellpadding="10px" style="padding: 12px">
      <tbody class="legend-td">
        <tr>
          <td></td>

          <td style="font-weight: bold">{{ $t("LEGEND") }}</td>
        </tr>
        <tr>
          <td>
            <q-toggle
              v-model="stayinToggle"
              color="yellow"
              keep-color
              @update:model-value="updateMap()"
            />
          </td>

          <td>{{ $t("STAYING_LOCATIONS") }}</td>
        </tr>
        <tr>
          <td>
            <q-toggle v-model="birthplaceToggle" color="green" keep-color />
          </td>
          <td>{{ $t("BIRTH_LOCATIONS") }}</td>
        </tr>
        <tr>
          <td>
            <q-toggle v-model="deathplaceToggle" color="blue" keep-color />
          </td>
          <td>{{ $t("DEATH_LOCATIONS") }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { defineComponent, ref } from "vue";

const colorMapping = {
  birthplace: "#205010",
  stayin: "#ECE930",
  baptismplace: "#E62735",
  deathplace: "#273BE6",
  default: "#0A1043",
};

export default defineComponent({
  name: "MapboxMap",

  props: {
    geodata: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      stayinToggle: ref(true),
      birthplaceToggle: ref(true),
      deathplaceToggle: ref(true),
      center: [12.0, 55.0],
      zoom: ref(5),
      nodata: ref(false),
    };
  },
  mounted() {
    this.createMap();
    this.setGeoData();
  },
  methods: {
    updateMap() {},
    setGeoData() {
      const geogroups = this.$props.geodata;
      var maxLattitude = 0,
        maxLongitude = 0,
        minLattitude = 0,
        minLongitude = 0;

      if (geogroups.length && geogroups[0].data[0]) {
        const firstPoint = [
          geogroups[0].data[0].Longitude.value,
          geogroups[0].data[0].Latitude.value,
        ];
        for (const group of geogroups) {
          for (const place of group.data) {
            //const markername = `marker_${group.group}_${i}`;
            //i++;
            var color = colorMapping["default"];

            if (colorMapping[group.group]) {
              color = colorMapping[group.group];
            }
            if (Number(place.Longitude.value) < minLongitude) {
              minLongitude = Number(place.Longitude.value);
            }
            if (Number(place.Longitude.value) > maxLongitude) {
              maxLongitude = Number(place.Longitude.value);
            }
            if (Number(place.Latitude.value) < minLattitude) {
              minLattitude = Number(place.Latitude.value);
            }
            if (Number(place.Latitude.value) > maxLattitude) {
              maxLattitude = Number(place.Latitude.value);
            }
            const marker = new mapboxgl.Marker({
              color: color,
              draggable: false,
            })
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  "FactGrid: <a href= '" +
                    place.Place.value +
                    "' target='_blank' style='text-transform: capitalize;'>" +
                    place.PlaceLabel.value +
                    "</a>"
                )
              )
              .setLngLat([place.Longitude.value, place.Latitude.value])
              .addTo(this.map);
          }
        }
        if (maxLongitude - minLongitude < 10) {
          this.map.flyTo({
            center: [
              (maxLongitude + minLongitude) / 2,
              (maxLattitude + minLattitude) / 2,
            ],
            zoom: 4,
            duration: 8000,
            essential: true,
          });
        } else {
          this.map.flyTo({
            center: firstPoint,
            zoom: 6,
            duration: 8000,
            essential: true,
          });
        }
      } else {
        this.nodata = true;
      }
    },
    createMap() {
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
    },
  },
});
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

.text-container {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  margin: 0 auto; /* center text container */
}
.legend {
  text-align: center;
  margin: 12px auto; /* center text container */
}

.stayin-square {
  text-align: left;
  height: 18px;
  width: 18px;
  background-color: #ece930;
}
.birthplace-square {
  text-align: left;
  height: 18px;
  width: 18px;
  background-color: #205010;
}
.deathplace-square {
  text-align: left;
  height: 18px;
  width: 18px;
  background-color: #273be6;
}
.legend-td {
  padding: 8px;
}
</style>

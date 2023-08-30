<template>
  <span v-if="prefix">{{ prefix }}:&nbsp;</span>
  {{ fdate }}
  <sup>
    <i>
      {{ fcalender }}
    </i>
  </sup>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FactGridDate",
  props: {
    prefix: {
      type: String,
      required: false,
    },

    datestring: {
      type: String,
      required: true,
    },
    precision: {
      type: Number,
      default: 11,
    },
    calendar: {
      type: String,
      default: "http://www.wikidata.org/entity/Q1985727",
    },
  },
  data() {
    return {
      fdate: ref(null),
      fcalender: ref("greg"),
    };
  },

  created() {
    const date = new Date(this.$props.datestring);

    this.fdate = date.getFullYear().toString();
    if (this.$props.precision > 9) {
      this.fdate =
        date.toLocaleString("default", { month: "long" }) + " " + this.fdate;
      if (this.$props.precision > 10) {
        this.fdate = date.getDate().toString() + " " + this.fdate;
      }
    }

    if (this.$props.calendar.slice(-3) == "786") {
      this.fcalender = "jul";
    }
  },
});
</script>

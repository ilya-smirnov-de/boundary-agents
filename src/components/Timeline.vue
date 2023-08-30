<template>
  <div v-if="!nodata"></div>
  <div id="nodata" v-if="nodata">{{ $t("NO_DATA") }}</div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BATimeline",
  components: {},

  props: {
    agent: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      nodata: ref(false),
    };
  },

  methods: {},
  mounted() {
    const agent_node = this.$props.agent;
  },
});
</script>
<style scoped></style>

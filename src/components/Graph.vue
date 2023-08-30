<template>
  <v-network-graph
    v-if="!nodata"
    style="margin: auto"
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :configs="configs"
    :layouts="layouts"
    :zoom-level="0.5"
    :event-handlers="eventHandlers"
  />
  <div id="nodata" v-if="nodata">{{ $t("NO_DATA") }}</div>
</template>
<script>
import { VNetworkGraph } from "v-network-graph";
import * as vNG from "v-network-graph";
import dagre from "dagre/dist/dagre.min.js";
import { defineComponent, ref } from "vue";
import "v-network-graph/lib/style.css";

const nodes = ref({});
const edges = ref({});
const layouts = ref({});
var urls = {};

const eventHandlers = ref({
  "node:click": ({ node }) => {
    if (urls[node]) {
      window.open(urls[node].url, "_blank");
    }
  },
  "node:pointerover": ({ node }) => {},
  "node:pointerout": (_) => {},
});

const configs = ref(
  vNG.defineConfigs({
    node: {
      selectable: true,
      normal: {
        type: "rect",
        width: 140,
        height: 36,
        borderRadius: 12,
        color: "#cfffaf",
      },
      hover: {
        color: "#dfff20",
        width: 144,
        height: 40,
        borderRadius: 12,
      },
      label: {
        fontSize: 12,
        color: "#000000",
        direction: "center",
        style: "",
      },
    },
    edge: {
      normal: {
        width: 2,
        color: "#0f0f00",
        linecap: "round",
      },
      hover: {
        color: "#ff5500",
      },
    },
    view: {
      autoPanAndZoomOnLoad: "fit-content",
    },
  })
);

export default defineComponent({
  name: "BAGraph",
  components: {
    VNetworkGraph,
  },

  props: {
    groups: {
      type: Array,
      required: true,
    },
    agent: {
      type: String,
      required: true,
    },
    agentLink: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      configs,
      urls,
      nodes: ref({}),
      edges: ref({}),
      layouts: ref({}),
      eventHandlers,
      nodata: ref(false),
    };
  },

  methods: {
    dagreLayout(direction) {
      if (
        Object.keys(this.nodes).length <= 1 ||
        Object.keys(this.edges).length == 0
      ) {
        return;
      }

      const g = new dagre.graphlib.Graph();
      // Set an object for the graph label
      g.setGraph({
        rankdir: direction,
        nodesep: 140,
        edgesep: 140,
        ranksep: 140,
        marginx: 24,
        marginy: 24,
      });
      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(() => ({}));

      // Add nodes to the graph. The first argument is the node id. The second is
      // metadata about the node. In this case we're going to add labels to each of
      // our nodes.
      Object.entries(this.nodes).forEach(([nodeId, node]) => {
        g.setNode(nodeId, {
          label: node.name,
          width: 140,
          height: 40,
        });
      });

      // Add edges to the graph.
      Object.values(this.edges).forEach((edge) => {
        g.setEdge(edge.source, edge.target);
      });

      dagre.layout(g);

      this.layouts[nodes] = {};
      this.layouts[edges] = {};
      this.layouts = {
        nodes: {
          agent_node: {
            x: 0,
            y: 0,
            fixed: false,
          },
        },
      };
      g.nodes().forEach((nodeId) => {
        // update node position
        const x = g.node(nodeId).x;
        const y = g.node(nodeId).y;
        this.layouts.nodes[nodeId] = { x: x, y: y };
      });
    },
  },
  mounted() {
    const agent_node = {
      agent_node: {
        name: this.$props.agent,
      },
    };
    const firstLevel = this.$props.groups;

    this.nodata = true;
    this.nodes = agent_node;
    this.edges = [];
    for (const flGroup of firstLevel) {
      if (flGroup.data && flGroup.data.length) {
        this.nodata = false;
        const nodeName = `node${flGroup.id}`;
        const edgeName = `edge${flGroup.id}`;
        this.nodes[nodeName] = { name: flGroup.name };
        this.edges[edgeName] = {
          source: "agent_node",
          target: nodeName,
        };

        if (flGroup.data) {
          let i = 1;
          for (const endNode of flGroup.data) {
            const endNodeName = `node${flGroup.id}_${i}`;
            const endEdgeName = `edge${flGroup.id}_${i}`;

            var label;
            if (endNode.name.length > 21) {
              label = endNode.name.substring(0, 20) + "...";
            } else {
              label = endNode.name;
            }
            this.nodes[endNodeName] = { name: label };

            this.urls[endNodeName] = { url: endNode.url };

            this.edges[endEdgeName] = {
              source: nodeName,
              target: endNodeName,
            };
            i++;
          }
        }
      }
    }
    this.dagreLayout("TB");
  },
});
</script>
<style scoped>
.outer-box {
  align-items: center;
  align-self: center;
  align-content: center;
}
.graph {
  max-width: 800px;
  height: 500px;
  border: 1px solid #e9e6e6;
  border-radius: 12px;
  align-items: center;
  align-self: center;
  align-content: center;
}
</style>

import React, { useEffect } from "react";
import { Graph } from "@antv/x6";
const UNIQ_GRAPH_ID = "UNIQ_GRAPH_ID"; // 任意字符串，作为画布的唯一标识。注意：任意两张同时渲染的画布需要有不同的标识
import { TreeEdge } from "./CustomEdge";
import { TreeNode } from "./CustomNode";
export const TopologyGraph: React.FC<{}> = () => {
  useEffect(() => {
    // 初始化画布
    const graph = new Graph({
      container: document.getElementById("container")!,
      async: true,
      frozen: true,
      scroller: true,
      interacting: false,
      sorting: "approx",
      connecting: {
        anchor: "orth",
        connector: "rounded",
        connectionPoint: "boundary",
        router: {
          name: "er",
          args: {
            offset: 24,
            direction: "H",
          },
        },
      },
    });

    graph.on("node:collapse", ({ node }: any) => {
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const run = (pre: any) => {
        const succ = graph.getSuccessors(pre, { distance: 1 });
        if (succ) {
          succ.forEach((node: any) => {
            node.toggleVisible(!collapsed);
            if (!node.isCollapsed()) {
              run(node);
            }
          });
        }
      };
      run(node);
    });

    fetch("/api/mindmap")
      .then((response) => response.json())
      .then((data) => {
        const start = new Date().getTime();
        const nodes = data.nodes.map(({ leaf, ...metadata }: any) => {
          const node = new TreeNode(metadata);
          if (leaf) {
            node.toggleButtonVisibility(leaf === false);
          }
          return node;
        });
        const edges = data.edges.map(
          (edge: any) =>
            new TreeEdge({
              source: edge.source,
              target: edge.target,
            })
        );

        graph.resetCells([...nodes, ...edges]);

        graph.unfreeze({
          progress({ done }) {
            if (done) {
              const time = new Date().getTime() - start;
              console.log(time);
              graph.unfreeze({
                batchSize: 50,
              });
              graph.zoomToFit({ padding: 24 });
            }
          },
        });
      });
  }, []);

  return <div id="container" style={{ height: "500px" }}></div>;
};

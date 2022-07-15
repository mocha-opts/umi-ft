import type { Graph, Node } from "@antv/x6";
// 划重点！这个不属于x6内的，要另下包，用来布局
import dagre from "dagre";
import { createEdgeByInfo, getTreeRootNodeMeta } from "./custom";

//我的方法和官网的不同，虽然是hooks的开发模式，但是还是用声明类的方法
//也推荐这种，因为比较全面，可观性好
export class DeptDrawing {
  public graph: Graph | undefined;

  private nodes:
    | any[] //节点
    | undefined; //节点
  private edges:
    | any[] //边
    | undefined; //边

  construtor() {
    this.nodes = [];
    this.edges = [];
  }

  //传入数据然后赋值
  public loadData(data: any) {
    let { nodes, edges } = data;
    this.nodes = nodes;
    this.edges = edges;
  }

  //渲染
  public render() {
    this.graph?.fromJSON({
      nodes: this.nodes?.map((item: any) => {
        // 这里的getTreeRootNodeMeta方法是自定义节点的方法，用customMeta 来储存
        let customMeta = getTreeRootNodeMeta();
        return {
          ...item,
          ...customMeta,
        };
      }),
    });

    //addEdge是官网API，createEdgeByInfo是另写的，创建边
    this.edges?.forEach((v) => {
      this.graph?.addEdge(createEdgeByInfo(v));
    });

    //这一步是用来控制树的布局
    this.layout();
  }

  //下面就是纯ctrl c v了，基本无差错，除了宽高需要自行调整
  //下面用到的方法都是官网API
  public layout() {
    const dir = "LR"; // LR RL TB BT
    const nodes = this.graph?.getNodes();
    const edges = this.graph?.getEdges();

    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: dir, nodesep: 30, ranksep: 50, align: "UL" });
    g.setDefaultEdgeLabel(() => ({}));

    const width = 276;
    const height = 84;
    nodes?.forEach((node) => {
      g.setNode(node.id, { width, height });
    });
    console.log(nodes);
    edges?.forEach((edge) => {
      const source = edge.getSource() as any;
      const target = edge.getTarget() as any;
      g.setEdge(source.cell, target.cell);
    });
    dagre.layout(g);
    // console.log(g, nodes, edges);
    this.graph?.freeze();
    g.nodes().forEach((id) => {
      const node = this.graph?.getCellById(id) as Node;
      if (node) {
        const pos = g.node(id);
        node.position(pos.x, pos.y);
      }
    });

    edges?.forEach((edge) => {
      const source = edge?.getSourceNode()!;
      const target = edge?.getTargetNode()!;
      const sourceBBox = source.getBBox();
      const targetBBox = target.getBBox();
      if ((dir === "LR" || dir === "RL") && sourceBBox.y !== targetBBox.y) {
        const gap =
          dir === "LR"
            ? targetBBox.x - sourceBBox.x - sourceBBox.width
            : -sourceBBox.x + targetBBox.x + targetBBox.width;
        const fix = dir === "LR" ? sourceBBox.width : 0;
        const x = sourceBBox.x + fix + gap / 2;
        edge.setVertices([
          { x, y: sourceBBox.center.y },
          { x, y: targetBBox.center.y },
        ]);
      } else if (
        (dir === "TB" || dir === "BT") &&
        sourceBBox.x !== targetBBox.x
      ) {
        const gap =
          dir === "TB"
            ? targetBBox.y - sourceBBox.y - sourceBBox.height
            : -sourceBBox.y + targetBBox.y + targetBBox.height;
        const fix = dir === "TB" ? sourceBBox.height : 0;
        const y = sourceBBox.y + fix + gap / 2;
        edge.setVertices([
          { x: sourceBBox.center.x, y },
          { x: targetBBox.center.x, y },
        ]);
      } else {
        edge.setVertices([]);
      }
    });
    this.graph?.unfreeze();
    this.graph?.centerContent();
  }

  //这里是一个缩放画布的功能，可根据具体业务来添加
  public zoomGraph(expand: boolean, factor: number = 0.1) {
    if (expand) {
      this.graph?.zoom(factor);
    } else {
      this.graph?.zoom(-factor);
    }
  }
}

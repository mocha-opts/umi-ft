import { Graph, Node, Edge, Shape } from "@antv/x6";

// 定义边
export class TreeEdge extends Shape.Edge {
  isHidden() {
    const node = this.getTargetNode();
    return !node || !node.isVisible();
  }
}

// 注册
// 注册
Edge.registry.register("tree-edge", TreeEdge, true);

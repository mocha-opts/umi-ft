import { Shape } from "@antv/x6";
import { TreeEdgeInfo } from "./config";

//定义节点和边的别名
//这里其实不定义也可以，直接写后面的字符串，如果需要自定义的节点和边比较多的话，推荐写，重要是为了区分他们
export const RootNodeName = "root-node";
export const TreeEdge = "tree-edge";

//自定义节点
//这里暂时不是组件，得先创建有这么一个区域，可以理解为给他一个车位
export function getTreeRootNodeMeta() {
  return {
    shape: "react-shape",
    component: RootNodeName,
    width: 276,
    height: 84,
  };
}

// 创建自己的边
export const createEdgeByInfo = ({ target, source, id }: any) => {
  return new Shape.Edge({
    id,
    target,
    source,
    shape: TreeEdge,
    ...TreeEdgeInfo, //这里就是刚写的边的配置信息
  });
};

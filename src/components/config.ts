//这个引入的就是上面代码的文件
import { DeptDrawing } from "./drawing";

export const deptDrawing = new DeptDrawing();

//画布配置
export const getDeptGraphConfig = (container: any) => {
  return {
    container,
    width: 1300,
    height: 487,
    autoResize: true,
    interactiong: false,
    mousewheel: {
      enabled: true,
      modifiers: "ctrl",
      factor: 1.1,
      maxScale: 2,
      minScale: 0.5,
    },
    sorting: "approx" as any,
    selecting: false,
    Keyboard: {
      enabled: true,
      global: true,
    },
    history: true,
    background: {
      color: "#fff", //画布背景色
    },
    grid: {
      size: 5, //网格大小 5px
      visible: false, //是否渲染网格背景
    },
    scroller: {
      enabled: true,
      pannable: true,
      maxWidth: 1400, //画布最大宽度
    },
  };
};

//获取节点的可视化配置信息
export const getNodeMeta = () => {
  return {
    shape: "tree-node",
    width: 276,
    height: 84,
  };
};

//边的配置信息
export const TreeEdgeInfo = {
  router: { name: "manhattan" },
  connector: { name: "rounded" },
  attrs: {
    line: {
      stroke: "#5b8ff9",
      targetMarker: "classic",
    },
  },
};

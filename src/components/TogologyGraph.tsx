import React, { useEffect, useState, useRef } from "react";
import { Cell, Graph, Node, ToolsView } from "@antv/x6";
import dagre from "dagre";
import { Menu, Modal, message, Dropdown } from "antd";
import { SnapshotNode } from "./SnapshotNode";
import { registry } from "@antv/x6-react-shape";
import { RootNodeName } from "./custom";
import { DeptDrawing } from "./drawing";
import { getDeptGraphConfig } from "./config";
export default function TopologyGraph() {
  const graphDrawing = new DeptDrawing();
  const conRef = useRef(null);
  useEffect(() => {
    //这里是根据条件来注册自定义节点，然后渲染
    if (!registry.exist(RootNodeName)) {
      // registerReactComponent为API接口
      Graph.registerReactComponent(RootNodeName, (node) => {
        return <SnapshotNode node={node} graphDrawing={graphDrawing} />;
      });
    }
    fetch("/api/mindmap")
      .then((res) => res.json())
      .then((data) => {
        //获取数据并处理
        graphDrawing.loadData(data);
        console.log(data);
        //这里getDeptGraphConfig方法是画布的配置
        graphDrawing.graph = new Graph(getDeptGraphConfig(conRef.current));
        //渲染画布数据
        graphDrawing.render();
      });
  }, []);

  // //监听数据，实时更新并渲染
  // useEffect(() => {
  //   graphDrawing.loadData(data);
  //   graphDrawing.render();
  // }, [data]);

  return (
    <div
      id="container"
      ref={conRef}
      style={{ border: "1px solid grey", marginLeft: "20px" }}
    ></div>
  );
}

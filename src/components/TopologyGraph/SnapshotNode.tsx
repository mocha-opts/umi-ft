import type { Node } from "@antv/x6";
import React from "react";
import "@antv/x6-react-shape";
import { Button, Dropdown, Menu, Tooltip } from "antd";

import "./node.less";
import Icon from "@ant-design/icons";

// 定义节点
export class SnapshotNode extends React.Component<{
  node?: Node;
  graphDrawing?: any;
}> {
  constructor(props: any) {
    super(props);
    console.log("props", props);
  }
  shouldComponentUpdate() {
    const { node } = this.props;
    if (node) {
      if (node.hasChanged("data")) {
        return true;
      }
    }
    return false;
  }


  render() {
    const { node } = this.props;
    const { data } = node?.store;
    if (data) {
      let { id, name, resourceType, status, autoSnapshot, createTime } = data;
      console.log(name, data);
      return (
        <div className="archer-snapshot-card">
          <div className="archer-snapshot-card-content">
            {<div className="archer-snapshot-card-tag">自动</div>}
            <Tooltip placement="top" title={name}>
              <span className="archer-snapshot-name">{name}</span>
            </Tooltip>
            <div className="archer-snapshot-label">
              <div className="archer-createtime">{createTime}</div>
              <Button size="small" type="primary">
                创建失败
              </Button>
              <></>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

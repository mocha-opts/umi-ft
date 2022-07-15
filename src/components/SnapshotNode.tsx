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
  renderButton() {
    const isErrorStatus = sanSpecialStatus.includes(data.status);
    const errorArr =
      tableDataSource?.filter((val) => sanSpecialStatus.includes(val.status)) ||
      [];
    if (isErrorStatus && errorArr.length && data.id == errorArr[0].id) {
      return (
        <Button
          type="link"
          onClick={() => {
            if (data.status == "ERRORROLLBACKING") {
              setCurrentData(data);
              rollBackNodeRef?.current?.setCreateModalVisible(true);
              // handleRollback(data.id, data.name, isErrorStatus);
            } else {
              handleBatchDelete([data], "single");
            }
          }}
        >
          {data.status == "ERRORROLLBACKING"
            ? intl.formatMessage({ id: "Recovery" })
            : intl.formatMessage({ id: "Delete" })}
        </Button>
      );
    }
    const options = snapShotOperate({
      ...props,
      setCurrentData,
      data,
      intl,
      errorArr,
      editSnapshotRef,
      rollBackNodeRef,
      handleBatchDelete,
      isWindows,
      checkData,
    });
    const overlay = (
      <Menu>
        {options.map(({ callback, name, disabled, disableTips }) => (
          <Menu.Item onClick={callback} disabled={disabled} key={name}>
            {name === intl.formatMessage({ id: "CreateVm" }) &&
            checkStaleLoading ? (
              <Loading size="small" style={{ height: "20px" }} />
            ) : !disableTips ? (
              name
            ) : (
              <Tooltip title={disableTips}>
                {name}
                <Icon
                  type="icon-c_question-s"
                  style={{ marginLeft: 5, color: "#ddd" }}
                />
              </Tooltip>
            )}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown
        onVisibleChange={(visible) => handleOverlayCollapse(visible, data)}
        overlay={overlay}
        placement="bottomLeft"
        trigger={["click"]}
        className="action-tooltip"
        arrow
      >
        <Button
          icon="icon-more"
          type="operate"
          size="small-s"
          style={{
            height: 16,
            width: 22,
            lineHeight: "14px",
          }}
        />
      </Dropdown>
    );
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

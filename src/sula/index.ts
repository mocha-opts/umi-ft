// 入口文件
import {
  registerFieldPlugins,
  registerRenderPlugins,
  registerActionPlugins,
  registerFilterPlugins,
  Icon,
} from "sula";
import "antd/dist/antd.less";
import { UserOutlined } from "@ant-design/icons";
// 注册插件
registerFieldPlugins();
registerRenderPlugins();
registerActionPlugins();
registerFilterPlugins();
// 注册icon
Icon.iconRegister({
  user: UserOutlined,
});

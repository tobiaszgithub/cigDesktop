import { LockOutlined, UnlockOutlined, ApiOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-universal.png";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to={"/start"}>Start</Link>,
    "start",
    <HomeOutlined />,
    null),
  getItem(
    <Link to={"/settings"}>Settings</Link>,
    "settings",
    <SettingOutlined />,
    null),
  getItem("Systems", "systems", <ApiOutlined />, [
    getItem(
      <Link to={"systems/cloud-foundry-dev-basic"}>cloud-foundry-dev-basic</Link>,
      "cloud-foundry-dev-basic"
    ),
    getItem(
      <Link to={"systems/hic-neo-dev"}>hic-neo-dev</Link>,
      "hic-neo-dev"
    ),
    getItem(
      <Link to={"systems/cloud-foundry-dev"}>cloud-foundry-dev</Link>,
      "cloud-foundry-dev"
    ),
    getItem(
      <Link to={"systems/hr-camp-sonova-neo-dev"}>hr-camp-sonova-neo-dev</Link>,
      "hr-camp-sonova-neo-dev"
    ),
  ]),

];

const TenantsMenu = () => {
  return (
    <Layout.Sider theme="light" style={{ background: "white" }}>

      <Menu
        // defaultSelectedKeys={["settings"]}
        mode="inline"
        items={items}
        style={{ width: 256 }}
      />
    </Layout.Sider>
  );
};

export default TenantsMenu;

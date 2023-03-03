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
      "1"
    ),
    getItem(
      <Link to={"systems/hic-neo-dev"}>hic-neo-dev</Link>,
      "2"
    ),
    getItem(
      <Link to={"systems/cloud-foundry-dev"}>cloud-foundry-dev</Link>,
      "3"
    ),
    getItem(
      <Link to={"systems/hr-camp-sonova-neo-dev"}>hr-camp-sonova-neo-dev</Link>,
      "3"
    ),
  ]),
  getItem("Private Actions", "sub2", <LockOutlined />, [
    getItem(
      "Repositories",
      "g3",
      null,
      [
        getItem(
          <Link to={"repositories/private"}>View my repositories</Link>,
          "5"
        ),
      ],
      "group"
    ),
    getItem(
      "Gists",
      "g4",
      null,
      [
        getItem(<Link to={"gists/private"}>View my gists</Link>, "6"),
        getItem(<Link to={"gist/new"}>Create new gist</Link>, "7"),
      ],
      "group"
    ),
  ]),
];

const TenantsMenu = () => {
  return (
    <Layout.Sider theme="light" style={{ background: "white" }}>

      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ width: 256 }}
      />
    </Layout.Sider>
  );
};

export default TenantsMenu;

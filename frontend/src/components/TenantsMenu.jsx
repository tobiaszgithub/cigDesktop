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


const TenantsMenu = ({ configuration }) => {


  console.log("TenantMenu: Configuration: ")
  console.log(configuration)
  let tenants = []
  if (configuration['tenants']) {
    tenants = configuration.tenants.map((tenant) => {
      return getItem(
        <Link to={`tenants/${tenant.key}`}>{tenant.key}</Link>,
        tenant.key

      )
    })
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
    getItem("Tenants", "tenants", <ApiOutlined />, tenants),

  ];


  return (
    <Layout.Sider theme="light" style={{ background: "white" }}>

      <Menu
        // defaultSelectedKeys={["settings"]}
        mode="inline"
        items={items}
        style={{ width: 256 }}
        defaultOpenKeys={['tenants']}
      />
    </Layout.Sider>
  );
};

export default TenantsMenu;

import { LockOutlined, UnlockOutlined, ApiOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/start"
      : location.pathname,
  );
  console.log("location.pathname: " + location.pathname)
  console.log("current: " + current)

  useEffect(() => {
    console.log("useEffect: location.pathname: " + location.pathname)
    console.log("useEffect: current: " + current)
    if (location) {
      if (current !== location.pathname) {
        if (location.pathname.startsWith("/tenants")) {
          let tenantPath = location.pathname.split("/")
          console.log(tenantPath)
          setCurrent(tenantPath.slice(0,3).join("/"))
        } else {
          setCurrent(location.pathname);
        }

      }
    }
  }, [location, current]);

  console.log("TenantMenu: Configuration: ")
  console.log(configuration)
  let tenants = []
  if (configuration['tenants']) {
    tenants = configuration.tenants.map((tenant) => {
      return getItem(
        <Link to={`/tenants/${tenant.key}`}>{tenant.key}</Link>,
        `/tenants/${tenant.key}`

      )
    })
  }


  const items = [
    getItem(
      <Link to={"/start"}>Start</Link>,
      "/start",
      <HomeOutlined />,
      null),
    getItem(
      <Link to={"/settings"}>Settings</Link>,
      "/settings",
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
        selectedKeys={[current]}
      />
    </Layout.Sider>
  );
};

export default TenantsMenu;

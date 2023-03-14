import logo from './assets/images/logo-universal.png';
import { Greet } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";
import DataGrid from './components/IntegrationPackages/DataGrid';

import NavBar from "./components/NavBar";
import { FloatButton, Layout, message,Spin } from "antd";
import { Outlet } from "react-router-dom";
import BreadCrumb from './components/BreadCrumb';
import TenantsMenu from './components/TenantsMenu';
import { useEffect, useState } from "react";
import { GetConfigurationFile } from "../wailsjs/go/main/App";


const { Content } = Layout;

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [configuration, setConfiguration] = useState({})
  const [messageApi, contextHolder] = message.useMessage();

  
  useEffect(() => {
    const getConfiguration = async () => {
      setIsLoading(true);
      GetConfigurationFile()
        .then((config) => {
          console.log("App: configuration file:");
          console.log(config);
          setConfiguration(config)
          setIsLoading(false);
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error,
          });
          setIsLoading(false);
        });
    }
    getConfiguration();

  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* <NavBar /> */}
      <Spin tip="Loading" spinning={isLoading}>
        <Layout>
          <TenantsMenu configuration={configuration} />
          <Layout className="site-layout">
            <BreadCrumb />
            <Content
              style={{
                background: "white",
                padding: "0 50px",
              }}
            >
              <div
                style={{
                  padding: 24,
                }}
              >
                <Outlet />
                <FloatButton.BackTop />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Spin>

    </Layout>
  );
};

export default App

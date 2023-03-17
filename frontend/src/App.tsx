import logo from './assets/images/logo-universal.png';
import { Greet } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";
import DataGrid from './components/IntegrationPackages/DataGrid';

import NavBar from "./components/NavBar";
import { FloatButton, Layout, message, Spin } from "antd";
import { Outlet } from "react-router-dom";
import BreadCrumb from './components/BreadCrumb';
import TenantsMenu from './components/TenantsMenu';
import { useEffect, useState, createContext, useContext } from "react";
import { GetConfigurationFile } from "../wailsjs/go/main/App";
import { model, config } from "../wailsjs/go/models";


const { Content } = Layout;

interface IConfigurationContext {
  configuration: config.ConfigurationFile;
  setConfiguration: (configuration: config.ConfigurationFile) => void
}

export const ConfigurationContext = createContext<IConfigurationContext | null>(null);

const App = () => {
  const tenants: Array<config.Configuration> = [new config.Configuration()];
  const [isLoading, setIsLoading] = useState(true);
  const [configuration, setConfiguration] = useState<config.ConfigurationFile>(new config.ConfigurationFile())
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
    <ConfigurationContext.Provider
      value={{
        configuration,
        setConfiguration,
      }}>

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
    </ConfigurationContext.Provider>
  );
};

export default App

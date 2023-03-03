import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import { Greet } from "../wailsjs/go/main/App";
import { main } from "../wailsjs/go/models";
import DataGrid from './components/IntegrationPackages/DataGrid';

import NavBar from "./components/NavBar";
import { FloatButton, Layout } from "antd";
import { Outlet } from "react-router-dom";
import BreadCrumb from './components/BreadCrumb';
import TenantsMenu from './components/TenantsMenu';

const { Content } = Layout;

const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Layout>
        <TenantsMenu />
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
    </Layout>
  );
};

export default App

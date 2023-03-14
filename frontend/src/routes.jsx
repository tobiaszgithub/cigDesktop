import App from "./App";

import IntegrationPackages from "./components/IntegrationPackages/IntegrationPackages";
import IntegrationFlowDetails from "./components/IntegrationFlows/IntegrationFlowDetails";
import IntegrationPackagesTable from "./components/IntegrationPackages/IntegrationPackagesTable";
import IntegrationPackageDetailsWithParam from "./components/IntegrationPackages/IntegrationPackageDetailsWithParam";
import SettingsDetails from "./components/Settings/SettingsDetails";
import StartPage from "./components/StartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <IntegrationPackagesTable /> },
      {
        path: "/settings",
        element: <SettingsDetails />,
      },
      {
        path: "/start",
        element: <StartPage />,
      },
      {
        path: "packages",
        element: <IntegrationPackagesTable />,
      },
      {
        path: "/tenants/:tenantKey/packages",
        element: <IntegrationPackagesTable />,
      },
      {
        path: "/tenants/",
        element: <div>Tenants:</div>,
      },
      {
        path: "/tenants/:tenantKey",
        element: <IntegrationPackagesTable />,
      },
      {
        path: "/tenants/:tenantKey/packages/:integrationPackage",
        element: <IntegrationPackageDetailsWithParam />,
      },
      {
        path: "/tenants/:tenantKey/packages/:integrationPackage/integrationFlows",
        element: <IntegrationPackageDetailsWithParam />,
      },
      {
        path: "/integrationFlows/:integrationFlow",
        element: <IntegrationFlowDetails />,
      },
      {
        path: "/tenants/:tenantKey/packages/:integrationPackage/integrationFlows/:integrationFlow",
        element: <IntegrationFlowDetails />,
      },

    ],
  },
];
export default routes;
import App from "./App";

import IntegrationPackages from "./components/IntegrationPackages/IntegrationPackages";
import IntegrationFlowDetails from "./components/IntegrationFlows/IntegrationFlowDetails";
import IntegrationPackagesTable from "./components/IntegrationPackages/IntegrationPackagesTable";
import IntegrationPackageDetailsWithParam from "./components/IntegrationPackages/IntegrationPackageDetailsWithParam";
import SettingsDetails from "./components/Settings/SettingsDetails";

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
        path: "packages",
        element: <IntegrationPackagesTable />,
      },
      {
        path: "/packages/:integrationPackage",
        element: <IntegrationPackageDetailsWithParam />,
      },
      {
        path: "/packages/:integrationPackage/integrationFlows",
        element: <IntegrationPackageDetailsWithParam />,
      },
      {
        path: "/integrationFlows/:integrationFlow",
        element: <IntegrationFlowDetails />,
      },
      {
        path: "/packages/:integrationPackage/integrationFlows/:integrationFlow",
        element: <IntegrationFlowDetails />,
      },

    ],
  },
];
export default routes;
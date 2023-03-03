import { useEffect, useState } from "react";

import { GetIntegrationPackages } from "../../../wailsjs/go/main/App";
import MasterDetail from "../MasterDetail";
import IntegrationPackageDetails from "./IntegrationPackageDetails"
import { message } from "antd";

const IntegrationPackages = () => {
  const [packages, setPackages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const getPackages = async () => {
      GetIntegrationPackages()
        .then((packages) => {
          console.log("integration packages:")
          console.log(packages);
          setPackages(packages);
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error,
          });
        });
    };
    getPackages();
  }, []);

  const title = "Integration Packages";
  const getItemDescription = (integrationPackage) => integrationPackage.Name;
  const getItemContent = (integrationPackage) => integrationPackage.Id
  const detailLayout = (integrationPackage) => (
    // <RepositoryDetails repository={repository} />
    <IntegrationPackageDetails integrationPackage={integrationPackage}/>
  );

  return (
    <>
      {contextHolder}
      <MasterDetail
        title={title}
        items={packages}
        getItemDescription={getItemDescription}
        getItemContent = {getItemContent}
        detailLayout={detailLayout}
        
      />
    </>
  );
};

export default IntegrationPackages;
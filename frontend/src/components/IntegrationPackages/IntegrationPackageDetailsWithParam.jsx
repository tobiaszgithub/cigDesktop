import { useEffect, useState } from "react";
import IntegrationFlows from "../IntegrationFlows/IntegrationFlows";
import { useParams } from 'react-router-dom';

const IntegrationPackageDetailsWithParam = () => {
  const { integrationPackage } = useParams();
          
  console.log("IntegrationPackageDetailsWithParam: ", integrationPackage)
  return (
    <>
      <div>test from PackageDetails{integrationPackage}</div>
      <IntegrationFlows integrationPackageId={integrationPackage} />
    </>

  );
};


export default IntegrationPackageDetailsWithParam;
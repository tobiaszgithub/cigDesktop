import { useEffect, useState } from "react";
import IntegrationFlows from "../IntegrationFlows/IntegrationFlows";
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;

const IntegrationPackageDetailsWithParam = () => {
  const { integrationPackage } = useParams();
          
  console.log("IntegrationPackageDetailsWithParam: ", integrationPackage)
  return (
    <>
      <Title level={5}>Integration Flows:</Title>
      <IntegrationFlows integrationPackageId={integrationPackage} />
    </>

  );
};


export default IntegrationPackageDetailsWithParam;
import { useEffect, useState } from "react";
import IntegrationFlows from "../IntegrationFlows/IntegrationFlows";
import { Typography } from 'antd';
const { Title } = Typography;

const IntegrationPackageDetails = ({ integrationPackage }) => {

  return (
    <>
      <Title level={3}>test from PackageDetails</Title>
      <IntegrationFlows integrationPackageId={integrationPackage.Id} />
    </>

  );
};


export default IntegrationPackageDetails;
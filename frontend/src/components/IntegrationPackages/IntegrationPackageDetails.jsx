import { useEffect, useState } from "react";
import IntegrationFlows from "../IntegrationFlows/IntegrationFlows";

const IntegrationPackageDetails = ({ integrationPackage }) => {

  return (
    <>
      <div>test from PackageDetails</div>
      <IntegrationFlows integrationPackageId={integrationPackage.Id} />
    </>

  );
};


export default IntegrationPackageDetails;
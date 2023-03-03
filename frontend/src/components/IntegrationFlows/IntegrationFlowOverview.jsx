import { Avatar, Button, Card, Divider, List, Spin, Timeline, Typography } from "antd";


const IntegrationFlowOverview = ({ integrationFlow }) => {
  return (
    <div>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Iflow Details:
      </Typography.Title>
      <p>Id: {integrationFlow.Id}</p>
      <p>Name: {integrationFlow.Name}</p>
      <p>PackageId: {integrationFlow.PackageId}</p>
      <p>Receiver: {integrationFlow.Receiver}</p>
      <p>Sender: {integrationFlow.Sender}</p>
      <p>Version: {integrationFlow.Version}</p>
      {/* <p>Version: {integrationFlow.__metadata.uri}</p> */}

      <Divider />


      {/* <p><a href={integrationFlow.__metadata.uri}>{flow.__metadata.uri}</a></p> */}


    </div>
  )
};

export default IntegrationFlowOverview;
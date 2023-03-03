import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { InspectFlow } from "../../../wailsjs/go/main/App";

import { Avatar, Button, Card, Divider, List, Spin, Timeline, Typography } from "antd";
import TransportIntegrationFlow from "./TransportIntegrationFlow";
import IntegrationFlowOverview from "./IntegrationFlowOverview";
const tabList = [
  {
    key: 'overviewTab',
    tab: 'Overview',
  },
  {
    key: 'transportTab',
    tab: 'Transport',
  },
];



const IntegrationFlowDetails = () => {
  const { integrationFlow } = useParams();
  console.log("IntegrationFlowDetails: ", integrationFlow)
  const [flow, setFlow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabKey1, setActiveTabKey1] = useState('overviewTab');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const contentList = {
    overviewTab: <IntegrationFlowOverview integrationFlow={flow} />,
    transportTab: <TransportIntegrationFlow integrationFlow={flow} />,
  };

  useEffect(() => {
    const getFlow = async () => {
      setIsLoading(true);
      InspectFlow(integrationFlow)
        .then((flow) => {
          console.log("integraion flow:");
          console.log(flow);
          setFlow(flow);
          setIsLoading(false);
        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error,
          });
        });


    };
    getFlow();
  }, []);

  return (
    <>
      <div>In the integraion flow: {integrationFlow}</div>
      <Card
        title={flow.Name}
        bordered={false}
        style={{
          margin: "1%",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        <Spin tip="Loading" spinning={isLoading}>
          {contentList[activeTabKey1]}

        </Spin>
      </Card>
    </>
  )
};

export default IntegrationFlowDetails;
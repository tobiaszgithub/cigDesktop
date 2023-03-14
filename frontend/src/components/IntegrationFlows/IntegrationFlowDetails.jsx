import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { InspectFlow, GetConfigurationFile } from "../../../wailsjs/go/main/App";

import { Avatar, Button, Card, Divider, List, Spin, Timeline, Typography, message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
  console.log("IntegrationFlowDetails: ", integrationFlow)
  const [flow, setFlow] = useState([]);
  const [configuration, setConfiguration] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabKey1, setActiveTabKey1] = useState('overviewTab');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const contentList = {
    overviewTab: <IntegrationFlowOverview integrationFlow={flow} />,
    transportTab: <TransportIntegrationFlow integrationFlow={flow} configuration={configuration} />,
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
          setIsLoading(false);
        });


    };

    const getConfiguration = async () => {
      setIsLoading(true);
      GetConfigurationFile()
        .then((config) => {
          console.log("configuration file:");
          console.log(config);
          setConfiguration(config)

        })
        .catch((error) => {
          messageApi.open({
            type: "error",
            content: error,
          });
          setIsLoading(false);
        });
    }
    getConfiguration();
    getFlow();


  }, []);

  return (
    <>

      <Card
        title={"Flow Name: " + flow.Name}
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
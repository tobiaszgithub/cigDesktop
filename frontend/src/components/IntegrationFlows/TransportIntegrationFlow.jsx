import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, message, Switch,Spin } from "antd";
import { useEffect, useState } from "react";
import { TransportFlow } from "../../../wailsjs/go/main/App";

const TransportIntegrationFlow = ({ integrationFlow }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log("TransportIntegraionFlow: ", integrationFlow)

  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [integrationFlow]);

  const onFinish = async (values) => {
    const { description, isPublic, srcFlowID, destFlowID, destTenantKey, destFlowName, destPackageID } = values;
    setIsLoading(true);
    const transport = {
      srcFlowID,
      destFlowID,
      destTenantKey,
      destFlowName,
      destPackageID,

    };
    console.log("transport: ", transport)

    //func (a *App) TransportFlow(srcFlowID string, 
    //destFlowID string, destTenantKey string, destFlowName string, 
    //destPackageID string)
    // messageApi.open({
    //   type: "error",
    //   content: "test error content",
    // })


    //form.resetFields()
    TransportFlow(transport.srcFlowID, transport.destFlowID, transport.destTenantKey,
      transport.destFlowName, transport.destPackageID)
      .then((response) => {
        messageApi.open({
          type: "success",
          content: `Integrationflow ${transport.srcFlowID} transported successfully. Response: ${response}`,
        });
        setIsLoading(false);
        //navigate("/packages/" + integrationFlow.PackageId);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error,
        });
        setIsLoading(false);
      });
    // CreateNewGist(gist, token)
    //   .then((gist) => {
    //     messageApi.open({
    //       type: "success",
    //       content: `Gist ${gist.id} created successfully`,
    //     });
    //     navigate("/gists/private");
    //   })
    //   .catch((error) => {
    //     messageApi.open({
    //       type: "error",
    //       content: error,
    //     });
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Spin tip="Loading" spinning={isLoading}>
        <Card title="Transport IntegrationFlow">
          <Form
            form={form}
            name="transportFlow"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            initialValues={{
              'srcFlowID': integrationFlow.Id,
              'destFlowID': integrationFlow.Id,
              'destTenantKey': 'cloud-foundry-dev-basic',
              'destFlowName': integrationFlow.Name,
              'destPackageID': integrationFlow.PackageId,
            }}
          >
            <Form.Item label="Source flowID" name="srcFlowID">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Destination flowID" name="destFlowID">
              <Input />
            </Form.Item>
            <Form.Item label="Destination TenantKey" name="destTenantKey">
              <Input />
            </Form.Item>
            <Form.Item label="Destination Flow Name" name="destFlowName">
              <Input />
            </Form.Item>
            <Form.Item label="Destination PackageID" name="destPackageID">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

        </Card>
      </Spin>
    </>
  )

};

export default TransportIntegrationFlow;
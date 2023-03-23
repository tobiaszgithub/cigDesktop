import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, message, Switch, Spin, Select } from "antd";
import { useEffect, useState } from "react";
import { TransportFlow, GetIntegrationPackages, SetTenantKey } from "../../../wailsjs/go/main/App";
import { maxHeight, maxWidth } from "@mui/system";
import { model } from "../../../wailsjs/go/models";
import { BaseOptionType } from "antd/es/select";

type transportProps = {
  integrationFlow: model.IntegrationFlow,
  configuration: {
    activeTenantKey: string
    tenants: { key: string }[]
  }
}

const TransportIntegrationFlow = ({ integrationFlow, configuration }: transportProps) => {
  
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [transportResponse, setTransportResponse] = useState('');
  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();
  console.log("TransportIntegraionFlow: ", integrationFlow)
  const [destTenantKey, setDestTenantKey] = useState('')
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [integrationFlow]);

  const [destPackages, setDestPackages] = useState(Array<model.IntegrationPackage>);

  const getPackages = async () => {

    setIsLoading(true);

    const packages = await GetIntegrationPackages(destTenantKey);

    setDestPackages(packages);

    setIsLoading(false);
    console.log("integraion packages:")
    console.log(packages)
  };

  useEffect(() => {
    if (destTenantKey === '') {
      setDestPackages([])

    } else {
      getPackages();
    }

  }, [destTenantKey]);

  const handleDestTenantChange = (value: string) => {
    setDestTenantKey(value)
    //getPackages()

  }

  const onFinish = async (values: { description: string; isPublic: string; srcFlowID: string; destFlowID: string; destTenantKey: string; destFlowName: string; destPackageID: string; }) => {
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

    TransportFlow(transport.srcFlowID, transport.destFlowID, transport.destTenantKey,
      transport.destFlowName, transport.destPackageID)
      .then((response) => {
        messageApi.open({
          type: "success",
          content: `Integrationflow ${transport.srcFlowID} transported successfully.`,
        });
        setTransportResponse(response);
        setIsLoading(false);
        //navigate("/packages/" + integrationFlow.PackageId);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: `Error during transporting Integration flow ${transport.srcFlowID}`,
        });
        setTransportResponse(error);
        setIsLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
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
            style={{ maxWidth: 600 }}
            layout="vertical"
            size="middle"
            initialValues={{
              'srcFlowID': integrationFlow.Id,
              'destFlowID': integrationFlow.Id,
              'destTenantKey': destTenantKey,
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
              {/* <Input /> */}
              <Select
                options={configuration.tenants.map((tenant) => {
                  return {
                    value: tenant.key,
                    label: tenant.key
                  }
                })}
                onChange={handleDestTenantChange}
              >


              </Select>
            </Form.Item>
            <Form.Item label="Destination Flow Name" name="destFlowName">
              <Input />
            </Form.Item>
            <Form.Item label="Destination PackageID" name="destPackageID">
              <Select
                options={destPackages.map((destPackage) => {
                  return {
                    value: destPackage.Id,
                    label: destPackage.Id,
                  }
                })}
              />
              {/* <Input /> */}
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
        <div>Transport logs:</div>
        <div style={{ whiteSpace: 'pre-wrap' }}>{transportResponse}</div>
    </Spin>
    </>
  )

};

export default TransportIntegrationFlow;
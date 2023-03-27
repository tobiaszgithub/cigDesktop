import React from "react";
import { Form, Button, Input, Divider, Select, Radio, Space, message, Spin } from "antd";
import DynamicField from "./DynamicField"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { GetConfigurationFile, SaveConfigurationFile } from "../../../wailsjs/go/main/App";
import { ConfigurationContext } from "../../App"
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 12 }
  }
};

const SettingsDetails = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  const { configuration, setConfiguration } = useContext(ConfigurationContext)

  const [isLoading, setIsLoading] = useState(true);
  const [configForm, setConfigForForm] = useState({});

  const handleFinish = async (values) => {
    console.log("VALUES", values);

    const { activeTenantKey, fields } = values;
    setIsLoading(true);
    const configFile = {}
    configFile.activeTenantKey = activeTenantKey;
    configFile.tenants = fields.map((field) => {
      return {
        key: field.tenantKey,
        apiURL: field.apiURL,
        authorization: {
          type: field.authorizationType,
          username: field.username,
          password: field.password,
          clientID: field.clientID,
          clientSecret: field.clientSecret,
          tokenURL: field.tokenURL,
        }
      }
    });
    console.log("config File save:", configFile);
    SaveConfigurationFile(configFile)
      .then(() => {
        messageApi.open({
          type: "success",
          content: `Configuration Saved.`,
        });
        setConfiguration(configFile)

        setIsLoading(false);
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error,
        });
        setIsLoading(false);
      });

  }


  useEffect(() => {
    const getConfiguration = async () => {

      setIsLoading(true);

      const configForm = {}
      configForm.activeTenantKey = configuration.activeTenantKey
      configForm.fields = configuration.tenants.map((tenant) => {
        return {
          tenantKey: tenant.key,
          apiURL: tenant.apiURL,
          authorizationType: tenant.authorization.type,
          username: tenant.authorization.username,
          password: tenant.authorization.password,
          clientID: tenant.authorization.clientID,
          clientSecret: tenant.authorization.clientSecret,
          tokenURL: tenant.authorization.tokenURL,

        }
      })

      console.log("new configuration:");
      console.log(configForm);
      setConfigForForm(configForm);

      setIsLoading(false);
    };
    getConfiguration();
  }, [configuration])

  useEffect(() => form.resetFields(), [configForm]);

  return (
    <>
      {contextHolder}
      <Spin tip="Loading" spinning={isLoading}>
        <div>CIG Desktop Settings</div>
        <Form
          layout="horizontal"
          form={form}
          {...defaultFormItemLayout}
          onFinish={handleFinish}
          initialValues={configForm}
        >

          <Form.Item style={{ display: 'none' }}
            name="activeTenantKey"
            label="Active Tenant Key"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Divider dashed>Tenants</Divider>
          {/* <DynamicField /> */}



          <Form.List
            name="fields"

          >
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Divider>Tenant {name + 1}</Divider>
                      <Form.Item
                        {...restField}
                        name={[name, "tenantKey"]}
                        label="tenantKey"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="field tenantKey" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "apiURL"]}
                        label="apiURL"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="field apiURL" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "authorizationType"]}
                        label="authorizationType"
                        rules={[{ required: true }]}
                      >

                        <Radio.Group>
                          <Radio value={"basic"}>
                            basic
                          </Radio>
                          <Radio value={"oauth"}>
                            oauth
                          </Radio>
                        </Radio.Group>

                      </Form.Item>


                      <Form.Item
                        {...restField}
                        name={[name, "username"]}
                        label="username"
                        rules={[{ required: false }]}
                      >
                        <Input placeholder="Username" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "password"]}
                        label="password"
                        rules={[{ required: false }]}
                      >
                        <Input.Password placeholder="password" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "clientID"]}
                        label="clientID"
                        rules={[{ required: false }]}
                      >
                        <Input placeholder="clientID" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "clientSecret"]}
                        label="clientSecret"
                        rules={[{ required: false }]}
                      >
                        <Input.Password placeholder="clientSecret" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "tokenURL"]}
                        label="tokenURL"
                        rules={[{ required: false }]}
                      >
                        <Input placeholder="tokenURL" />
                      </Form.Item>




                      {/* 
                <Form.Item {...restField} name={[name, "options"]} label="Options">
                  <Input placeholder="option 1, option 2, option 3" />
                </Form.Item> */}
                      {fields.length > 1 ? (
                        <Button
                          type="danger"
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                        >
                          Remove Above Field
                        </Button>
                      ) : null}
                    </div>
                  ))}
                  <Divider />
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "50%" }}
                    >
                      <PlusOutlined /> Add Tenant
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>






          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}

export default SettingsDetails
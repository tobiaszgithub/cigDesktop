import React from "react";
import { Form, Button, Input, Divider, Select } from "antd";
import DynamicField from "./DynamicField"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 12 }
  }
};


const initialValue2 = {
  activeTenantKey: "cloud-foundry-dev-basic",
  fields: [

    {
      tenantKey: 'hic-neo-dev',
      apiURL: "https://p700122-tmn.hci.eu2.hana.ondemand.com/api/v1",
      authorizationType: 'basic'
    },
    {
      tenantKey: 'cloud-foundry-dev-basic',
      apiURL: "https://1faaaaectrial.it-cpitrial03.cfapps.ap21.hana.ondemand.com/api/v1",
      authorizationType: 'basic'

    },


  ]
}
const SettingsDetails = () => {
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), []);
  function handleFinish(values) {
    console.log("VALUES", values);
    alert("Check console for values");
  }

  return (
    <>
      <div>CIG Desktop Settings</div>
      <Form
        form={form}
        {...defaultFormItemLayout}
        onFinish={handleFinish}
        initialValues={initialValue2}
      >

        <Form.Item
          name="activeTenantKey"
          label="Active Tenant Key"
          rules={[{ required: true }]}
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
                      <Select>
                        <Select.Option value="basic">basic</Select.Option>
                        <Select.Option value="oauth">oauth</Select.Option>

                      </Select>
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
                    style={{ width: "60%" }}
                  >
                    <PlusOutlined /> Add Tenant
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>






        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SettingsDetails
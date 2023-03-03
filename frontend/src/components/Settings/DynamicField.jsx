import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

const initialValue1 = [

  {
    tenantKey: 'test1',
    apiURL: 'api.com',
    authorizationType: 'basic'
  },
  {
    tenantKey: 'test2',
    apiURL: 'api.com',
    authorizationType: 'basic'

  },


]

const DynamicField = (props) => {



  return (
    <Form.List
      name="fields"
      initialValues={initialValue1}
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
  );
}

export default DynamicField;

import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewUnit = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create Unit
      </Button>
      <Modal
        title="Create Unit"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Please select a unit" }]}
          >
            <Select placeholder="Choose a unit">
              <Option value="1">Unit 1</Option>
              <Option value="2">Unit 2</Option>
              <Option value="3">Unit 3</Option>
              <Option value="4">Unit 4</Option>
              <Option value="5">Unit 5</Option>
              <Option value="6">Unit 6</Option>
              <Option value="7">Unit 7</Option>
              <Option value="8">Unit 8</Option>
              <Option value="9">Unit 9</Option>
              <Option value="10">Unit 10</Option>
              <Option value="11">Unit 11</Option>
              <Option value="12">Unit 12</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Unit Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewUnit;

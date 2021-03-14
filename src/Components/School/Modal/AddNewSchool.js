import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewSchool = () => {
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
        Create New School
      </Button>
      <Modal
        title="Create New School"
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
            name="type"
            label="Educational level"
            rules={[
              {
                required: true,
                message: "Please select a level",
              },
            ]}
          >
            <Select placeholder="Select a level">
              <Option value="PRIMARY">Primary School</Option>
              <Option value="JUNIOR">Junior High School</Option>
              <Option value="HIGH">High School</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="school"
            label="School Name"
            rules={[{ required: true, message: "Please input a school" }]}
          >
            <Input placeholder="School Name" />
          </Form.Item>
          {/* <Form.Item
            name="distrisct"
            label="Distrisct"
            rules={[{ required: true, message: "Please choose a distrisct" }]}
          >
            <Select placeholder="Select a level">
              <Option value="PRIMARY">Primary School</Option>
              <Option value="JUNIOR">Junior High School</Option>
              <Option value="HIGH">High School</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewSchool;

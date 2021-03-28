import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditProgressTest = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      progressTest: props.data.title,
      description: props.data.description,
    });
  }, []);

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
      <Tooltip title="Edit">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Edit Progress Test"
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
            name="progressTest"
            label="Progress Test Name"
            rules={[{ max: 20, message: "Can only input 21 characters" }]}
          >
            <Input placeholder="Progress Test Name" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 50, message: "Can only input 50 characters" }]}
          >
            <Input.TextArea
              placeholder="Progress Test Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
          <Form.Item name="unitAfter" label="Unit After">
            <Select placeholder="Place Progress Test after this Unit">
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
        </Form>
      </Modal>
    </div>
  );
};

export default EditProgressTest;

import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

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
      <Button type="primary" size="large" onClick={showModal}>
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
        <Form form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewSchool;

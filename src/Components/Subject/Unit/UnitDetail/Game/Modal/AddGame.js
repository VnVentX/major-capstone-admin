import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddGame = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (event) => {
    console.log(event);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" size="middle" onClick={showModal}>
        Add Game
      </Button>
      <Modal
        title="Add new Game"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        okText="Submit"
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
            name="name"
            label="Game name"
            rules={[{ required: true, message: "Please input game name!" }]}
          >
            <Input placeholder="Exercise Name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              showCount
              maxLength={500}
              placeholder="Unit Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddGame;

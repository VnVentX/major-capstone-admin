import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewLesson = () => {
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
    let frame = event.url;
    const url = frame.split(" ")[1].split("src=")[1].split('"')[1];
    console.log(url, event);
  };

  return (
    <div>
      <Button
        type="primary"
        size="middle"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        New Lesson
      </Button>
      <Modal
        title="Create New Lesson"
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
            name="subject"
            label="Lesson Name"
            rules={[{ required: true, message: "Please input a subject name" }]}
          >
            <Input placeholder="Lesson Name" />
          </Form.Item>
          <Form.Item
            name="url"
            label="PowerPoint URL"
            rules={[{ required: true, message: "Please input an URL!" }]}
          >
            <Input placeholder="PowerPoint URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewLesson;

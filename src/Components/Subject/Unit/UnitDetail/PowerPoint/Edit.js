import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Edit = () => {
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
    console.log(url);
  };

  const success = () => {
    message.success({
      content: "Update PowerPoint successfully!",
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Edit PowerPoint
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
              handleCancel();
              success();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="url"
            label="PowerPoint URL"
            rules={[
              { required: true, message: "Please input an URL!" },
              //   { type: "url", message: "Please input a valid URL!" },
            ]}
          >
            <Input placeholder="PowerPoint URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;

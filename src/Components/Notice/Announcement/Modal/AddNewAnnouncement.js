import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-build-classic";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddNewAnnouncement = (props) => {
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
    async function createNews() {
      await axios
        .post("https://mathscienceeducation.herokuapp.com/news", {
          accountId: 1,
          newsContent: event.content,
          newsTitle: event.title,
          shortDescription: event.shortDes,
        })
        .then((res) => {
          props.getAllNews();
        })
        .catch((e) => {
          console.log(e);
        });
    }
    createNews();
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Create News
      </Button>
      <Modal
        title="Create News"
        width={1000}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="shortDes"
            label="Short Description"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input.TextArea
              placeholder="Short Description"
              maxLength="40"
              showCount
            />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              const data = editor.getData();
              return data;
            }}
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <CKEditor editor={CustomEditor} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewAnnouncement;

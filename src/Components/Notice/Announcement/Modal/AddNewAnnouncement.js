import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message } from "antd";
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
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    setLoading(true);
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
          form.resetFields();
          setLoading(false);
          handleCancel();
          message.success("Create News successfully!");
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          message.error("Fail to create News!");
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
        okText="Create"
        confirmLoading={loading}
        onCancel={handleCancel}
        destroyOnClose
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
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
            rules={[
              { required: true, message: "Please input a title" },
              { max: 251, message: "Can only input 250 characters" },
            ]}
          >
            <Input placeholder="Title" maxLength={250} />
          </Form.Item>
          <Form.Item
            name="shortDes"
            label="Short Description"
            rules={[
              { required: true, message: "Please input a title" },
              { max: 51, message: "Can only input 51 characters" },
            ]}
          >
            <Input.TextArea
              placeholder="Short Description"
              maxLength="50"
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

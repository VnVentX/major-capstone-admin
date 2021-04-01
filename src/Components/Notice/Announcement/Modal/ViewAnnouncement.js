import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-build-classic";
import { EyeOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ViewAnnouncement = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getNewsDetail(props.id);
  }, []);

  const getNewsDetail = async (id) => {
    await axios
      .get(`https://mathscienceeducation.herokuapp.com/news/${id}`)
      .then((res) => {
        form.setFieldsValue({
          title: res.data.newsTitle,
          shortDes: res.data.shortDescription,
          content: res.data.newsContent,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
      <Button type="primary" icon={<EyeOutlined />} onClick={showModal}>
        View
      </Button>
      <Modal
        title="View News"
        width={1000}
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <Form {...layout} form={form}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Title" disabled />
          </Form.Item>
          <Form.Item name="shortDes" label="Short Description">
            <Input.TextArea placeholder="Short Description" disabled />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              const data = editor.getData();
              return data;
            }}
          >
            <CKEditor editor={CustomEditor} disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewAnnouncement;

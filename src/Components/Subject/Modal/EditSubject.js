import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, message, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditSubject = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      subject: props.data.title,
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

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
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
        title="Edit Subject"
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
            label="Subject Name"
            rules={[{ max: 20, message: "Can only input 20 characters" }]}
          >
            <Input placeholder="Subject Name" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="subjectImg"
            label="Subject Image"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="text"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setFileList([]);
                } else {
                  handleChange(info);
                }
              }}
            >
              {fileList.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 50, message: "Can only input 50 characters" }]}
          >
            <Input.TextArea
              placeholder="Subject Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditSubject;

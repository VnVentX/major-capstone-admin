import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

const AddNewSubject = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

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
    setLoading(true);
    let formData = new FormData();
    if (event.description) {
      formData.append(
        "description",
        event.description?.replace(/\s+/g, " ").trim()
      );
    }
    formData.append("gradeId", props.gradeID);
    formData.append("subjectName", event.subject?.replace(/\s+/g, " ").trim());
    formData.append("multipartFile", event.subjectImg[0].originFileObj);
    async function createSubject() {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/subject`, formData)
        .then((res) => {
          console.log(res);
          props.getSubjectByGrade(props.gradeID);
          props.getAllSubject();
          setLoading(false);
          handleCancel();
          message.success("Create Subject successfully");
          form.resetFields();
          setFileList([]);
        })
        .catch((e) => {
          if (e.response.data === "EXISTED") {
            message.error("This Subject name is already existed");
          } else {
            message.error("Fail to create Subject");
          }
          setLoading(false);
        });
    }
    createSubject();
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create Subject
      </Button>
      <Modal
        title="Create Subject"
        visible={visible}
        onCancel={() => {
          handleCancel();
          form.resetFields();
          setFileList([]);
        }}
        okText="Create"
        confirmLoading={loading}
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
            name="subject"
            label="Subject Name"
            rules={[
              { required: true, message: "Please input a subject name" },
              { max: 20, message: "Can only input 20 characters!" },
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
              },
            ]}
          >
            <Input placeholder="Subject Name" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="subjectImg"
            label="Subject Image"
            getValueFromEvent={normFile}
            rules={[
              { required: true, message: "Please select an image to upload" },
            ]}
          >
            <Upload
              listType="picture"
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
            rules={[
              { max: 50, message: "Can only input 50 characters!" },
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
              },
            ]}
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

export default AddNewSubject;

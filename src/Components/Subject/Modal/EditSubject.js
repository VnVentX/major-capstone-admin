import React, { useState } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const getSubjectByGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${props.subjectID}`)
      .then((res) => {
        form.setFieldsValue({
          subject: res.data.subjectName,
          description: res.data.description,
        });
        setFileList([
          {
            thumbUrl: res.data.imageUrl,
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    setVisible(true);
    getSubjectByGrade();
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
    if (event.subjectImg !== undefined && event.subjectImg.length !== 0) {
      formData.append("multipartFile", event.subjectImg[0].originFileObj);
    }
    formData.append("id", props.data.id);
    async function editSubject() {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/subject/${props.data.id}`,
          formData
        )
        .then((res) => {
          console.log(res);
          props.getSubjectByGrade(props.gradeID);
          props.getAllSubject();
          setLoading(false);
          handleCancel();
          message.success("Edit Subject successfully!");
          form.resetFields();
          setFileList([]);
        })
        .catch((e) => {
          if (e.response.data === "EXISTED") {
            message.error("This Subject name is already existed");
          } else {
            message.error("Fail to edit Subject");
          }
          setLoading(false);
        });
    }
    editSubject();
  };

  return (
    <div>
      <Tooltip title="Edit">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Edit Subject"
        visible={visible}
        onCancel={() => {
          handleCancel();
          form.resetFields();
          setFileList([]);
        }}
        okText="Update"
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
              { max: 20, message: "Can only input 20 characters" },
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
          >
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onRemove={() => {
                setFileList([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setFileList([]);
                  } else {
                    handleChange(info);
                  }
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
              { max: 50, message: "Can only input 50 characters" },
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

export default EditSubject;

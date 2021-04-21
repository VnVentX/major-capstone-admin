import React, { useState } from "react";
import axios from "axios";
import { getJwt, getID } from "../../../../helper/jwt";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const AddNewBanner = (props) => {
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
    console.log(fileList);
    setFileList(fileList);
  };

  const onFinish = (event) => {
    setLoading(true);
    let formData = new FormData();
    if (event.description) {
      formData.append("description", event.description.trim());
    }
    formData.append("file", event.bannerImg[0].originFileObj);
    formData.append("accountId", getID());
    async function createBanner() {
      await axios
        .post(
          "https://mathscienceeducation.herokuapp.com/bannerImage",
          formData
        )
        .then((res) => {
          console.log(res);
          props.getAllBanner();
          setLoading(false);
          handleCancel();
          form.resetFields();
          setFileList([]);
          message.success("Create Banner successfully!");
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          message.error("Fail to create banner!");
        });
    }
    createBanner();
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Create Banner
      </Button>
      <Modal
        title="Create Banner"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        confirmLoading={loading}
        okText="Create"
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
        <Form {...layout} form={form} name="nest-messages">
          <Form.Item
            name="bannerImg"
            label="Banner Image"
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
            rules={[{ max: 50, message: "Can only input 100 characters" }]}
          >
            <Input.TextArea
              showCount
              maxLength={50}
              placeholder="Unit Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewBanner;

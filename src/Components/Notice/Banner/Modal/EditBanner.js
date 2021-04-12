import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";

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

const EditBanner = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([
    {
      thumbUrl: props.data.imageUrl,
    },
  ]);

  useEffect(() => {
    form.setFieldsValue({
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
    setLoading(true);
    let formData = new FormData();
    if (event.bannerImg !== undefined && event.bannerImg.length !== 0) {
      formData.append("file", event.bannerImg[0].originFileObj);
    }
    formData.append("description", event.description.trim());
    formData.append("id", props.data.id);
    async function editBanner() {
      await axios
        .put(
          `https://mathscienceeducation.herokuapp.com/bannerImage/${props.data.id}`,
          formData
        )
        .then((res) => {
          console.log(res);
          props.getAllBanner();
          setLoading(false);
          message.success("Edit Banner successfully!");
          handleCancel();
          setFileList([]);
          form.resetFields();
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          message.error("Fail to edit Banner!");
        });
    }
    editBanner();
  };

  return (
    <div>
      <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Banner"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        okText="Update"
        confirmLoading={loading}
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
                <Button icon={<UploadOutlined />}>Upload New Image</Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input description" },
              { max: 50, message: "Can only input 100 characters" },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={50}
              placeholder="Banner Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditBanner;

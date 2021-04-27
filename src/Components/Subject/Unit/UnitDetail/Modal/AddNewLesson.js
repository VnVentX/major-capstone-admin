import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Tooltip,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewLesson = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const createLesson = async (values) => {
    let url = "";
    if (values.url.split("/")[0] === "https:") {
      url = values.url;
    } else {
      url = values.url.split(" ")[1].split("src=")[1].split('"')[1];
    }
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/lesson`, {
        lessonName: values.lesson,
        lessonUrl: url,
        unitId: window.location.pathname.split("/")[4],
      })
      .then((res) => {
        console.log(res);
        props.getLessonByUnitID();
        setLoading(false);
        handleCancel();
        message.success("Add Lesson successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Lesson name is already existed");
        } else {
          message.error("Fail to create Lesson");
        }
        setLoading(false);
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    createLesson(values);
  };

  return (
    <div>
      <Tooltip title="Add Lesson">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Add Lesson"
        visible={visible}
        okText="Add"
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
            name="lesson"
            label="Lesson Name"
            rules={[
              { required: true, message: "Please input a lesson name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber
              placeholder="Lesson"
              min={1}
              max={100}
              parser={(value) => {
                return value.substring(0, 3);
              }}
            />
          </Form.Item>
          <Form.Item
            name="url"
            label="PowerPoint URL"
            rules={[
              {
                validator: async (_, url) => {
                  if (
                    url.split("/")[0] !== "https:" &&
                    url.split(" ")[0] !== "<iframe"
                  ) {
                    return Promise.reject(
                      new Error("Please input a valid URL!")
                    );
                  }
                },
              },
            ]}
          >
            <Input.TextArea autoSize placeholder="PowerPoint URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewLesson;

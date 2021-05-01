import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../../helper/jwt";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const AddProgress = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const createExercise = async (values) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/exercise`,
        {
          description: values.description?.replace(/\s+/g, " ").trim(),
          exerciseName: values.name,
          progressTest: true,
          progressTestId: window.location.pathname.split("/")[4],
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.getProgressTestByID();
        props.getAllExercise();
        setLoading(false);
        handleCancel();
        message.success("Create Test successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Exercise name is already existed");
        } else {
          message.error("Fail to create Exercise");
        }
        setLoading(false);
      });
  };
  const onFinish = (values) => {
    createExercise(values);
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
      <Button
        type="primary"
        size="middle"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Add Exercise
      </Button>
      <Modal
        title="Add Exercise"
        visible={visible}
        confirmLoading={loading}
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        destroyOnClose
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
        <Form {...layout} form={form}>
          <Form.Item
            name="name"
            label="Exercise"
            rules={[
              { required: true, message: "Please input exercise name" },
              {
                pattern: /^\d+$/,
                message: "Please input a number",
              },
            ]}
          >
            <InputNumber
              placeholder="Exercise"
              min={1}
              max={100}
              parser={(value) => {
                return value.substring(0, 3);
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={50}
              placeholder="Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProgress;

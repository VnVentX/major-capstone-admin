import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      .post("https://mathscienceeducation.herokuapp.com/exercise", {
        description: values.description,
        exerciseName: values.name,
        progressTestId: window.location.pathname.split("/")[4],
      })
      .then((res) => {
        console.log(res);
        props.getProgressTestByID();
        setLoading(false);
        handleCancel();
        message.success("Create Test successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to create Test");
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
        Add Test
      </Button>
      <Modal
        title="Add Test"
        visible={visible}
        confirmLoading={loading}
        onCancel={handleCancel}
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
            label="Test name"
            rules={[
              { required: true, message: "Please input exercise name!" },
              { max: 20, message: "Can only input 20 characters" },
            ]}
          >
            <Input placeholder="Test Name" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 50, message: "Can only input 50 characters" }]}
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

export default AddProgress;

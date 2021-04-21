import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddGame = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const createExercise = async (values) => {
    setLoading(true);
    console.log(values, props.lessonID);
    await axios
      .post("https://mathscienceeducation.herokuapp.com/game", {
        description: values.description,
        lessonId: props.lessonID,
        gameName: values.name,
      })
      .then((res) => {
        console.log(res);
        props.getGameByLessonID();
        setLoading(false);
        handleCancel();
        message.success("Create Game successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to create Game");
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
        Add Game
      </Button>
      <Modal
        title="Add Game"
        visible={visible}
        okText="Create"
        onCancel={handleCancel}
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
            name="name"
            label="Game name"
            rules={[
              { required: true, message: "Please input a game name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber placeholder="Game" min={1} max={100} />
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

export default AddGame;

import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../../../helper/jwt";

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
      .post(
        `${process.env.REACT_APP_BASE_URL}/game`,
        {
          description: values.description?.replace(/\s+/g, " ").trim(),
          lessonId: props.lessonID,
          gameName: values.name,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.getGameByLessonID();
        props.getAllGame();
        setLoading(false);
        handleCancel();
        message.success("Create Game successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Game name is already existed");
        } else {
          message.error("Fail to create Game");
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
              {
                pattern: /^\d+$/,
                message: "Please input a number",
              },
            ]}
          >
            <InputNumber
              placeholder="Game"
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
              placeholder="Unit Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddGame;

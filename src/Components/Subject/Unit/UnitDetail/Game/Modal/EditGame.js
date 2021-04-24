import React, { useState, useEffect } from "react";
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
import { EditOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditGame = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: props.data.gameName,
      description: props.data.description,
    });
  }, [form, props.data.description, props.data.gameName]);

  const editGame = async (values) => {
    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/game/${props.data.id}`, {
        gameName: values.name,
        lessonId: props.lessonID,
        description: values.description?.replace(/\s+/g, " "),
      })
      .then((res) => {
        console.log(res);
        props.getGameByLessonID();
        setLoading(false);
        handleCancel();
        message.success("Edit Game successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Game name is already existed");
        } else {
          message.error("Fail to edit Game");
        }
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    editGame(values);
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
      <Tooltip title="Edit">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Edit Game"
        visible={visible}
        okText="Update"
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

export default EditGame;

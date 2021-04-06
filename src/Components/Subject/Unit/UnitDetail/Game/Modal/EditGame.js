import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Tooltip, message } from "antd";
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
      .put(`https://mathscienceeducation.herokuapp.com/game/${props.data.id}`, {
        gameName: values.name,
        lessonId: props.lessonID,
        description: values.description,
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
        console.log(e);
        message.error("Fail to edit Game");
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
            rules={[{ max: 20, message: "Can only input 20 characters" }]}
          >
            <Input placeholder="Exercise Name" maxLength={21} />
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

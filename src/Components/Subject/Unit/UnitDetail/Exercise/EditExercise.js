import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditExercise = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: props.data.exerciseName,
      description: props.data.description,
    });
  }, []);

  const editExercise = async (values) => {
    setLoading(true);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/exercise/${props.data.id}`,
        {
          description: values.description,
          exerciseName: values.name,
          lessonId: props.data.lessonId,
          id: props.data.id,
        }
      )
      .then((res) => {
        console.log(res);
        props.getExerciseByLessonID();
        setLoading(false);
        handleCancel();
        message.success("Edit Exercise successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to edit Exercise");
        setLoading(false);
      });
  };

  const onFinish = (values) => {
    editExercise(values);
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
        title="Edit Exercise"
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
            label="Exercise name"
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

export default EditExercise;

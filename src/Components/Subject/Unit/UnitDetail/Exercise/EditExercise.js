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

const EditExercise = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: parseInt(props.data.exerciseName),
      description: props.data.description,
    });
  }, [form, props.data.description, props.data.exerciseName]);

  const editExercise = async (values) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/exercise/${props.data.id}`,
        {
          description: values.description.replace(/\s+/g, " "),
          exerciseName: values.name,
          lessonId: props.lessonID,
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
        if (e.response.data === "EXISTED") {
          message.error("This Exercise name is already existed");
        } else {
          message.error("Fail to edit Exercise");
        }
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
            rules={[
              { required: true, message: "Please input a exercise name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber placeholder="Exercise" min={1} max={100} />
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

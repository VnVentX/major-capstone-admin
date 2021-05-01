import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Tooltip,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../../helper/jwt";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditProgress = (props) => {
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
          description: values.description?.replace(/\s+/g, " ").trim(),
          exerciseName: values.name,
          progressTestId: window.location.pathname.split("/")[4],
          progressTest: true,
          id: props.data.id,
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
        message.success("Edit Test successfully!");
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
        onCancel={handleCancel}
        destroyOnClose
        confirmLoading={loading}
        okText="Update"
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
              placeholder="Exercise name"
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

export default EditProgress;

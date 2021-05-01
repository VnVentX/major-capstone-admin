import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditClass = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      className: props.data.className,
    });
  }, [form, props.data.className]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    async function updateClass() {
      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/class/${props.data.id}`, {
          className: values.className?.replace(/\s+/g, " ").trim(),
        })
        .then((res) => {
          console.log(res);
          props.getClassBySchoolGrade(props.gradeID);
          setLoading(false);
          handleCancel();
          message.success("Update Class successfully");
          form.resetFields();
        })
        .catch((e) => {
          if (e.response?.data === "EXISTED") {
            message.error("This Class name is already existed");
          } else if (e.response?.data === "Input can not blank!") {
            message.error("Input can not be blank");
          } else {
            message.error("Fail to update Class");
          }
          setLoading(false);
        });
    }
    updateClass();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
        Edit
      </Button>
      <Modal
        title="Edit Class"
        visible={visible}
        okText="Update"
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
            name="className"
            label="Class Name"
            rules={[
              {
                validator: async (_, className) => {
                  if (className.toLowerCase() === "pending") {
                    return Promise.reject(
                      new Error("Class name can not be 'Pending'")
                    );
                  }
                },
              },
              { required: true, message: "Please input a class name" },
              { max: 20, message: "Can only input 20 characters" },
              {
                pattern: /^[^-\s][\w\s-]+$/,
                message: "Can only input letters",
              },
            ]}
          >
            <Input placeholder="Class Name" maxLength={21} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditClass;

import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewClass = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log(values.className?.replace(/\s+/g, " ").trim());
    async function createClass() {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/class`, {
          className: values.className?.replace(/\s+/g, " ").trim(),
          gradeId: props.gradeID,
          schoolId: window.location.pathname.split("/")[2],
        })
        .then((res) => {
          console.log(res);
          props.getClassBySchoolGrade();
          setLoading(false);
          handleCancel();
          message.success("Create Class successfully");
          form.resetFields();
        })
        .catch((e) => {
          if (e.response.data === "EXISTED") {
            message.error("This Class name is already existed");
          } else if (e.response.data === "Input can not blank!") {
            message.error("Input can not be blank");
          } else {
            message.error("Fail to create Class");
          }
          setLoading(false);
        });
    }
    createClass();
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create Class
      </Button>
      <Modal
        title="Create Class"
        visible={visible}
        okText="Create"
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
              { max: 20, message: "Can only input 20 characters!" },
            ]}
          >
            <Input placeholder="Class Name" maxLength={21} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewClass;

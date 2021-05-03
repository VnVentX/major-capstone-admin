import React, { useState } from "react";
import axios from "axios";
import { reunicode } from "../../../helper/regex";
import { Modal, Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getJwt } from "../../../helper/jwt";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CreateStaff = (props) => {
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
    createStaff(values);
  };

  const createStaff = async (values) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/account/create`,
        {
          fullName: values.fullName,
          password: values.password,
          username: values.username,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "CANNOT CREATE!") {
          message.error("Can not create staff right now. Please check again!");
          setLoading(false);
        } else {
          props.getAllStaff();
          setLoading(false);
          handleCancel();
          form.resetFields();
          message.success("Create Staff successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "EXISTED") {
          message.error("This staff has already existed!");
        } else {
          message.error("Fail to create Staff!");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginLeft: 5, marginBottom: 10 }}
      >
        Create Staff
      </Button>
      <Modal
        title="Create Staff"
        visible={visible}
        confirmLoading={loading}
        okText="Create"
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
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
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input staff's Name",
              },
              { max: 50, message: "Can only input 50 characters" },
              {
                pattern: reunicode,
                message: "Can only input letters",
              },
            ]}
          >
            <Input maxLength={51} placeholder="Staff's Name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input a username",
              },
              { max: 21, message: "Can only input 20 characters" },
            ]}
          >
            <Input maxLength={50} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { max: 50, message: "Can only input 50 characters" },
              { required: true, message: "Please input password" },
            ]}
          >
            <Input type="password" maxLength={51} placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateStaff;

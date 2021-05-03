import React, { useState } from "react";
import axios from "axios";
import { reunicode } from "../../../helper/regex";
import { Modal, Button, Form, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getJwt } from "../../../helper/jwt";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditStaff = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStaffDetail = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/account/${props.id}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        console.log(res);
        form.setFieldsValue({
          fullName: res.data.fullName,
          username: res.data.username,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    getStaffDetail();
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    editStaff(values);
  };

  const editStaff = async (values) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/account/${props.id}`,
        {
          fullName: values.fullName,
          password: values.password,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.getAllStaff();
        setLoading(false);
        handleCancel();
        form.resetFields();
        message.success("Edit Staff successfully!");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "EXISTED") {
          message.error("This staff has already existed!");
        } else {
          message.error("Fail to edit Staff!");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Staff"
        visible={visible}
        confirmLoading={loading}
        okText="Update"
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
          <Form.Item name="username" label="Username">
            <Input placeholder="Username" disabled />
          </Form.Item>
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { max: 30, message: "Can only input 30 characters" },
              { required: true, message: "Please input password" },
              {
                min: 6,
                message: "Password length must have 6 characters or more",
              },
            ]}
          >
            <Input type="password" maxLength={31} placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStaff;

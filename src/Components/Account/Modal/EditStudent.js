import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditStudent = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    console.log(event);
  };

  return (
    <div>
      <Button type="primary" size="middle" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Student"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form {...layout}>
          <Form.Item
            name="firstName"
            label="First Name"
            initialValue={props.data.firstName}
            rules={[
              {
                required: true,
                message: "Please input First Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            initialValue={props.data.lastName}
            rules={[{ required: true, message: "Please input Last Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="DoB"
            initialValue={props.data.age}
            rules={[{ required: true, message: "Please choose DoB" }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            initialValue={props.data.gender}
            rules={[{ required: true, message: "Please choose a Gender" }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStudent;

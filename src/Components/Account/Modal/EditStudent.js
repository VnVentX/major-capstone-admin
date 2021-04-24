import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditStudent = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const getStudentDetail = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/student/${props.data.id}`)
      .then((res) => {
        form.setFieldsValue({
          name: res.data.fullName,
          age: moment(res.data.doB, "DD/MM/YYYY"),
          gender: res.data.gender,
          parentName: res.data.parentName,
          contact: res.data.contact,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateStundent = async (values) => {
    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/student/${props.data.id}`, {
        doB: values.age.format("DD/MM/YYYY"),
        fullName: values.name?.replace(/\s+/g, " "),
        gender: values.gender,
        parentName: values.parentName?.replace(/\s+/g, " "),
        contact: values.contact?.replace(/\s+/g, " "),
      })
      .then((res) => {
        console.log(res);
        props.handleSearch(props.searchData);
        setLoading(false);
        handleCancel();
        message.success("Update Student successfully");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        handleCancel();
        message.error("Fail to update Student");
      });
  };

  const showModal = () => {
    getStudentDetail();
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    updateStundent(values);
  };

  return (
    <div>
      <Button
        type="primary"
        size="middle"
        onClick={showModal}
        icon={<EditOutlined />}
      >
        Edit
      </Button>
      <Modal
        title="Edit Student"
        visible={visible}
        onCancel={handleCancel}
        okText="Update"
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
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input student's Name",
              },
              { max: 50, message: "Can only input 50 characters" },
            ]}
          >
            <Input maxLength={51} placeholder="Student's Name" />
          </Form.Item>
          <Form.Item
            name="age"
            label="DoB"
            rules={[{ required: true, message: "Please choose DoB" }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please choose a Gender" }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parentName"
            label="Parent Name"
            rules={[
              { max: 50, message: "Can only input 50 characters" },
              { required: true, message: "Please input parent name" },
            ]}
          >
            <Input maxLength={51} />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: "Please input contact" }]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStudent;

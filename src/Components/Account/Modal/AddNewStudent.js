import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { reunicode } from "../../../helper/regex";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Spin,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewStudent = (props) => {
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
    createStudent(values);
  };

  const createStudent = async (values) => {
    let searchData = {
      school: props.searchData?.school,
      grade: props.searchData?.grade,
      class: props.searchData?.class,
    };
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/student`, {
        classesId: props.searchData?.class,
        doB: values.age.format("DD/MM/YYYY"),
        fullName: values.name?.replace(/\s+/g, " ").trim(),
        gender: values.gender,
        parentName: values.parentName?.replace(/\s+/g, " ").trim(),
        contact: values.contact?.replace(/\s+/g, " ").trim(),
      })
      .then((res) => {
        console.log(res);
        if (res.data === "CANNOT CREATE!") {
          message.error(
            "This class is currently disabled. Please check again!"
          );
          setLoading(false);
        } else {
          props.handleSearch(searchData);
          setLoading(false);
          handleCancel();
          form.resetFields();
          message.success("Create Student successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "EXISTED") {
          message.error("This student has already existed!");
        } else {
          message.error("Fail to create Student!");
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
        style={{ marginLeft: 5 }}
      >
        Create Student
      </Button>
      <Modal
        title="Create Student"
        visible={visible}
        confirmLoading={loading}
        okText="Create"
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
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input student's Name",
              },
              { max: 50, message: "Can only input 50 characters" },
              {
                pattern: reunicode,
                message: "Can only input letters",
              },
            ]}
          >
            <Input maxLength={51} placeholder="Student's Name" />
          </Form.Item>
          <Form.Item
            name="age"
            label="DoB"
            rules={[{ required: true, message: "Please choose DoB" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              inputReadOnly={true}
              disabledDate={(current) => {
                return current && current > moment().endOf("day");
              }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please choose a Gender" }]}
          >
            <Select placeholder="Gender">
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
              {
                pattern: reunicode,
                message: "Can only input letters",
              },
            ]}
          >
            <Input maxLength={51} placeholder="Parent Name" />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[
              {
                required: true,
                message: "Please input a concat (Phone or Email)",
              },
              { max: 51, message: "Can only input 100 characters" },
            ]}
          >
            <Input maxLength={50} placeholder="Contact (Phone / Email)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewStudent;

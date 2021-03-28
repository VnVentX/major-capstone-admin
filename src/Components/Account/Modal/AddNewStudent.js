import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewStudent = (props) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      school: props.searchData.school,
      grade: props.searchData.grade,
      class: props.searchData.class,
    });
  });

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
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Add Student
      </Button>
      <Modal
        title="Add Student"
        visible={visible}
        onCancel={() => {
          handleCancel();
        }}
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
        <Form {...layout} form={form}>
          <Form.Item
            name="school"
            label="Select School"
            rules={[{ required: true, message: "Please choose a School" }]}
          >
            <Select placeholder="Select School">
              <Option value="1">Trường Tiểu Học Dương Minh Châu</Option>
              <Option value="2">Trường Tiểu Học Nguyễn Chí Thanh</Option>
              <Option value="3">Trường Tiểu Học Nguyễn Văn Tố</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="grade"
            label="Select Grade"
            rules={[{ required: true, message: "Please choose a Grade" }]}
          >
            <Select placeholder="Select Grade">
              <Option value="1">Grade 1</Option>
              <Option value="2">Grade 2</Option>
              <Option value="3">Grade 3</Option>
              <Option value="4">Grade 4</Option>
              <Option value="5">Grade 5</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.school !== currentValues.school ||
              prevValues.grade !== currentValues.grade
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue("school") !== undefined &&
                getFieldValue("grade") !== undefined ? (
                <Form.Item
                  name="class"
                  label="Select Class"
                  rules={[
                    {
                      required: true,
                      message: "Please select a Class",
                    },
                  ]}
                >
                  <Select placeholder="Select Class">
                    <Option value="1">1-1</Option>
                    <Option value="2">1-2</Option>
                    <Option value="3">1-3</Option>
                  </Select>
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input First Name",
              },
              { max: 50, message: "Can only input 50 characters" },
            ]}
          >
            <Input maxLength={51} placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input Last Name" },
              { max: 50, message: "Can only input 50 characters" },
            ]}
          >
            <Input maxLength={51} placeholder="Last Name" />
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
            ]}
          >
            <Input maxLength={51} placeholder="Parent Name" />
          </Form.Item>
          <Form.Item
            name="parentPhone"
            label="Parent Phone"
            rules={[
              {
                pattern: new RegExp(
                  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
                ),
                message: "Please input a valid phone number",
              },
              { required: true, message: "Please input phone number" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewStudent;

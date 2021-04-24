import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditSchool = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getSchoolByID(props.schoolID);
    form.setFieldsValue({
      schoolName: data.schoolName,
      schoolStreet: data.schoolStreet,
      schoolDistrict: data.schoolDistrict,
      type: data.schoolLevel,
    });
  }, [
    data.schoolDistrict,
    data.schoolLevel,
    data.schoolName,
    data.schoolStreet,
    form,
    props.schoolID,
  ]);

  const getSchoolByID = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/${id}`)
      .then((res) => {
        setData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSchool = async (id, values) => {
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/school/${id}`, {
        schoolDistrict: values.schoolDistrict,
        schoolStreet: values.schoolStreet?.replace(/\s+/g, " ").trim(),
        schoolLevel: values.type,
      })
      .then((res) => {
        console.log(res);
        props.getAllSchool();
        setLoading(false);
        handleCancel();
        form.resetFields();
        message.success("Edit school successfully!");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to edit school!");
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    setLoading(true);
    updateSchool(props.schoolID, event);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
        Edit
      </Button>
      <Modal
        title="Edit School"
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
        <Form {...layout} form={form} initialValues={{ type: "PRIMARY" }}>
          <Form.Item
            name="type"
            label="Educational level"
            rules={[
              {
                required: true,
                message: "Please select a level",
              },
            ]}
          >
            <Select placeholder="Select a level">
              <Option value="PRIMARY">Primary School</Option>
              <Option value="JUNIOR">Junior High School</Option>
              <Option value="HIGH">High School</Option>
            </Select>
          </Form.Item>
          <Form.Item name="schoolName" label="School Name">
            <Input placeholder="School Name" disabled />
          </Form.Item>
          <Form.Item
            name="schoolDistrict"
            label="District"
            rules={[
              {
                required: true,
                message: "Please select a district",
              },
            ]}
          >
            <Select placeholder="Select a district">
              <Option value="District 1">District 1</Option>
              <Option value="District 2">District 2</Option>
              <Option value="District 3">District 3</Option>
              <Option value="District 4">District 4</Option>
              <Option value="District 5">District 5</Option>
              <Option value="District 6">District 6</Option>
              <Option value="District 7">District 7</Option>
              <Option value="District 8">District 8</Option>
              <Option value="District 9">District 9</Option>
              <Option value="District 10">District 10</Option>
              <Option value="District 11">District 11</Option>
              <Option value="District 12">District 12</Option>
              <Option value="Binh Thanh District">Binh Thanh District</Option>
              <Option value="Thu Đuc District">Thu Đuc District</Option>
              <Option value="Go Vap District">Go Vap District</Option>
              <Option value="Phu Nhuan District">Phu Nhuan District</Option>
              <Option value="Tan Binh District">Tan Binh District</Option>
              <Option value="Tan Phu District">Tan Phu District</Option>
              <Option value="Binh Tan District">Binh Tan District</Option>
              <Option value="Nha Be District">Nha Be District</Option>
              <Option value="Hoc Mon District">Hoc Mon District</Option>
              <Option value="Binh Chanh District">Binh Chanh District</Option>
              <Option value="Cu Chi District">Cu Chi District</Option>
              <Option value="Can Gio District">Can Gio District</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="schoolStreet"
            label="Address"
            rules={[
              { required: true, message: "Please input address" },
              {
                max: 100,
                message: "Can only input 100 characters!",
              },
            ]}
          >
            <Input.TextArea placeholder="Address" autoSize maxLength={101} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditSchool;

import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const getSchoolByID = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/${id}`)
      .then((res) => {
        form.setFieldsValue({
          schoolName: res.data.schoolName,
          schoolStreet: res.data.schoolStreet,
          schoolDistrict: res.data.schoolDistrict,
          type: res.data.schoolLevel,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSchool = async (id, values) => {
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/school/${id}`, {
        schoolName: values.schoolName,
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
        if (e.response.data === "EXISTED") {
          message.error(
            "This School name in the chosen district has already existed"
          );
        } else if (e.response.data === "Input can not blank!") {
          message.error("Input can not be blank");
        } else {
          message.error("Fail to create School");
        }
        setLoading(false);
      });
  };

  const showModal = () => {
    setVisible(true);
    getSchoolByID(props.schoolID);
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
              <Option value="JUNIOR" disabled>
                Junior High School
              </Option>
              <Option value="HIGH" disabled>
                High School
              </Option>
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
              <Option value="Quận 1">Quận 1</Option>
              <Option value="Quận 2">Quận 2</Option>
              <Option value="Quận 3">Quận 3</Option>
              <Option value="Quận 4">Quận 4</Option>
              <Option value="Quận 5">Quận 5</Option>
              <Option value="Quận 6">Quận 6</Option>
              <Option value="Quận 7">Quận 7</Option>
              <Option value="Quận 8">Quận 8</Option>
              <Option value="Quận 9">Quận 9</Option>
              <Option value="Quận 10">Quận 10</Option>
              <Option value="Quận 11">Quận 11</Option>
              <Option value="Quận 12">Quận 12</Option>
              <Option value="Quận Bình Chánh">Quận Bình Chánh</Option>
              <Option value="Quận Bình Tân">Quận Bình Tân</Option>
              <Option value="Quận Bình Thạnh">Quận Bình Thạnh</Option>
              <Option value="Quận Gò Vấp">Quận Gò Vấp</Option>
              <Option value="Quận Phú Nhuận">Quận Phú Nhuận</Option>
              <Option value="Quận Tân Bình">Quận Tân Bình</Option>
              <Option value="Quận Tân Phú">Quận Tân Phú</Option>
              <Option value="Quận Thủ Đức">Quận Thủ Đức</Option>
              <Option value="Huyện Cần Giờ">Huyện Cần Giờ</Option>
              <Option value="Huyện Củ Chi">Huyện Củ Chi</Option>
              <Option value="Huyện Hóc Môn">Huyện Hóc Môn</Option>
              <Option value="Huyện Nhà Bè">Huyện Nhà Bè</Option>
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

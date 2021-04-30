import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { schoolreg } from "../../../helper/regex";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewSchool = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const createNewSchool = async (values) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/school`, {
        schoolDistrict: values.schoolDistrict,
        schoolName: values.schoolName?.replace(/\s+/g, " ").trim(),
        schoolStreet: values.schoolStreet?.replace(/\s+/g, " ").trim(),
        schoolLevel: values.type,
      })
      .then((res) => {
        console.log(res);
        props.getAllSchool();
        props.getAllSchoolBC();
        message.success("Create new school successfully!");
        handleCancel();
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This School name has already existed");
        } else if (e.response.data === "Input can not blank!") {
          message.error("Input can not be blank");
        } else {
          message.error("Fail to create School");
        }
        setLoading(false);
      });
  };

  const onFinish = (event) => {
    warning(event);
  };

  const warning = (values) => {
    Modal.confirm({
      title: "Waring",
      closable: true,
      content: (
        <span>
          School name is very important.
          <br />
          Do you want to create this school?
          <br />
          (This action can not be reversed.)
        </span>
      ),
      okText: "Continue",
      onOk: async () => {
        await createNewSchool(values);
      },
    });
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create School
      </Button>
      <Modal
        title="Create School"
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
          <Form.Item
            name="schoolName"
            label="School Name"
            rules={[
              { required: true, message: "Please input a school name" },
              {
                max: 50,
                message: "Can only input 50 characters",
              },
              {
                pattern: schoolreg,
                message: "Can only input letters",
              },
            ]}
          >
            <Input placeholder="School Name" maxLength={51} />
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
                message: "Can only input 100 characters",
              },
            ]}
          >
            <Input.TextArea placeholder="Address" maxLength={101} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewSchool;

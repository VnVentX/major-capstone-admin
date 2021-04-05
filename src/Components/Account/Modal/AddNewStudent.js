import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Select, DatePicker, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewStudent = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [schoolData, setSchoolData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [classLoading, setClassLoading] = useState(false);

  useEffect(() => {
    getAllSchool();
    getAllGrade();
    form.setFieldsValue({
      school: props.searchData?.school,
      grade: props.searchData?.grade,
      class: props.searchData?.class,
    });
    setSelectedSchool(props.searchData?.school);
    setSelectedGrade(props.searchData?.grade);
  }, [form, props.searchData]);

  useEffect(() => {
    getClassByGradeSchoolID(selectedSchool, selectedGrade);
  }, [selectedGrade, selectedSchool]);

  const getClassByGradeSchoolID = async (schoolID, gradeID) => {
    setClassLoading(true);
    setClassData([]);
    await axios
      .post("https://mathscienceeducation.herokuapp.com/class/schoolGradeId", {
        gradeId: gradeID,
        schoolId: schoolID,
      })
      .then((res) => {
        setClassData(res.data.length === 0 ? [] : res.data);
        setClassLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setClassLoading(false);
      });
  };

  const getAllSchool = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/school/all")
      .then((res) => {
        setSchoolData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllGrade = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/grade/all")
      .then((res) => {
        setGradeData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleChangeSchool = (value) => {
    setSelectedSchool(value);
  };
  const handleChangeGrade = (value) => {
    setSelectedGrade(value);
  };

  const onFinish = (event) => {
    console.log(event.age.format("DD/MM/YYYY"));
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
            <Select placeholder="Choose a School" onChange={handleChangeSchool}>
              {schoolData?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  Trường Tiểu Học {item?.schoolName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="grade"
            label="Select Grade"
            rules={[{ required: true, message: "Please choose a Grade" }]}
          >
            <Select placeholder="Choose a Grade" onChange={handleChangeGrade}>
              {gradeData?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  Grade {item?.gradeName}
                </Select.Option>
              ))}
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
                  <Select
                    placeholder="Choose a Class"
                    notFoundContent={
                      classLoading ? <Spin size="default" /> : null
                    }
                  >
                    {classData?.map((item, idx) => (
                      <Select.Option key={idx} value={item?.id}>
                        {item?.className}
                      </Select.Option>
                    ))}
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

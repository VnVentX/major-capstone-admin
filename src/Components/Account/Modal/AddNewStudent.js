import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const onFinish = (values) => {
    createStudent(values);
  };

  const createStudent = async (values) => {
    setLoading(true);
    setClassData([]);
    await axios
      .post("https://mathscienceeducation.herokuapp.com/student", {
        classesId: values.class,
        doB: values.age.format("DD-MM-YYYY"),
        fullName: values.name,
        gender: values.gender,
        parentName: values.parentName,
        contact: values.contact,
      })
      .then((res) => {
        console.log(res);
        props.handleSearch(values);
        setLoading(false);
        handleCancel();
        form.resetFields();
        message.success("Create Student successfully!");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.success("Fail to create Student!");
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
            <DatePicker format="DD-MM-YYYY" />
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
            name="contact"
            label="Contact"
            rules={[
              {
                required: true,
                message: "Please input a concat (Phone or Email)",
              },
            ]}
          >
            <Input placeholder="Contact (Phone / Email)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewStudent;

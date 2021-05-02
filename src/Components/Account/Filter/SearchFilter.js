import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Select, Spin } from "antd";
import { getJwt } from "../../../helper/jwt";

const SearchFilter = (props) => {
  const [form] = Form.useForm();
  const [schoolData, setSchoolData] = useState(null);
  const [gradeData, setGradeData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [classLoading, setClassLoading] = useState(false);

  useEffect(() => {
    getAllSchool();
    if (props.searchData !== null) {
      getGradeBySchool(props.searchData?.school);
      getClassByGradeSchoolID(
        props.searchData?.school,
        props.searchData?.grade
      );
    }
    setSelectedSchool(props.searchData?.school);
    setSelectedGrade(props.searchData?.grade);
    setSelectedClass(props.searchData?.class);
  }, [props.searchData]);

  useEffect(() => {
    getGradeBySchool(selectedSchool);
  }, [selectedSchool]);

  useEffect(() => {
    getClassByGradeSchoolID(selectedSchool, selectedGrade);
  }, [selectedGrade, selectedSchool]);

  const getClassByGradeSchoolID = async (schoolID, gradeID) => {
    setClassLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/class/schoolGradeId`,
        {
          gradeId: gradeID,
          schoolId: schoolID,
        },
        {
          headers: {
            Authorization: await getJwt(),
          },
        }
      )
      .then((res) => {
        setClassData(res.data.length === 0 ? null : res.data);
        setClassLoading(false);
        form.setFieldsValue({
          class: selectedClass,
        });
      })
      .catch((e) => {
        console.log(e);
        setClassLoading(false);
      });
  };

  const getAllSchool = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        setSchoolData(res.data.length === 0 ? [] : res.data);
        form.setFieldsValue({
          school: props.searchData?.school,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGradeBySchool = async (schoolID) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${schoolID}`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        setGradeData(res.data.length === 0 ? [] : res.data);
        form.setFieldsValue({
          grade: selectedGrade,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeSchool = (value) => {
    setSelectedSchool(value);
    setGradeData([]);
    setSelectedGrade(null);
    setClassData([]);
    setSelectedClass(null);
    form.setFieldsValue({
      grade: null,
      class: null,
    });
  };
  const handleChangeGrade = (value) => {
    setSelectedGrade(value);
    setClassData([]);
    setSelectedClass(null);
    form.setFieldsValue({
      class: null,
    });
  };
  const handleChangeClass = (value) => {
    setSelectedClass(value);
  };

  const onFinish = (values) => {
    props.handleSearch(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      style={{ marginBottom: 20 }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="school" label="Search School">
            <Select
              placeholder="Choose a School"
              onChange={handleChangeSchool}
              allowClear
            >
              {schoolData?.map((i, idx) => (
                <Select.Option key={idx} value={i?.id}>
                  {i.schoolLevel === "PRIMARY" ? (
                    <>TH {i.schoolName}</>
                  ) : i.schoolLevel === "JUNIOR" ? (
                    <>THCS {i.schoolName}</>
                  ) : (
                    <>THPT {i.schoolName}</>
                  )}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="grade" label="Search Grade">
            <Select
              placeholder="Choose a Grade"
              onChange={handleChangeGrade}
              allowClear
            >
              {gradeData?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  Grade {item?.gradeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="class" label="Search Class">
            <Select
              placeholder="Choose a Class"
              onChange={handleChangeClass}
              notFoundContent={classLoading ? <Spin size="default" /> : null}
              allowClear
            >
              {classData?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  {item?.className}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
              setSelectedSchool("");
              setSelectedGrade(null);
              setGradeData([]);
              setSelectedClass(null);
              setClassData([]);
            }}
          >
            Clear
          </Button>
          <Button type="primary" htmlType="submit" loading={props.loading}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilter;

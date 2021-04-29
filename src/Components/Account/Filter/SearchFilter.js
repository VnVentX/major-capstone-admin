import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Select, Spin } from "antd";

const SearchFilter = (props) => {
  const [form] = Form.useForm();
  const [schoolData, setSchoolData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [classLoading, setClassLoading] = useState(false);

  useEffect(() => {
    getAllSchool();
    getAllGrade();
    if (props.searchData !== null) {
      getClassByGradeSchoolID(
        props.searchData?.school,
        props.searchData?.grade
      );
    }
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
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/class/schoolGradeId`, {
        gradeId: gradeID,
        schoolId: schoolID,
      })
      .then((res) => {
        setClassData(res.data.length === 0 ? null : res.data);
        setClassLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setClassLoading(false);
      });
  };

  const getAllSchool = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all`)
      .then((res) => {
        setSchoolData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/all`)
      .then((res) => {
        setGradeData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeSchool = (value) => {
    setSelectedSchool(value);
    form.setFieldsValue({
      class: null,
    });
  };
  const handleChangeGrade = (value) => {
    setSelectedGrade(value);
    form.setFieldsValue({
      class: null,
    });
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
            {schoolData?.length !== 0 && (
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
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="grade" label="Search Grade">
            {gradeData?.length !== 0 && (
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
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="class" label="Search Class">
            {classData?.length !== 0 && (
              <Select
                placeholder="Choose a Class"
                notFoundContent={classLoading ? <Spin size="default" /> : null}
                allowClear
              >
                {classData?.map((item, idx) => (
                  <Select.Option key={idx} value={item?.id}>
                    {item?.className}
                  </Select.Option>
                ))}
              </Select>
            )}
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
              setSelectedGrade("");
              setClassData(null);
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

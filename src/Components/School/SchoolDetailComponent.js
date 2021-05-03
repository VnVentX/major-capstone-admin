import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Card, Descriptions, Button } from "antd";
import ClassComponent from "./Class/ClassComponent";
import { getJwt } from "../../helper/jwt";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const SchoolDetailComponent = () => {
  const [schoolData, setSchoolData] = useState({});
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    getSchoolByID();
    getGradeBySchoolID();
  }, []);

  const getSchoolByID = async () => {
    let schoolID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/${schoolID}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setSchoolData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getGradeBySchoolID = async () => {
    let schoolID = window.location.pathname.split("/")[2];
    let formData = new FormData();
    formData.append("schoolId ", schoolID);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${schoolID}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setGradeData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Card type="inner" title="School Info">
        <Descriptions layout="vertical">
          {schoolData && (
            <>
              <Descriptions.Item
                label="School"
                labelStyle={{ fontWeight: "bold" }}
              >
                {schoolData.schoolLevel === "PRIMARY" ? (
                  <>TH {schoolData.schoolName}</>
                ) : schoolData.schoolLevel === "JUNIOR" ? (
                  <>THCS {schoolData.schoolName}</>
                ) : schoolData.schoolLevel === "HIGH" ? (
                  <>THPT {schoolData.schoolName}</>
                ) : null}
              </Descriptions.Item>
              <Descriptions.Item
                label="School Code"
                labelStyle={{ fontWeight: "bold" }}
              >
                {schoolData.schoolCode}
              </Descriptions.Item>
              <Descriptions.Item
                label="Education Level"
                labelStyle={{ fontWeight: "bold" }}
              >
                {schoolData.schoolLevel === "PRIMARY"
                  ? "Primary School"
                  : schoolData.schoolLevel === "JUNIOR"
                  ? "Junior High School"
                  : schoolData.schoolLevel === "HIGH"
                  ? "High School"
                  : null}
              </Descriptions.Item>
              <Descriptions.Item
                label="Address"
                labelStyle={{ fontWeight: "bold" }}
              >
                {schoolData.schoolStreet && (
                  <>
                    {schoolData.schoolStreet}, {schoolData.schoolDistrict}, TP.
                    Hồ Chí Minh
                  </>
                )}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Card>
      <Card type="inner" title="Linked Grades" style={{ marginTop: 20 }}>
        {gradeData.length === 0 && (
          <Button type="primary" style={{ textAlign: "center", margin: 0 }}>
            <Link to="/grade/1">Go to link Grade</Link>
          </Button>
        )}
        <Tabs type="card">
          {gradeData?.map((i, idx) => (
            <TabPane tab={`Grade ${i.gradeName}`} key={idx + 1}>
              <ClassComponent gradeID={i.id} status={i.status} />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};

export default SchoolDetailComponent;

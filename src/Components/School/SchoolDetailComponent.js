import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Card, Descriptions } from "antd";
import ClassComponent from "./Class/ClassComponent";

const { TabPane } = Tabs;

const data = [
  { id: 1, grade: 1 },
  { id: 2, grade: 2 },
  { id: 3, grade: 3 },
  { id: 4, grade: 4 },
  { id: 5, grade: 5 },
];

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
      .get(`https://mathscienceeducation.herokuapp.com/school/${schoolID}`)
      .then((res) => {
        console.log(res);
        setSchoolData(res.data);
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
      .get(`https://mathscienceeducation.herokuapp.com/grade/${schoolID}`)
      .then((res) => {
        console.log(res);
        setGradeData(res.data);
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
                {schoolData.schoolName}
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
                span={2}
              >
                {schoolData.schoolStreet}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Card>
      <Card type="inner" title="Linked Grades" style={{ marginTop: 20 }}>
        <Tabs type="card">
          {gradeData?.map((i, idx) => (
            <TabPane tab={`Grade ${i.gradeName}`} key={idx + 1}>
              <ClassComponent gradeID={i.id} />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};

export default SchoolDetailComponent;

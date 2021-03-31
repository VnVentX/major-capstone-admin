import React, { useState, useEffect } from "react";
import axios from "axios";
import Subject from "./Subject";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const SubjectComponent = () => {
  const [grade, setGrade] = useState([]);

  const getAllGrade = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/grade/all")
      .then((res) => {
        setGrade(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllGrade();
  }, []);

  return (
    <Tabs type="line">
      {grade?.map((i, idx) => (
        <TabPane tab={`${i.gradeName}`} key={idx + 1}>
          <Subject gradeID={i.id} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default SubjectComponent;

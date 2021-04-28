import React, { useState, useEffect } from "react";
import axios from "axios";
import Subject from "./Subject";
import { Tabs, Spin } from "antd";

const { TabPane } = Tabs;

const SubjectComponent = (props) => {
  const [grade, setGrade] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/all`)
      .then((res) => {
        setGrade(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllGrade();
  }, []);

  return (
    <>
      {loading === true ? (
        <Spin size="large" style={{ display: "grid", placeItems: "center" }} />
      ) : (
        <Tabs type="line">
          {grade?.map((i, idx) => (
            <TabPane tab={`Grade ${i.gradeName}`} key={idx + 1}>
              <Subject gradeID={i.id} getAllSubject={props.getAllSubject} />
            </TabPane>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default SubjectComponent;

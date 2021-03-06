import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Lesson from "./Lesson";
import AddNewLesson from "./Modal/AddNewLesson";
import EditLesson from "./Modal/EditLesson";
import { getJwt } from "../../../../helper/jwt";

const { TabPane } = Tabs;

const UnitComponent = (props) => {
  const [lesson, setLesson] = useState([]);
  const [selectedLessonID, setSelectedLessonID] = useState("");

  useEffect(() => {
    getLessonByUnitID();
  }, []);

  const getLessonByUnitID = async () => {
    let unitID = window.location.pathname.split("/")[4];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/unit/${unitID}/lessons`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setLesson(res.data.length === 0 ? [] : res.data);
        setSelectedLessonID(res.data.length === 0 ? [] : res.data[0].id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleTabClick = (e) => {
    setSelectedLessonID(e);
  };

  return (
    <Tabs
      activeKey={selectedLessonID + ""}
      tabBarExtraContent={
        <div style={{ display: "flex" }}>
          <AddNewLesson getLessonByUnitID={getLessonByUnitID} />
          <EditLesson
            lessonID={selectedLessonID}
            getLessonByUnitID={getLessonByUnitID}
          />
        </div>
      }
      onChange={handleTabClick}
    >
      {lesson?.map((i) => (
        <TabPane tab={`Lesson ${i.lessonName}`} key={i.id}>
          <Lesson
            lesson={i}
            getLessonByUnitID={getLessonByUnitID}
            getAllExercise={props.getAllExercise}
            getAllGame={props.getAllGame}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default UnitComponent;

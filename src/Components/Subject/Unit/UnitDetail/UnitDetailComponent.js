import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Lesson from "./Lesson";
import AddNewLesson from "./Modal/AddNewLesson";

const { TabPane } = Tabs;

const data = [
  {
    id: 1,
    title: "Lesson 1",
  },
  {
    id: 2,
    title: "Lesson 2",
  },
];

const UnitComponent = () => {
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    setLesson(data);
  }, []);

  return (
    <Tabs tabBarExtraContent={<AddNewLesson />}>
      {lesson?.map((i, idx) => (
        <TabPane tab={i.title} key={idx + 1}>
          <Lesson lesson={i.id} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default UnitComponent;

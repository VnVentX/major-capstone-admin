import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Lesson from "./Lesson";
import AddNewLesson from "./Modal/AddNewLesson";
import EditLesson from "./Modal/EditLesson";

const { TabPane } = Tabs;

const data = [
  {
    id: 1,
    title: "Lesson 1",
    ppUrl: "",
  },
  {
    id: 2,
    title: "Lesson 2",
    ppUrl: "",
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
        <TabPane
          tab={
            <div style={{ display: "flex" }}>
              {i.title}
              <EditLesson data={i} />
            </div>
          }
          key={idx + 1}
        >
          <Lesson lesson={i.id} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default UnitComponent;

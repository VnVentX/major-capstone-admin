import React from "react";
import Subject from "./Subject";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const grade = [
  { id: 1, grade: 1 },
  { id: 2, grade: 2 },
  { id: 3, grade: 3 },
  { id: 4, grade: 4 },
  { id: 5, grade: 5 },
];

const SubjectComponent = () => {
  return (
    <Tabs type="line">
      {grade?.map((i, idx) => (
        <TabPane tab={`Grade ${i.grade}`} key={idx + 1}>
          <Subject gradeID={i.id} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default SubjectComponent;

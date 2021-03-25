import React from "react";
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
  return (
    <>
      <Card type="inner" title="School Info">
        <Descriptions layout="vertical">
          <Descriptions.Item label="School" labelStyle={{ fontWeight: "bold" }}>
            Dương Minh Châu
          </Descriptions.Item>
          <Descriptions.Item
            label="Education Level"
            labelStyle={{ fontWeight: "bold" }}
          >
            Primary School
          </Descriptions.Item>
          <Descriptions.Item
            label="Address"
            labelStyle={{ fontWeight: "bold" }}
            span={2}
          >
            No. 34, Nguyen Lam Street, Ward 6, District 10, HMC
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card type="inner" title="Linked Grades" style={{ marginTop: 20 }}>
        <Tabs type="line">
          {data?.map((i, idx) => (
            <TabPane tab={`Grade ${i.grade}`} key={idx + 1}>
              <ClassComponent gradeID={i.id} />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </>
  );
};

export default SchoolDetailComponent;

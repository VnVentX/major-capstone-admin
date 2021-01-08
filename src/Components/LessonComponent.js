import React from "react";
import { Card, List } from "antd";

const data = [
  {
    title: "Lesson 1",
  },
  {
    title: "Lesson 2",
  },
  {
    title: "Lesson 3",
  },
  {
    title: "Lesson 4",
  },
  {
    title: "Lesson 5",
  },
];

const LessonComponent = () => {
  return (
    <Card type="inner" title="Lessons">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card type="inner" title={<a href="/">{item.title}</a>}>
              Lesson Descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LessonComponent;

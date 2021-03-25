import React, { useState } from "react";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Grade 1",
  },
  {
    id: 2,
    title: "Grade 2",
  },
  {
    id: 3,
    title: "Grade 3",
  },
  {
    id: 4,
    title: "Grade 4",
  },
  {
    id: 5,
    title: "Grade 5",
  },
];

const GradeComponent = () => {
  return (
    <Card type="inner" title="Choose a Grade">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <Link to={`grade/${item.id}${window.location.pathname}`}>
                  {item.title}
                </Link>
              }
            ></Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GradeComponent;

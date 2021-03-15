import React, { useState } from "react";
import { Card, Table, Space } from "antd";
import EditQuestion from "../../../../Question/Exercise/Modal/EditQuestion";
import AddQuestion from "./AddQuestion";

const selectedQuestionCol = [
  {
    title: "Question",
    width: "90%",
    dataIndex: "q_name",
    key: "q_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "x",
    render: (record) => (
      <Space size="middle">
        <EditQuestion data={record} />
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: 1,
    q_name: "Question 1",
  },
  {
    key: 2,
    q_name: "Question 2",
  },
  {
    key: 3,
    q_name: "Question 3",
  },
];

const QuizQuestionComponent = () => {
  return (
    <Card type="inner" title="Exercise 1">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AddQuestion />
      </div>
      <Table columns={selectedQuestionCol} dataSource={data} />
    </Card>
  );
};

export default QuizQuestionComponent;

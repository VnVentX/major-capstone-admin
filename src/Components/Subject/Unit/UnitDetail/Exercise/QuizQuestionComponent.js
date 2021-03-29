import React, { useState } from "react";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../../Question/Exercise/Modal/EditQuestion";
import AddQuestion from "./AddQuestion";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

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
  const handleDelete = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const selectedQuestionCol = [
    {
      title: "Question",
      width: "90%",
      dataIndex: "q_name",
      key: "q_name",
    },
    {
      title: "Action",
      align: "center",
      render: (record) => (
        <Space size="small">
          <EditQuestion data={record} />
          <Tooltip title="Delete Question">
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this question?"
              onConfirm={() => handleDelete(record.key)} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

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

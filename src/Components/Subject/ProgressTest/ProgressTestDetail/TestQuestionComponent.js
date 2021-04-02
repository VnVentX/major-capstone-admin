import React, { useState } from "react";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../Question/Exercise/Modal/EditQuestion";
import ViewQuestion from "../../../Question/Exercise/Modal/ViewQuestion";
import AddQuestion from "./Modal/AddTestQuestion";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    key: 1,
    q_name: "Question 1",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    key: 2,
    q_name: "Question 2",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    key: 3,
    q_name: "Question 3",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
];

const TestQuestionComponent = () => {
  const handleDelete = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const selectedQuestionCol = [
    {
      title: "Question",
      dataIndex: "q_name",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
    },
    {
      title: "Action",
      align: "center",
      render: (record) => (
        <Space size="small">
          <ViewQuestion data={record} />
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
    <Card type="inner" title="Test 1">
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

export default TestQuestionComponent;

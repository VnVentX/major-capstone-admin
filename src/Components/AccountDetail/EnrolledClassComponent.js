import React from "react";
import { Table, Card, Tag } from "antd";

const data = [
  {
    id: "4",
    firstName: "Trần",
    lastName: "Thiên Anh",
    school: "Duương Minh Châu",
    account: "DMC_G1_04",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
];

const columns = [
  {
    title: "School",
    dataIndex: "school",
    align: "center",
  },

  {
    title: "Grade",
    dataIndex: "grade",
    align: "center",
  },
  {
    title: "Class",
    dataIndex: "class",
    align: "center",
  },
  {
    title: "Account",
    dataIndex: "account",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    align: "center",
    render: (status) => (
      <span>
        {status === "done" ? (
          <Tag color={"green"} key={status}>
            Done
          </Tag>
        ) : status === "dropout" ? (
          <Tag color={"volcano"} key={status}>
            Dropout
          </Tag>
        ) : (
          <Tag color={"green"} key={status}>
            Learning
          </Tag>
        )}
      </span>
    ),
  },
];

const EnrolledClassComponent = () => {
  return (
    <Card type="inner" title="Enrolled Classes" style={{ marginTop: 20 }}>
      <Table columns={columns} dataSource={data} rowKey={data.key} />
    </Card>
  );
};

export default EnrolledClassComponent;

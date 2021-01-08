import React from "react";
import { Table, Card, Tag } from "antd";

const data = [
  {
    key: "1",
    site: "HCM",
    school: "TH Major",
    account: "HCM_12_M_G1_04",
    grade: 1,
    class: "1-1",
    status: "learning",
  },
  {
    key: "2",
    site: "ĐN",
    school: "TH Major",
    account: "HCM_12_M_G1_04",
    grade: 1,
    class: "1-1",
    status: "dropout",
  },
];

const columns = [
  {
    title: "Site",
    dataIndex: "site",
    key: "site",
  },
  {
    title: "School",
    dataIndex: "school",
    key: "school",
  },

  {
    title: "Grade",
    dataIndex: "grade",
  },
  {
    title: "Class",
    dataIndex: "class",
  },
  {
    title: "Account",
    dataIndex: "account",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Tag, Space, Table, Popconfirm, message } from "antd";
import ImportClassExcel from "./Modal/ImportClassExcel";

const columns = [
  {
    title: "Class",
    align: "center",
    width: "20%",
    render: (record) => (
      <Link
        to={{
          pathname: "/student",
          state: record,
        }}
      >
        Class {record.class}
      </Link>
    ),
  },
  {
    title: "Created By",
    align: "center",
    render: (record) => (
      <Space direction="vertical" size="small">
        {record.createdBy}
        {record.createdDate}
      </Space>
    ),
  },
  {
    title: "Modified By",
    align: "center",
    render: (record) => (
      <Space direction="vertical" size="small">
        {record.modifiedBy}
        {record.modifiedDate}
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => (
      <span>
        {status === "active" ? (
          <Tag color={"green"} key={status}>
            Active
          </Tag>
        ) : status === "dropout" ? (
          <Tag color={"volcano"} key={status}>
            Not Active
          </Tag>
        ) : null}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    align: "center",
    render: (record) => (
      <Space size="small">
        <Button type="primary">Change Status</Button>
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    school: "Dương Minh Châu",
    grade: 1,
    class: "1-1",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 2,
    school: "Dương Minh Châu",
    grade: 1,
    class: "1-2",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 3,
    school: "Dương Minh Châu",
    grade: 1,
    class: "1-3",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 4,
    school: "Dương Minh Châu",
    grade: 1,
    class: "1-4",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 5,
    school: "Dương Minh Châu",
    grade: 1,
    class: "1-5",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
];

const ClassComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
    setSelectedRowKeys([]);
  };

  return (
    <Card type="inner" title="Class Management">
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ImportClassExcel />
        {selectedRowKeys.length === 0 ? null : (
          <Popconfirm
            placement="topRight"
            title="Are you sure to disable selected Grades?"
            onConfirm={confirm} //Handle disable logic here
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" size="large" style={{ marginLeft: 5 }}>
              Disable
            </Button>
          </Popconfirm>
        )}
      </div>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
      />
    </Card>
  );
};

export default ClassComponent;

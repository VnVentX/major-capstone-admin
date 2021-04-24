import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Tag, Space, Table, Popconfirm, message } from "antd";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import AddNewClass from "./Modal/AddNewClass";
import ImportClassExcel from "./Modal/ImportClassExcel";
import EditClass from "./Modal/EditClass";
import ExportClassExcel from "./Modal/ExportClassExcel";

const ClassComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClassBySchoolGrade();
  }, []);

  const getClassBySchoolGrade = async () => {
    let schoolID = window.location.pathname.split("/")[2];
    let gradeID = props.gradeID;
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/class/schoolGradeId`, {
        gradeId: gradeID,
        schoolId: schoolID,
      })
      .then((res) => {
        setClassData(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const disableClass = async (id, status) => {
    setLoading(true);
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/class/changeStatus`, {
        ids: ids,
        status: status,
      })
      .then((res) => {
        console.log(res);
        getClassBySchoolGrade();
        setLoading(true);
        if (status === "DELETED") {
          message.success("Delete class successfully");
        } else {
          message.success("Change status successfully");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(true);
        if (status === "DELETED") {
          message.error("Fail to delete class");
        } else {
          message.error("Fail to change status");
        }
      });
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDisableClass = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    disableClass(e, message);
  };

  const columns = [
    {
      title: "Class",
      width: "20%",
      render: (record) => (
        <Link
          to={{
            pathname: "/student",
            state: {
              schoolID: parseInt(window.location.pathname.split("/")[2]),
              gradeID: props.gradeID,
              classID: record.id,
            },
          }}
        >
          {record.className}
        </Link>
      ),
    },
    {
      title: "Create By",
      dataIndex: "createdBy",
    },
    {
      title: "Create Date",
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
      title: "Status",
      align: "center",
      dataIndex: "status",
      render: (status) => (
        <span>
          {status === "ACTIVE" ? (
            <Tag color={"green"} key={status}>
              Active
            </Tag>
          ) : status === "INACTIVE" ? (
            <Tag color={"volcano"} key={status}>
              Disabled
            </Tag>
          ) : status === "PENDING" ? (
            <Tag color={"gold"} key={status}>
              Pending
            </Tag>
          ) : null}
        </span>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (record) => (
        <Space size="small">
          {record.className.toUpperCase() !== "PENDING" && (
            <>
              <Popconfirm
                placement="topRight"
                title={
                  record.status === "ACTIVE"
                    ? "Are you sure to disable this Class?"
                    : "Are you sure to active this Class?"
                }
                onConfirm={() => handleDisableClass(record.id, record.status)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Change Status</Button>
              </Popconfirm>
              <EditClass
                data={record}
                getClassBySchoolGrade={getClassBySchoolGrade}
              />
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete this Class?"
                onConfirm={() => handleDisableClass(record.id, "DELETED")} //Handle disable logic here
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card
      type="inner"
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Class Management
          <Button
            type="primary"
            size="middle"
            danger
            icon={<DownloadOutlined />}
          >
            Graduate
          </Button>
        </div>
      }
    >
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ImportClassExcel gradeID={props.gradeID} />
          <ExportClassExcel gradeID={props.gradeID} />
        </div>
        <AddNewClass
          gradeID={props.gradeID}
          getClassBySchoolGrade={getClassBySchoolGrade}
        />
      </div>
      <Table
        className="class-table"
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={classData}
        scroll={{ x: true }}
        loading={loading}
      />
      <div>
        <h1>With selected:</h1>
        {selectedRowKeys.length === 0 ? (
          <>
            <Button type="danger" disabled icon={<DeleteOutlined />}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete selected Class?"
              onConfirm={() => handleDisableClass(selectedRowKeys, "DELETED")} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </Card>
  );
};

export default ClassComponent;

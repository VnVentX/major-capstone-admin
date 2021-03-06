import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Tag,
  Space,
  Table,
  Spin,
  Popconfirm,
  message,
} from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewClass from "./Modal/AddNewClass";
import ImportClassExcel from "./Modal/ImportClassExcel";
import EditClass from "./Modal/EditClass";
import ExportClassExcel from "./Modal/ExportClassExcel";
import ExportFinalScore from "./Modal/ExportFinalScore";
import ExportAccount from "./Modal/ExportAccount";
import { getJwt } from "../../../helper/jwt";

const ClassComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graduateLoading, setGraduateLoading] = useState(false);

  useEffect(() => {
    getClassBySchoolGrade(props.gradeID);
  }, []);

  const getClassBySchoolGrade = async (gradeID) => {
    let schoolID = window.location.pathname.split("/")[2];
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/class/schoolGradeId`,
        {
          gradeId: gradeID,
          schoolId: schoolID,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
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
      .put(
        `${process.env.REACT_APP_BASE_URL}/class/changeStatus`,
        {
          ids: ids,
          status: status,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        getClassBySchoolGrade(props.gradeID);
        setLoading(true);
        if (status === "DELETED") {
          message.success("Delete class successfully!");
        } else if (status === "ACTIVE" || status === "INACTIVE") {
          message.success("Change status successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response?.data === "CANNOT DELETE") {
          message.error("Can not delete class with active student!");
        } else if (e.response.data === "CANNOT ACTIVE") {
          message.error("Can not active class in disabled link!");
        } else if (status === "ACTIVE" || status === "INACTIVE") {
          message.error("Fail to change status");
        }
        setLoading(false);
      });
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleGraduateLoading = (event) => {
    setGraduateLoading(event);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.className === "PENDING",
    }),
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
                gradeID={props.gradeID}
                getClassBySchoolGrade={getClassBySchoolGrade}
              />
              <Popconfirm
                placement="topRight"
                title={
                  <span>
                    Are you sure to delete this class?
                    <br />
                    (This action will remove all students.)
                  </span>
                }
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
          {props.status && (
            <ExportFinalScore
              gradeID={props.gradeID}
              handleGraduateLoading={handleGraduateLoading}
              getClassBySchoolGrade={getClassBySchoolGrade}
            />
          )}
        </div>
      }
    >
      {graduateLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {props.status === "ACTIVE" && (
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
                <ImportClassExcel
                  gradeID={props.gradeID}
                  getClassBySchoolGrade={getClassBySchoolGrade}
                />
                <ExportClassExcel
                  gradeID={props.gradeID}
                  handleGraduateLoading={handleGraduateLoading}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ExportAccount gradeID={props.gradeID} />
                <AddNewClass
                  gradeID={props.gradeID}
                  getClassBySchoolGrade={getClassBySchoolGrade}
                />
              </div>
            </div>
          )}
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
                  title={
                    <span>
                      Are you sure to delete selected classes?
                      <br />
                      (This action will remove all students.)
                    </span>
                  }
                  onConfirm={() =>
                    handleDisableClass(selectedRowKeys, "DELETED")
                  } //Handle disable logic here
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
        </>
      )}
    </Card>
  );
};

export default ClassComponent;

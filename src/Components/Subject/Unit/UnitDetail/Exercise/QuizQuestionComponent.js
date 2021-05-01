import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../../Question/Exercise/Modal/EditQuestion";
import ViewQuestion from "../../../../Question/Exercise/Modal/ViewQuestion";
import AddQuestion from "./AddQuestion";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getJwt } from "../../../../../helper/jwt";

const QuizQuestionComponent = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    getQuestionByExerciseID();
    getExerciseDetail();
  }, []);

  const getExerciseDetail = async () => {
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/exercise/${exerciseID}/status`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setStatus(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeStatus = async (status) => {
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/exercise/delete`,
        {
          id: exerciseID,
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
        getExerciseDetail();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getQuestionByExerciseID = async () => {
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/exerciseOrGame/${exerciseID}/questions?isExericse=true`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = async (id) => {
    let exerciseID = window.location.pathname.split("/")[6];
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/exerciseGameQuestion/delete`,
        {
          exercise: true,
          exerciseId: exerciseID,
          questionIds: ids,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        getQuestionByExerciseID();
        setSelectedRowKeys([]);
        message.success("Delete Question successfully");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete Question");
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
  const paginationProps = {
    showTotal: (total) => {
      return `Total Questions: ${total}`;
    },
  };
  const selectedQuestionCol = [
    {
      title: "Question",
      dataIndex: "questionTitle",
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
          {status === "INACTIVE" && (
            <>
              <EditQuestion
                data={record}
                getQuestionByExerciseID={getQuestionByExerciseID}
              />
              <Tooltip title="Delete Question">
                <Popconfirm
                  placement="topRight"
                  title="Are you sure to delete this question?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <Button type="danger" icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
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
          }}
        >
          Exercise Management
          {status && status === "ACTIVE" ? (
            <Popconfirm
              placement="topRight"
              title="Are you sure to close this Exercise?"
              onConfirm={() => handleChangeStatus("INACTIVE")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">Close Exercise</Button>
            </Popconfirm>
          ) : status === "INACTIVE" && data?.length < 2 ? (
            <Button type="primary" disabled>
              Open Exercise
            </Button>
          ) : status === "INACTIVE" ? (
            <Popconfirm
              placement="topRight"
              title="Are you sure to open this Exercise?"
              onConfirm={() => handleChangeStatus("ACTIVE")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Open Exercise</Button>
            </Popconfirm>
          ) : null}
        </div>
      }
    >
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {status === "INACTIVE" && data?.length >= 10 ? (
          <Button type="primary" disabled>
            Add Question from Question Bank
          </Button>
        ) : status === "INACTIVE" ? (
          <AddQuestion
            getQuestionByExerciseID={getQuestionByExerciseID}
            data={data}
          />
        ) : status === "ACTIVE" ? (
          <Button type="primary" icon={<PlusOutlined />} disabled>
            Add Question from Question Bank
          </Button>
        ) : null}
      </div>
      <Table
        rowSelection={rowSelection}
        columns={selectedQuestionCol}
        dataSource={data}
        rowKey={(record) => record.id}
        scroll={{ x: true }}
        pagination={paginationProps}
      />
      <div>
        <h1>With selected:</h1>
        {selectedRowKeys.length === 0 || status === "ACTIVE" ? (
          <>
            <Button type="danger" disabled icon={<DeleteOutlined />}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete selected Questions?"
              onConfirm={() => handleDelete(selectedRowKeys)}
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

export default QuizQuestionComponent;

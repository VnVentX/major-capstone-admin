import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../../Question/Game/Modal/Edit/EditQuestion";
import ViewQuestion from "../../../../Question/Game/Modal/View/ViewQuestion";
import AddQuestion from "./Modal/AddQuestion";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getJwt } from "../../../../../helper/jwt";

const GameQuestion = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    getQuestionByGameID();
    getGameDetail();
  }, []);

  const getGameDetail = async () => {
    setLoading(true);
    let gameID = window.location.pathname.split("/")[6];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/game/${gameID}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleChangeStatus = async (status) => {
    let gameID = window.location.pathname.split("/")[6];
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/game`,
        {
          id: gameID,
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
        getGameDetail();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getQuestionByGameID = async () => {
    setLoading(true);
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/exerciseOrGame/${exerciseID}/questions?isExericse=false`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    let gameID = window.location.pathname.split("/")[6];
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
          exercise: false,
          gameId: gameID,
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
        getQuestionByGameID();
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

  const selectedQuestionCol = [
    {
      title: "Question",
      dataIndex: "questionTitle",
    },
    {
      title: "Type",
      dataIndex: "questionType",
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
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="small">
          <ViewQuestion data={record} />
          {status === "INACTIVE" && (
            <>
              <EditQuestion
                data={record}
                getQuestionByGameID={getQuestionByGameID}
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
          Game Management
          {status && status === "ACTIVE" ? (
            <Popconfirm
              placement="topRight"
              title="Are you sure to close this Game?"
              onConfirm={() => handleChangeStatus("INACTIVE")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">Close Game</Button>
            </Popconfirm>
          ) : status === "INACTIVE" ? (
            <Popconfirm
              placement="topRight"
              title="Are you sure to open this Game?"
              onConfirm={() => handleChangeStatus("ACTIVE")}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Open Game</Button>
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
        {status === "INACTIVE" ? (
          <AddQuestion getQuestionByGameID={getQuestionByGameID} data={data} />
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
        loading={loading}
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

export default GameQuestion;

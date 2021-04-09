import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../../Question/Game/Modal/Edit/EditQuestion";
import ViewQuestion from "../../../../Question/Game/Modal/View/ViewQuestion";
import AddQuestion from "./Modal/AddQuestion";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const GameQuestion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuestionByGameID();
  }, []);

  const getQuestionByGameID = async () => {
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/exerciseOrGame/${exerciseID}/questions?isExericse=false`
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (e) => {
    console.log(e);
    message.success("Click on Yes");
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
    <Card type="inner" title="Game 1">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AddQuestion getQuestionByGameID={getQuestionByGameID} data={data} />
      </div>
      <Table
        columns={selectedQuestionCol}
        dataSource={data}
        rowKey={(record) => record.id}
      />
    </Card>
  );
};

export default GameQuestion;

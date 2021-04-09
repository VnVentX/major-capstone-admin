import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Space, Button, Popconfirm, message, Tooltip } from "antd";
import EditQuestion from "../../../Question/Exercise/Modal/EditQuestion";
import ViewQuestion from "../../../Question/Exercise/Modal/ViewQuestion";
import AddQuestion from "./Modal/AddTestQuestion";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const TestQuestionComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getQuestionByExerciseID();
  }, []);

  const getQuestionByExerciseID = async () => {
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/exerciseOrGame/${exerciseID}/questions?isExericse=true`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = async (item) => {
    let formData = new FormData();
    formData.append("id", item);
    await axios
      .put(
        "https://mathscienceeducation.herokuapp.com/exerciseGameQuestion/delete",
        formData
      )
      .then((res) => {
        console.log(res);
        getQuestionByExerciseID();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const selectedQuestionCol = [
    {
      title: "Question",
      dataIndex: "questionTitle",
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
        <AddQuestion
          getQuestionByExerciseID={getQuestionByExerciseID}
          data={data}
        />
      </div>
      <Table columns={selectedQuestionCol} dataSource={data} />
    </Card>
  );
};

export default TestQuestionComponent;

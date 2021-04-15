import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List, Popconfirm, message, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddProgress from "./Modal/AddProgress";
import EditProgress from "./Modal/EditProgress";

const ProgressTestDetailComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProgressTestByID();
  }, []);

  const getProgressTestByID = async () => {
    let progressTestID = window.location.pathname.split("/")[4];
    console.log(progressTestID);
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/progressTest/${progressTestID}/exercises`
      )
      .then((res) => {
        setData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = async (item) => {
    await axios
      .put("https://mathscienceeducation.herokuapp.com/exercise/delete", {
        id: item,
        status: "DELETED",
      })
      .then((res) => {
        console.log(res);
        getProgressTestByID();
        message.success("Delete Test successfully");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete Test");
      });
  };

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Review 1
          <AddProgress getProgressTestByID={getProgressTestByID} />
        </div>
      }
      type="inner"
    >
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link to={`${window.location.pathname}/test/${item.id}`}>
                    Test {item.exerciseName}
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <EditProgress
                      data={item}
                      getProgressTestByID={getProgressTestByID}
                    />
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Test?"
                        onConfirm={() => handleDelete(item.id)}
                        okText="Yes"
                        cancelText="No"
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                      >
                        <Button
                          type="danger"
                          icon={<DeleteOutlined />}
                          style={{ marginLeft: 5 }}
                        />
                      </Popconfirm>
                    </Tooltip>
                  </div>
                </div>
              }
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProgressTestDetailComponent;

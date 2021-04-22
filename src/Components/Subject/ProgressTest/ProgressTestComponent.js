import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  List,
  AutoComplete,
  Input,
  Popconfirm,
  message,
  Tooltip,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewProgress from "./Modal/AddNewProgress";
import EditProgressTest from "./Modal/EditProgressTest";

const { Search } = Input;

const ProgressTestComponent = () => {
  const [progress, setProgress] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getProgressTestBySubjectID();
  }, []);

  const getProgressTestBySubjectID = async () => {
    let subjectID = window.location.pathname.split("/")[2];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/progressTest`
      )
      .then((res) => {
        setProgress(res.data.length === 0 ? [] : res.data);
        setSearchData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProgressTest = async (id) => {
    let formData = new FormData();
    formData.append("id", id);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/progressTest/delete`, formData)
      .then((res) => {
        console.log(res);
        getProgressTestBySubjectID();
        message.success("Delete Progress Test successfully!");
      })
      .catch((e) => {
        console.log(e);
        message.success("Fail to delete Progress Test");
      });
  };

  const handleDelete = (item) => {
    deleteProgressTest(item);
  };

  return (
    <Card type="inner" title="Progress Test">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete
          dataSource={searchData?.map((item) => item.progressTestName)}
        >
          <Search
            allowClear
            placeholder="Search Progress Test"
            onSearch={(progressTestSearch) =>
              setProgress(
                searchData?.filter((item) =>
                  item.progressTestName
                    .toString()
                    .toLowerCase()
                    .includes(progressTestSearch.toLowerCase())
                )
              )
            }
            enterButton
          />
        </AutoComplete>
        <AddNewProgress
          getProgressTestBySubjectID={getProgressTestBySubjectID}
        />
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={progress}
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
                  <Link
                    to={`${window.location.pathname}/progress-test/${item.id}`}
                  >
                    {item.progressTestName}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <EditProgressTest
                      data={item}
                      getProgressTestBySubjectID={getProgressTestBySubjectID}
                    />
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Progress Test?"
                        onConfirm={() => handleDelete(item.id)} //Handle disable logic here
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

export default ProgressTestComponent;

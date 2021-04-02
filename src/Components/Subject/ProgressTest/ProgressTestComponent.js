import React, { useState, useEffect } from "react";
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

const data = [
  {
    id: 1,
    title: "Review 1",
  },
  {
    id: 2,
    title: "Review 2",
  },
  {
    id: 3,
    title: "Semester 1",
  },
];

const ProgressTestComponent = () => {
  const [progress, setProgress] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setProgress(data);
    setSearchData(data);
  }, []);

  const handleDelete = (item) => {
    console.log(item);
    message.success("Click on Yes");
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
        <AutoComplete dataSource={searchData.map((item) => item.title)}>
          <Search
            allowClear
            placeholder="Search Progress Test"
            onSearch={(subjectSearch) =>
              setProgress(
                searchData.filter((item) =>
                  item.title
                    .toString()
                    .toLowerCase()
                    .includes(subjectSearch.toLowerCase())
                )
              )
            }
            enterButton
          />
        </AutoComplete>
        <AddNewProgress />
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
                    {item.title}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "center" }}>
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
                          style={{ marginRight: 5 }}
                        />
                      </Popconfirm>
                    </Tooltip>
                    <EditProgressTest data={item} />
                  </div>
                </div>
              }
            >
              Progress Test Descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProgressTestComponent;

import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  AutoComplete,
  Input,
  Popconfirm,
  message,
  Button,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewSubject from "./Modal/AddNewSubject";
import EditSubject from "./Modal/EditSubject";

const data = [
  {
    id: 1,
    title: "Math",
  },
  {
    id: 2,
    title: "Science",
  },
];

const Subject = () => {
  const [subject, setSubject] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setSubject(data);
    setSearchData(data);
  }, []);

  const handleDelete = (item) => {
    console.log(item);
  };

  return (
    <Card type="inner" title="Subjects">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete dataSource={searchData.map((item) => item.title)}>
          <Input.Search
            allowClear
            placeholder="Search Subject"
            onSearch={(subjectSearch) =>
              setSubject(
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
        <AddNewSubject />
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={subject}
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
                  <Link to={`${window.location.pathname}/${item.id}`}>
                    {item.title}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Subject?"
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
                    <EditSubject data={item} />
                  </div>
                </div>
              }
            >
              Subject descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Subject;

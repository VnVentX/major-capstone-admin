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
import AddNewUnit from "./Modal/AddNewUnit";
import EditUnit from "./Modal/EditUnit";

const { Search } = Input;

const data = [
  {
    id: 1,
    title: "Unit 1",
  },
  {
    id: 2,
    title: "Unit 2",
  },
  {
    id: 3,
    title: "Unit 3",
  },
  {
    id: 4,
    title: "Unit 4",
  },
  {
    id: 5,
    title: "Unit 5",
  },
];

const UnitComponent = () => {
  const [unit, setUnit] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    setUnit(data);
    setSearchData(data);
  }, []);

  const handleDelete = (item) => {
    console.log(item);
    message.success("Click on Yes");
  };

  return (
    <Card type="inner" title="Unit">
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
            placeholder="Search Unit"
            onSearch={(subjectSearch) =>
              setUnit(
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
        <AddNewUnit />
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={unit}
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
                  <Link to={`${window.location.pathname}/unit/${item.id}`}>
                    {item.title}
                  </Link>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Unit?"
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
                    <EditUnit data={item} />
                  </div>
                </div>
              }
            >
              Unit Descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UnitComponent;

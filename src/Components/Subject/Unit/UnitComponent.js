import React, { useState, useEffect } from "react";
import { Card, List, AutoComplete, Input, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { MinusCircleOutlined } from "@ant-design/icons";
import AddNewUnit from "./Modal/AddNewUnit";

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

  const confirm = (e) => {
    console.log(e);
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
                  <Popconfirm
                    placement="left"
                    title="Are you sure to delete this Unit?"
                    onConfirm={confirm} //Handle disable logic here
                    okText="Yes"
                    cancelText="No"
                  >
                    <MinusCircleOutlined style={{ color: "red" }} />
                  </Popconfirm>
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

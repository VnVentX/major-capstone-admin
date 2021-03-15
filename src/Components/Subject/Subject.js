import React, { useState, useEffect } from "react";
import { Card, List, AutoComplete, Input, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { MinusCircleOutlined } from "@ant-design/icons";
import AddNewSubject from "./Modal/AddNewSubject";

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

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
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
                  <Popconfirm
                    placement="left"
                    title="Are you sure to delete this Progress Test?"
                    onConfirm={confirm} //Handle disable logic here
                    okText="Yes"
                    cancelText="No"
                  >
                    <MinusCircleOutlined style={{ color: "red" }} />
                  </Popconfirm>
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

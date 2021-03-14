import React, { useState, useEffect } from "react";
import { Card, List, AutoComplete, Input } from "antd";
import { Link } from "react-router-dom";
import AddNewProgress from "./Modal/AddNewProgress";

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
                <Link to={`${window.location.pathname}/unit/${item.id}`}>
                  {item.title}
                </Link>
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

export default ProgressTestComponent;

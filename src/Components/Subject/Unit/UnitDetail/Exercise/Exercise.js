import React from "react";
import { Typography, List, Card, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { MinusCircleOutlined } from "@ant-design/icons";
import AddQuiz from "./AddExercise";

const { Title } = Typography;

const data = [
  {
    id: 1,
    title: "Exercise 1",
  },
  {
    id: 2,
    title: "Exercise 2",
  },
  {
    id: 3,
    title: "Exercise 3",
  },
  {
    id: 4,
    title: "Exercise 4",
  },
];
const Exercise = () => {
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={1}>Exercise</Title>
        <AddQuiz />
      </div>
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
                  <Link to={`${window.location.pathname}/excecise/${item.id}`}>
                    {item.title}
                  </Link>
                  <Popconfirm
                    placement="left"
                    title="Are you sure to delete this Exercise?"
                    onConfirm={confirm} //Handle disable logic here
                    okText="Yes"
                    cancelText="No"
                  >
                    <MinusCircleOutlined style={{ color: "red" }} />
                  </Popconfirm>
                </div>
              }
            >
              Exercise descriptions
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Exercise;

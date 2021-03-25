import React from "react";
import { Typography, List, Card, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { MinusCircleOutlined } from "@ant-design/icons";
import AddGame from "./Modal/AddGame";

const { Title } = Typography;

const data = [
  {
    id: 1,
    title: "Game 1",
  },
  {
    id: 2,
    title: "Game 2",
  },
  {
    id: 3,
    title: "Game 3",
  },
  {
    id: 4,
    title: "Game 4",
  },
];
const Game = () => {
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
        <Title level={1}>Game</Title>
        <AddGame />
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
                  <Link to={`${window.location.pathname}/game/${item.id}`}>
                    {item.title}
                  </Link>
                  <Popconfirm
                    placement="left"
                    title="Are you sure to delete this Game?"
                    onConfirm={confirm} //Handle disable logic here
                    okText="Yes"
                    cancelText="No"
                  >
                    <MinusCircleOutlined style={{ color: "red" }} />
                  </Popconfirm>
                </div>
              }
            >
              Game descriptions
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Game;

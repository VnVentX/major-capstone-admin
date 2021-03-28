import React from "react";
import {
  Card,
  List,
  Popconfirm,
  message,
  Tooltip,
  Button,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddGame from "./Modal/AddGame";
import EditGame from "./Modal/EditGame";

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
  const handleDelete = (item) => {
    console.log(item);
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Game?"
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
                    <EditGame data={item} />
                  </div>
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

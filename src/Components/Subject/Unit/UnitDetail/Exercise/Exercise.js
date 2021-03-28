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
import AddQuiz from "./AddExercise";
import EditExercise from "./EditExercise";

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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Exercise?"
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
                    <EditExercise data={item} />
                  </div>
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

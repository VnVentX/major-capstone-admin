import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Game = (props) => {
  const [game, setGame] = useState([]);

  useEffect(() => {
    getGameByLessonID();
  }, []);

  const getGameByLessonID = async () => {
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/lesson/${props.lessonID}/game/all`
      )
      .then((res) => {
        setGame(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteGame = async (exerciseID) => {
    // let formData = new FormData();
    // formData.append("id", exerciseID);
    // await axios
    //   .put(
    //     "https://mathscienceeducation.herokuapp.com/exercise/delete",
    //     formData
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     getExerciseByLessonID();
    //     message.success("Delete Exercise successfully!");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     message.success("Fail to delete Exercise");
    //   });
  };

  const handleDelete = (item) => {
    deleteGame(item);
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
        <AddGame
          lessonID={props.lessonID}
          getGameByLessonID={getGameByLessonID}
        />
      </div>
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 1 }}
        dataSource={game}
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
                    {item.gameName}
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
                    <EditGame
                      data={item}
                      lessonID={props.lessonID}
                      getGameByLessonID={getGameByLessonID}
                    />
                  </div>
                </div>
              }
            >
              {item.description}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Game;

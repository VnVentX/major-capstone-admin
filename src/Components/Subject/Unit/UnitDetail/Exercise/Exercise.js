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
  Badge,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddExercise from "./AddExercise";
import EditExercise from "./EditExercise";

const { Title } = Typography;

const Exercise = (props) => {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    getExerciseByLessonID();
  }, []);

  const getExerciseByLessonID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/lesson/${props.lessonID}/exercises`
      )
      .then((res) => {
        setExercise(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteExercise = async (exerciseID) => {
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/exercise/delete`, {
        id: exerciseID,
        status: "DELETED",
      })
      .then((res) => {
        console.log(res);
        getExerciseByLessonID();
        message.success("Delete Exercise successfully");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete Exercise");
      });
  };

  const handleDelete = (item) => {
    deleteExercise(item);
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
        <AddExercise
          lessonID={props.lessonID}
          getExerciseByLessonID={getExerciseByLessonID}
        />
      </div>
      {exercise && (
        <List
          itemLayout="horizontal"
          grid={{ gutter: 16, column: 1 }}
          dataSource={exercise}
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        to={`${window.location.pathname}/excecise/${item.id}`}
                      >
                        Exercise {item.exerciseName}
                      </Link>
                      {item.status === "ACTIVE" ? (
                        <Badge status="success" style={{ marginLeft: 5 }} />
                      ) : (
                        <Badge status="default" style={{ marginLeft: 5 }} />
                      )}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <EditExercise
                        lessonID={props.lessonID}
                        data={item}
                        getExerciseByLessonID={getExerciseByLessonID}
                      />
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
                            style={{ marginLeft: 5 }}
                          />
                        </Popconfirm>
                      </Tooltip>
                    </div>
                  </div>
                }
              >
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default Exercise;

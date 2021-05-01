import React from "react";
import axios from "axios";
import { Typography, Divider, Button, Popconfirm, message } from "antd";
import PowerPoint from "./PowerPoint/PowerPoint";
import Exercise from "./Exercise/Exercise";
import Game from "./Game/Game";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../helper/jwt";

const Lesson = (props) => {
  const handleDelete = async (item) => {
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/lesson?id=${item}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        console.log(res);
        props.getLessonByUnitID();
        message.success("Delete Lesson successfully!");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete Lesson");
      });
  };

  return (
    <Typography>
      <PowerPoint url={props.lesson.lessonUrl} />
      <Divider />
      {/* //! Exercise */}
      <Exercise
        lessonID={props.lesson.id}
        getAllExercise={props.getAllExercise}
      />
      <Divider />
      {/* //! Game */}
      <Game lessonID={props.lesson.id} getAllGame={props.getAllGame} />
      <Divider />
      <Popconfirm
        placement="top"
        title="Are you sure to delete this Lesson?"
        onConfirm={() => handleDelete(props.lesson.id)} //Handle disable logic here
        okText="Yes"
        cancelText="No"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <Button
          type="primary"
          danger
          style={{ float: "right" }}
          icon={<DeleteOutlined />}
        >
          Delete Lesson
        </Button>
      </Popconfirm>
    </Typography>
  );
};

export default Lesson;

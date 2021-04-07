import React from "react";
import axios from "axios";
import { Typography, Divider, Button, Popconfirm, message } from "antd";
import PowerPoint from "./PowerPoint/PowerPoint";
import Exercise from "./Exercise/Exercise";
import Game from "./Game/Game";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const Lesson = (props) => {
  const handleDelete = async (item) => {
    await axios
      .put(`https://mathscienceeducation.herokuapp.com/lesson?id=${item}`)
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

      <Exercise lessonID={props.lesson.id} />
      <Divider />

      <Game lessonID={props.lesson.id} />
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

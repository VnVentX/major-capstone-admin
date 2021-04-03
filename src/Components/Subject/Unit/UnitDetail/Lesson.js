import React from "react";
import { Typography, Divider, Button, Popconfirm, message } from "antd";
import PowerPoint from "./PowerPoint/PowerPoint";
import Exercise from "./Exercise/Exercise";
import Game from "./Game/Game";
import { DeleteOutlined } from "@ant-design/icons";

const Lesson = (props) => {
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  return (
    <Typography>
      <PowerPoint url={props.lesson.lessonUrl} />
      <Divider />

      <Exercise lessonID={props.lesson.id} />
      <Divider />

      <Game />
      <Divider />
      <Popconfirm
        placement="top"
        title="Are you sure to delete this Lesson?"
        onConfirm={confirm} //Handle disable logic here
        okText="Yes"
        cancelText="No"
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

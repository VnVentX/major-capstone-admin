import React from "react";
import { Col, Layout } from "antd";
import LessonComponent from "../Components/LessonComponent";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
const { Content } = Layout;

const Lesson = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <LessonComponent />
        </Content>
      </Col>
      <Col span={4}>
        <Content className="annoucement-layout site-layout-background">
          <AnnounceComponent />
        </Content>
        <Content className="event-layout site-layout-background">
          <UpComingEventComponent />
        </Content>
      </Col>
    </>
  );
};

export default Lesson;

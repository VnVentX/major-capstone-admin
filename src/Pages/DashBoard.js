import React from "react";
import LessonComponent from "../Components/LessonComponent";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import { Layout, Col } from "antd";
const { Content } = Layout;

const DashBoard = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <AnnounceComponent />
          <LessonComponent />
        </Content>
      </Col>
      <Col span={4}>
        <Content className="event-layout site-layout-background">
          <UpComingEventComponent />
        </Content>
      </Col>
    </>
  );
};

export default DashBoard;

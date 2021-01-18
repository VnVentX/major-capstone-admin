import React from "react";
import UnitComponent from "../Components/Lesson/UnitComponent";
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
          <UnitComponent />
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

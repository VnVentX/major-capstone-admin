import React from "react";
import { Col, Layout } from "antd";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import SubjectComponent from "../Components/Lesson/SubjectComponent";
const { Content } = Layout;

const Subject = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <SubjectComponent />
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

export default Subject;

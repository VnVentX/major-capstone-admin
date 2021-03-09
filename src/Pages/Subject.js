import React from "react";
import { Col, Layout } from "antd";
import SubjectComponent from "../Components/Lesson/SubjectComponent";
const { Content } = Layout;

const Subject = () => {
  return (
      <Col span={24}>
        <Content className="main-layout site-layout-background">
          <SubjectComponent />
        </Content>
      </Col>
  );
};

export default Subject;

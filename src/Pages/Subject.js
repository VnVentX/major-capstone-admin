import React from "react";
import { Col, Layout } from "antd";
import SubjectComponent from "../Components/Subject/SubjectComponent";
const { Content } = Layout;

const Subject = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <SubjectComponent getAllSubject={props.getAllSubject} />
      </Content>
    </Col>
  );
};

export default Subject;

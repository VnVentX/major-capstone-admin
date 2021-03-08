import React from "react";
import { Layout, Col } from "antd";
import SchoolComponent from "../Components/School/SchoolComponent";
const { Content } = Layout;

const School = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <SchoolComponent />
      </Content>
    </Col>
  );
};

export default School;

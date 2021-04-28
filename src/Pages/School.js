import React from "react";
import { Layout, Col } from "antd";
import SchoolComponent from "../Components/School/SchoolComponent";
const { Content } = Layout;

const School = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <SchoolComponent getAllSchool={props.getAllSchool} />
      </Content>
    </Col>
  );
};

export default School;

import React from "react";
import { Col, Layout } from "antd";
import UnitComponent from "../Components/Subject/Unit/UnitComponent";
const { Content } = Layout;

const Unit = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <UnitComponent />
      </Content>
    </Col>
  );
};

export default Unit;

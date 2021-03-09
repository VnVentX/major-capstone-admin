import React from "react";
import { Col, Layout } from "antd";
import UnitDetailComponent from "../Components/Lesson/UnitDetailComponent";
const { Content } = Layout;

const UnitDetail = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <UnitDetailComponent />
      </Content>
    </Col>
  );
};

export default UnitDetail;

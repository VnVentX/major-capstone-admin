import React from "react";
import { Col, Layout } from "antd";
import ProgressTestDetailComponent from "../Components/Subject/ProgressTest/ProgressTestDetail/ProgressTestDetailComponent";

const { Content } = Layout;

const ProgressTestDetail = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <ProgressTestDetailComponent />
      </Content>
    </Col>
  );
};

export default ProgressTestDetail;

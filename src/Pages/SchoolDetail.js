import React from "react";
import { Layout, Col } from "antd";
import SchoolDetailComponent from "../Components/School/SchoolDetailComponent";

const { Content } = Layout;

const SchoolDetail = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <SchoolDetailComponent />
      </Content>
    </Col>
  );
};

export default SchoolDetail;

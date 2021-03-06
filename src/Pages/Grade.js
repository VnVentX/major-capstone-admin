import React from "react";
import { Layout, Col } from "antd";
import GradeTable from "../Components/Grade/GradeTable";

const { Content } = Layout;

const Grade = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <GradeTable />
      </Content>
    </Col>
  );
};

export default Grade;

import React from "react";
import { Layout, Col } from "antd";
import GradeDetailTable from "../Components/GradeDetail/GradeDetailTable";

const { Content } = Layout;

const GradeDetail = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <GradeDetailTable gradeID={props.gradeID} />
      </Content>
    </Col>
  );
};

export default GradeDetail;

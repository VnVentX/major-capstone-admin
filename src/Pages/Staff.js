import React from "react";
import { Layout, Col } from "antd";
import StaffComponent from "../Components/Staff/StaffComponent";
const { Content } = Layout;

const Staff = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <StaffComponent />
      </Content>
    </Col>
  );
};

export default Staff;

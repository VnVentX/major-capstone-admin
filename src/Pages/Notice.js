import React from "react";
import { Layout, Col } from "antd";
import NoticeComponent from "../Components/Notice/NoticeComponent";
const { Content } = Layout;

const Notice = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <NoticeComponent />
      </Content>
    </Col>
  );
};

export default Notice;

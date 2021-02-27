import React from "react";
import { Layout } from "antd";
import NoticeComponent from "../Components/Notice/NoticeComponent";
const { Content } = Layout;

const Notice = () => {
  return (
    <Content className="main-layout site-layout-background">
      <NoticeComponent />
    </Content>
  );
};

export default Notice;

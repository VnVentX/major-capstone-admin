import React from "react";
import { Layout } from "antd";
import SchoolComponent from "../Components/School/SchoolComponent";
const { Content } = Layout;

const School = () => {
  return (
    <Content className="main-layout site-layout-background">
      <SchoolComponent />
    </Content>
  );
};

export default School;

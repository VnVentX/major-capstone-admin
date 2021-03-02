import React from "react";
import GradeComponent from "../Components/Grade/GradeComponent";
import { Layout } from "antd";
const { Content } = Layout;

const Lesson = () => {
  return (
    <Content className="main-layout site-layout-background">
      <GradeComponent />
    </Content>
  );
};

export default Lesson;

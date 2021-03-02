import React from "react";
import { Layout } from "antd";
import GradeComponent from "../Grade/GradeComponent";

const { Content } = Layout;

const QuestionComponent = () => {
  return (
    <Content className="main-layout site-layout-background">
      <GradeComponent />
    </Content>
  );
};

export default QuestionComponent;

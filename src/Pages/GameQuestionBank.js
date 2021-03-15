import React from "react";
import { Col, Layout, Tabs } from "antd";
import QuestionBankComponent from "../Components/Question/Game/QuestionBankComponent";
import AddNewQuestion from "../Components/Question/Game/AddNewQuestion";
const { Content } = Layout;
const { TabPane } = Tabs;

const GameQuestionBank = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Question Bank" key="1">
            <QuestionBankComponent />
          </TabPane>
          <TabPane tab="Add new question" key="2">
            <AddNewQuestion />
          </TabPane>
        </Tabs>
      </Content>
    </Col>
  );
};

export default GameQuestionBank;

import React from "react";
import { Col, Layout, Tabs } from "antd";
import QuestionBankComponent from "../Components/Question/QuestionBankComponent";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import AddNewQuestion from "../Components/Question/AddNewQuestion";
import CategoryComponent from "../Components/Question/CategoryComponent";
const { Content } = Layout;
const { TabPane } = Tabs;

const QuestionBank = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Question Bank" key="1">
              <QuestionBankComponent />
            </TabPane>
            <TabPane tab="Category" key="2">
              <CategoryComponent />
            </TabPane>
            <TabPane tab="Add new question" key="3">
              <AddNewQuestion />
            </TabPane>
          </Tabs>
        </Content>
      </Col>
      <Col span={4}>
        <Content className="annoucement-layout site-layout-background">
          <AnnounceComponent />
        </Content>
        <Content className="event-layout site-layout-background">
          <UpComingEventComponent />
        </Content>
      </Col>
    </>
  );
};

export default QuestionBank;

import React from "react";
import UnitComponent from "../Components/Subject/Unit/UnitComponent";
import { Col, Layout, Tabs } from "antd";
import ProgressTestComponent from "../Components/Subject/ProgressTest/ProgressTestComponent";

const { TabPane } = Tabs;
const { Content } = Layout;

const SubjectDetail = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <Tabs type="line">
          <TabPane tab="List Unit" key={1}>
            <UnitComponent getAllUnit={props.getAllUnit} />
          </TabPane>
          <TabPane tab="Progress Test" key={2}>
            <ProgressTestComponent
              getAllProgressTest={props.getAllProgressTest}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Col>
  );
};

export default SubjectDetail;

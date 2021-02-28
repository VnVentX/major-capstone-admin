import React from "react";
import { Tabs } from "antd";
import BannerComponent from "./Banner/BannerComponent";
import AnnoucementComponent from "./Annoucement/AnnoucementComponent";

const { TabPane } = Tabs;

const NoticeComponent = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Banner" key="1">
        <BannerComponent />
      </TabPane>
      <TabPane tab="Annoucement" key="2">
        <AnnoucementComponent />
      </TabPane>
    </Tabs>
  );
};

export default NoticeComponent;

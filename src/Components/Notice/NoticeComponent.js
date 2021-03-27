import React from "react";
import { Card, Tabs } from "antd";
import BannerComponent from "./Banner/BannerComponent";
import AnnouncementComponent from "./Announcement/AnnouncementComponent";

const { TabPane } = Tabs;

const NoticeComponent = () => {
  return (
    <Card type="inner" title="News Management">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Banner" key="1">
          <BannerComponent />
        </TabPane>
        <TabPane tab="News" key="2">
          <AnnouncementComponent />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default NoticeComponent;

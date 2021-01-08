import React from "react";
import AccountTableComponent from "../Components/Account/AccountTableComponent";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import { Layout, Col } from "antd";
const { Content } = Layout;

const Account = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <AccountTableComponent/>
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

export default Account;

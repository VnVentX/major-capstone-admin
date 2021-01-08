import React from "react";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import AccountDetailComponent from "../Components/AccountDetail/AccountDetailComponent";
import { Layout, Col } from "antd";
import EnrolledClassComponent from "../Components/AccountDetail/EnrolledClassComponent";
const { Content } = Layout;

const AccountDetail = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <AccountDetailComponent />
          <EnrolledClassComponent />
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

export default AccountDetail;

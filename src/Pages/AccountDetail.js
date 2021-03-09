import React from "react";
import AccountDetailComponent from "../Components/AccountDetail/AccountDetailComponent";
import { Layout, Col } from "antd";
import EnrolledClassComponent from "../Components/AccountDetail/EnrolledClassComponent";
const { Content } = Layout;

const AccountDetail = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <AccountDetailComponent />
        <EnrolledClassComponent />
      </Content>
    </Col>
  );
};

export default AccountDetail;

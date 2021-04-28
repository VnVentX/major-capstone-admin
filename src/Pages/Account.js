import React, { useEffect } from "react";
import AccountTableComponent from "../Components/Account/AccountTableComponent";
import { Layout, Col } from "antd";
const { Content } = Layout;

const Account = (props) => {
  useEffect(() => {
    props.activeMenu();
  }, []);
  
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <AccountTableComponent />
      </Content>
    </Col>
  );
};

export default Account;

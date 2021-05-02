import React from "react";
import { Layout, Col } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;

const Page404 = () => {
  return (
    <Col span={24}>
      <Content
        className="main-layout site-layout-background"
        style={{ textAlign: "center" }}
      >
        <div class="mainbox">
          <div class="err">4</div>
          <div class="err1">0</div>
          <div class="err2">4</div>
          <div class="msg">
            Maybe this page moved? Got deleted? Is hiding out in quarantine?
            Never existed in the first place?
            <p>
              Let's go <Link to="/">home</Link> and try from there.
            </p>
          </div>
        </div>
      </Content>
    </Col>
  );
};

export default Page404;

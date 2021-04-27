import React from "react";
import { Col, Layout, Image, Button } from "antd";
import banner from "../Img/major-banner.jpg";
const { Content } = Layout;

const Home = () => {
  return (
    <>
      <Col span={24}>
        <Content
          className="main-layout site-layout-background"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Image src={banner} alt="major-banner" />
          <Button type="primary" size="large">
            <a href="https://major-education-student.herokuapp.com/">
              Go to Math & Science
            </a>
          </Button>
        </Content>
      </Col>
    </>
  );
};

export default Home;

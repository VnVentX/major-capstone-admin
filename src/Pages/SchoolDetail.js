import React, { useEffect } from "react";
import { Layout, Col } from "antd";
import SchoolDetailComponent from "../Components/School/SchoolDetailComponent";

const { Content } = Layout;

const SchoolDetail = (props) => {
  useEffect(() => {
    props.activeMenu();
  }, []);

  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <SchoolDetailComponent />
      </Content>
    </Col>
  );
};

export default SchoolDetail;

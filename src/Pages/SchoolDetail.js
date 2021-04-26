import React, { useEffect } from "react";
import { Layout, Col } from "antd";
import SchoolDetailComponent from "../Components/School/SchoolDetailComponent";

const { Content } = Layout;

const SchoolDetail = (props) => {
  useEffect(() => {
    // props.activeMenu();
    const school = document.getElementById("school");
    school?.classList?.add("ant-menu-item-selected");
    const grade1 = document.getElementById("grade1");
    grade1?.classList?.remove("ant-menu-item-selected");
    const grade2 = document.getElementById("grade2");
    grade2?.classList?.remove("ant-menu-item-selected");
    const grade3 = document.getElementById("grade3");
    grade3?.classList?.remove("ant-menu-item-selected");
    const grade4 = document.getElementById("grade4");
    grade4?.classList?.remove("ant-menu-item-selected");
    const grade5 = document.getElementById("grade5");
    grade5?.classList?.remove("ant-menu-item-selected");
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

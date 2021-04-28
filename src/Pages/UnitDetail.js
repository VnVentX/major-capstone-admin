import React from "react";
import { Col, Layout } from "antd";
import UnitDetailComponent from "../Components/Subject/Unit/UnitDetail/UnitDetailComponent";
const { Content } = Layout;

const UnitDetail = (props) => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <UnitDetailComponent
          getAllExercise={props.getAllExercise}
          getAllGame={props.getAllGame}
        />
      </Content>
    </Col>
  );
};

export default UnitDetail;

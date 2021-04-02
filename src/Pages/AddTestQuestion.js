import { Col, Layout } from "antd";
import TestQuestionComponent from "../Components/Subject/ProgressTest/ProgressTestDetail/TestQuestionComponent";
const { Content } = Layout;

const AddTestQuestion = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <TestQuestionComponent />
      </Content>
    </Col>
  );
};

export default AddTestQuestion;

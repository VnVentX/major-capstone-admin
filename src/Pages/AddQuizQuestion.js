import { Col, Layout } from "antd";
import AnnounceComponent from "../Components/AnnounceComponent";
import UpComingEventComponent from "../Components/UpComingEventComponent";
import QuizQuestionComponent from "../Components/Lesson/QuizQuestionComponent";
const { Content } = Layout;

const AddQuizQuestion = () => {
  return (
    <>
      <Col span={20}>
        <Content className="main-layout site-layout-background">
          <QuizQuestionComponent />
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

export default AddQuizQuestion;

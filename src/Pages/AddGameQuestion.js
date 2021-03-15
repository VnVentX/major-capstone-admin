import { Col, Layout } from "antd";
import GameQuestion from "../Components/Subject/Unit/UnitDetail/Game/GameQuestion";
const { Content } = Layout;

const AddGameQuestion = () => {
  return (
    <Col span={24}>
      <Content className="main-layout site-layout-background">
        <GameQuestion />
      </Content>
    </Col>
  );
};

export default AddGameQuestion;

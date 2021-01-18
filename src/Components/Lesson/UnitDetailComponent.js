import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Divider,
  List,
  Card,
} from "antd";
import { Link } from "react-router-dom";
import AddQuiz from "./AddQuiz";

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const data = [
  {
    title: "Quiz 1",
  },
  {
    title: "Quiz 2",
  },
  {
    title: "Quiz 3",
  },
  {
    title: "Quiz 4",
  },
];

const UnitComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  return (
    <>
      <Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={1}>Introduction</Title>
          <Button type="primary" size="middle" onClick={showModal}>
            Edit Content
          </Button>
          <Modal
            title="Edit Unit"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form {...layout} name="nest-messages">
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input placeholder="Unit Title" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="Unit Description"
                />
              </Form.Item>
              <Form.Item
                name="lesson-1"
                label="Lesson 1"
                rules={[{ required: true }]}
              >
                <Input placeholder="Lesson Title" />
              </Form.Item>
              <Form.Item
                name="lesson-1-url"
                label="Url Lesson 1"
                rules={[{ required: true }]}
              >
                <Input placeholder="Url Lesson" />
              </Form.Item>
              <Form.Item
                name="lesson-1-des"
                label="Descripton"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="Lesson Description"
                />
              </Form.Item>

              <Form.Item
                name="lesson-2"
                label="Lesson 2"
                rules={[{ required: true }]}
              >
                <Input placeholder="Lesson Title" />
              </Form.Item>
              <Form.Item
                name="lesson-2-url"
                label="Url Lesson 2"
                rules={[{ required: true }]}
              >
                <Input placeholder="Url Lesson" />
              </Form.Item>
              <Form.Item
                name="lesson-2-des"
                label="Descripton"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="Lesson Description"
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development. In the process of internal
          desktop applications development, many different design specs and
          implementations would be involved, which might cause designers and
          developers difficulties and duplication and reduce the efficiency of
          development.
        </Paragraph>

        <Divider />

        <Title level={1}>Lesson 1</Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development. In the process of internal
          desktop applications development, many different design specs and
          implementations would be involved, which might cause designers and
          developers difficulties and duplication and reduce the efficiency of
          development.
        </Paragraph>
        <div id="layout" className="non-fs">
          <iframe
            title="lesson 1"
            id="myframe"
            src="https://onedrive.live.com/embed?resid=1EB9A25728760E08%215189&amp;authkey=%21AFuemMImkjPq4Yk&amp;em=2&amp;wdAr=1.7786561264822134"
            frameBorder="0"
          ></iframe>
        </div>
        <Divider />

        <Title level={1}>Lesson 2</Title>
        <Paragraph>
          In the process of internal desktop applications development, many
          different design specs and implementations would be involved, which
          might cause designers and developers difficulties and duplication and
          reduce the efficiency of development. In the process of internal
          desktop applications development, many different design specs and
          implementations would be involved, which might cause designers and
          developers difficulties and duplication and reduce the efficiency of
          development.
        </Paragraph>
        <div id="layout" className="non-fs">
          <iframe
            title="lesson 1"
            id="myframe"
            src="https://onedrive.live.com/embed?resid=1EB9A25728760E08%215189&amp;authkey=%21AFuemMImkjPq4Yk&amp;em=2&amp;wdAr=1.7786561264822134"
            frameBorder="0"
          ></iframe>
        </div>
        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={1}>Quiz</Title>
          <AddQuiz />
        </div>
        <List
          itemLayout="horizontal"
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Link to="/lesson/grade/1/math/1/quiz">{item.title}</Link>
                }
              >
                Quiz descriptions
              </Card>
            </List.Item>
          )}
        />
      </Typography>
    </>
  );
};

export default UnitComponent;

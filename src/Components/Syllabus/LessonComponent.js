import React from "react";
import { Card, List, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
const data = [
  {
    title: "Unit 1",
  },
  {
    title: "Unit 2",
  },
  {
    title: "Unit 3",
  },
  {
    title: "Unit 4",
  },
  {
    title: "Unit 5",
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LessonComponent = () => {
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
    <Card type="inner" title="Syllabus">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" size="middle" onClick={showModal}>
          Create Unit
        </Button>
        <Modal
          title="Create Unit"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form {...layout} name="nest-messages">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
              name="lesson1"
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
          </Form>
        </Modal>
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={<Link to="/lesson/grade/1/Unit/1">{item.title}</Link>}>
              Lesson Descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LessonComponent;

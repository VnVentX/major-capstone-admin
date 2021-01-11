import React from "react";
import { Button, Modal, Form, Input, Typography, Divider } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
          <Title>Introduction</Title>
          <Button type="primary" size="middle" onClick={showModal}>
            Edit Content
          </Button>
          <Modal
            title="Create Unit"
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

        <Title level={2}>Lesson 1</Title>
        <div id="layout" className="non-fs">
          <iframe
            title="lesson 1"
            id="myframe"
            src="https://onedrive.live.com/embed?resid=1EB9A25728760E08%215189&amp;authkey=%21AFuemMImkjPq4Yk&amp;em=2&amp;wdAr=1.7786561264822134"
            frameborder="0"
          ></iframe>
        </div>
        <Divider />

        <Title level={2}>Lesson 2</Title>
        <div id="layout" className="non-fs">
          <iframe
            title="lesson 1"
            id="myframe"
            src="https://onedrive.live.com/embed?resid=1EB9A25728760E08%215189&amp;authkey=%21AFuemMImkjPq4Yk&amp;em=2&amp;wdAr=1.7786561264822134"
            frameborder="0"
          ></iframe>
        </div>
        <Divider />

        <Title level={2}>Guidelines and Resources</Title>
        <Paragraph>
          We supply a series of design principles, practical patterns and high
          quality design resources (<Text code>Sketch</Text> and{" "}
          <Text code>Axure</Text>), to help people create their product
          prototypes beautifully and efficiently.
        </Paragraph>

        <Paragraph>
          <ul>
            <li>
              <Link href="/docs/spec/proximity">Principles</Link>
            </li>
            <li>
              <Link href="/docs/pattern/navigation">Patterns</Link>
            </li>
            <li>
              <Link href="/docs/resource/download">Resource Download</Link>
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </>
  );
};

export default UnitComponent;

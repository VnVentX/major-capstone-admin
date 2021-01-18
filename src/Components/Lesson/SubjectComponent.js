import React from "react";
import { Card, List, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;

const data = [
  {
    title: "Math",
  },
  {
    title: "Science",
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SubjectComponent = () => {
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

  const onSearch = (value) => console.log(value);

  return (
    <Card type="inner" title="Subjects">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Search subject"
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
          enterButton
        />
        <Button type="primary" size="middle" onClick={showModal}>
          Create Subject
        </Button>
        <Modal
          title="Create Subject"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form {...layout} name="nest-messages">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Subject Title" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                showCount
                maxLength={500}
                placeholder="Subject Description"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={<Link to="/lesson/grade/1/math">{item.title}</Link>}>
              Subject descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SubjectComponent;

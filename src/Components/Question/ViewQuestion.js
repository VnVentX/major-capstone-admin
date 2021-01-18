import React, { useState } from "react";
import { Select, Form, Modal, Input, Divider, Space } from "antd";

const answers = [
  {
    key: 1,
    answer: "A",
    audio: "A",
    img: "A",
    correct: "true",
  },
  {
    key: 2,
    answer: "B",
    audio: "B",
    img: "B",
    correct: "false",
  },
];

const ViewQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <button
        className="ant-btn-link"
        onClick={() => {
          showModal();
          console.log(props.data);
        }}
      >
        View
      </button>
      <Modal
        visible={visible}
        width={"45vw"}
        title="View Question"
        cancelText="Cancel"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="view-question-form"
          autoComplete="off"
          preserve={false}
          layout="vertical"
          initialValues={{
            q_name: props.data.q_name,
            q_audio: "Q1",
            q_img: "Q1",
          }}
        >
          <h1>Question</h1>
          <Divider />
          <Form.Item name="q_name" label="Question">
            <Input.TextArea disabled />
          </Form.Item>
          <Form.Item name="q_audio" label="Audio">
            <Input disabled />
          </Form.Item>
          <Form.Item name="q_img" label="Image">
            <Input disabled />
          </Form.Item>
          <h1>Answers</h1>
          <>
            {answers.map((answer) => (
              <div key={answer.key}>
                <Divider />
                <Space key={answer.key} align="center">
                  <Form.Item
                    label="Answear"
                    name={"answear" + answer.key}
                    initialValue={answer.answer}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Audio"
                    name={"audio" + answer.key}
                    initialValue={answer.audio}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Image"
                    name={"img" + answer.key}
                    initialValue={answer.img}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Correct"
                    name={"correct" + answer.key}
                    initialValue={answer.correct}
                  >
                    <Select style={{ width: 150 }} disabled>
                      <Select.Option value="true">True</Select.Option>
                      <Select.Option value="false">False</Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
              </div>
            ))}
          </>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewQuestion;

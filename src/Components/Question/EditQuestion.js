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

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (event) => {
    console.log(event);
  };

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
        }}
      >
        Edit
      </button>
      <Modal
        visible={visible}
        width={"45vw"}
        title="Edit Question"
        okText="Update"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="update_form"
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
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="q_audio" label="Audio">
            <Input />
          </Form.Item>
          <Form.Item name="q_img" label="Image">
            <Input />
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Audio"
                    name={"audio" + answer.key}
                    initialValue={answer.audio}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Image"
                    name={"img" + answer.key}
                    initialValue={answer.img}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Correct"
                    name={"correct" + answer.key}
                    initialValue={answer.correct}
                  >
                    <Select style={{ width: 150 }}>
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

export default EditQuestion;

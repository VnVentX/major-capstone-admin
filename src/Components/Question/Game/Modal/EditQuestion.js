import React, { useState } from "react";
import { Select, Form, Modal, Input, Divider, Row, Col } from "antd";

const options = [
  {
    option: "A",
    correct: "True",
  },
  {
    option: "B",
    correct: "False",
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
              handleCancel();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            question: props.data.q_name,
            q_audio: "Q1",
            q_img: "Q1",
            options: options,
          }}
        >
          <h1>Question</h1>
          <Divider />
          <Form.Item
            name="question"
            label="Question Text"
            rules={[{ required: true, message: "Please input a question" }]}
          >
            <Input.TextArea
              autoSize
              maxLength="100"
              showCount
              placeholder="Question Text"
            />
          </Form.Item>
          <Form.Item
            name="q_audio"
            label="Audio URL"
            rules={[{ type: "url", message: "Please input a valid URL!" }]}
          >
            <Input placeholder="Audio URL" />
          </Form.Item>
          <Form.Item
            name="q_img"
            label="Image URL"
            rules={[{ type: "url", message: "Please input a valid URL!" }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>
          <h1>Answers</h1>
          <Form.List name="options">
            {(fields) => {
              return (
                <div>
                  {fields.map((field, idx) => (
                    <Row gutter={24} key={idx}>
                      <Divider />
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label={`Option ${idx + 1}`}
                          name={[field.name, "option"]}
                          fieldKey={[field.fieldKey, "option"]}
                          rules={[
                            { required: true, message: "Please input option!" },
                          ]}
                        >
                          <Input.TextArea
                            autoSize
                            maxLength="100"
                            showCount
                            placeholder="Option Text"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label="Is Correct"
                          name={[field.name, "correct"]}
                          fieldKey={[field.fieldKey, "correct"]}
                          rules={[
                            { required: true, message: "Missing correct" },
                          ]}
                        >
                          <Select placeholder="Select Is Correct">
                            <Select.Option value="true">True</Select.Option>
                            <Select.Option value="false">False</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default EditQuestion;

import React, { useState } from "react";
import { Col, Layout, Form, Input, Button, Space, Modal, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Content } = Layout;

const QuestionBank = () => {
  const [visible, setVisible] = useState(false);
  const [key, setkey] = useState(1);
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    setkey(key + 1);
    const question = {
      question: values.question,
      key: key,
      answers: values.answers,
    };
    setQuestions([...questions, question]);
  };

  return (
    <div>
      <Col span={24}>
        <Content className="main-layout site-layout-background">
          <Button
            type="primary"
            onClick={() => {
              showModal();
              console.log(questions);
            }}
          >
            Add New Question
          </Button>
          <Modal
            visible={visible}
            title="Create new question"
            okText="Create"
            cancelText="Cancel"
            destroyOnClose
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
              name="dynamic_form_nest_item"
              autoComplete="off"
              preserve={false}
            >
              <Form.Item
                name="question"
                label="Question"
                rules={[{ required: true, message: "Missing question" }]}
              >
                <Input />
              </Form.Item>
              <Form.List name="answers">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          {...field}
                          label="Answear"
                          name={[field.name, "answear"]}
                          fieldKey={[field.fieldKey, "answear"]}
                          dependencies={["question"]}
                          rules={[
                            { required: true, message: "Missing answer" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Correct"
                          name={[field.name, "correct"]}
                          fieldKey={[field.fieldKey, "correct"]}
                          dependencies={["question"]}
                          rules={[
                            { required: true, message: "Missing correct" },
                          ]}
                        >
                          <Select style={{ width: 80 }}>
                            <Select.Option value="true">True</Select.Option>
                            <Select.Option value="false">False</Select.Option>
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add sights
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              {/* <Form.Item style={{ marginLeft: 200 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Modal>
        </Content>
      </Col>
    </div>
  );
};

export default QuestionBank;

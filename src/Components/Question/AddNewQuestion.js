import React, { useState } from "react";
import { Form, Input, Button, Space, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddNewQuestion = () => {
  const [key, setkey] = useState(1);
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);

  const onFinish = async (values) => {
    setkey(key + 1);
    const question = {
      key: key,
      grade: values.grade,
      subject: values.subject,
      category: values.category,
      q_name: values.question,
      q_audio: values.q_audio,
      q_img: values.q_img,
      answers: values.answers,
    };
    await setQuestions([...questions, question]);
    form.resetFields();
    console.log(questions);
  };

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        autoComplete="off"
        preserve={false}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2>Question</h2>
        <Divider />
        <Form.Item
          name="grade"
          label="Select grade"
          rules={[
            {
              required: true,
              message: "Please select grade",
            },
          ]}
        >
          <Select showSearch placeholder="Select grade">
            <Option value="1">Grade 1</Option>
            <Option value="2">Grade 2</Option>
            <Option value="3">Grade 3</Option>
            <Option value="4">Grade 4</Option>
            <Option value="5">Grade 5</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subject"
          label="Select subject"
          rules={[
            {
              required: true,
              message: "Please select subject",
            },
          ]}
        >
          <Select showSearch placeholder="Select subject">
            <Option value="math">Math</Option>
            <Option value="science">Science</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.subject !== currentValues.subject
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue("subject") !== undefined ? (
              <Form.Item
                name="category"
                label="Select Category"
                rules={[
                  {
                    required: true,
                    message: "Please select category",
                  },
                ]}
              >
                <Select showSearch placeholder="Select category">
                  <Option value="quiz 1">Quiz 1</Option>
                  <Option value="quiz 2">Quiz 2</Option>
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Missing question" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="q_audio"
          label="Audio"
          rules={[{ required: true, message: "Missing audio" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="q_img"
          label="Image"
          rules={[{ required: true, message: "Missing image" }]}
        >
          <Input />
        </Form.Item>
        <h2>Answers</h2>
        <Form.List
          name="answers"
          rules={[
            {
              validator: async (_, answers) => {
                if (!answers || answers.length < 2) {
                  return Promise.reject(
                    new Error("At least 2 answers are required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <>
                  <Divider />
                  <Space key={field.key} align="center">
                    <Form.Item
                      {...field}
                      label="Answear"
                      name={[field.name, "answear"]}
                      fieldKey={[field.fieldKey, "answear"]}
                      dependencies={["question"]}
                      rules={[{ required: true, message: "Missing answer" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Audio"
                      name={[field.name, "audio"]}
                      fieldKey={[field.fieldKey, "audio"]}
                      dependencies={["question"]}
                      rules={[{ required: true, message: "Missing audio" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Image"
                      name={[field.name, "img"]}
                      fieldKey={[field.fieldKey, "img"]}
                      dependencies={["question"]}
                      rules={[{ required: true, message: "Missing image" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Correct"
                      name={[field.name, "correct"]}
                      fieldKey={[field.fieldKey, "correct"]}
                      dependencies={["question"]}
                      rules={[{ required: true, message: "Missing correct" }]}
                    >
                      <Select style={{ width: 150 }}>
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
                </>
              ))}
              <Form.ErrorList errors={errors} />
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Answer
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              left: "45%",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNewQuestion;

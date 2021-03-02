import React, { useState } from "react";
import { Form, Input, Button, Space, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddNewQuestion = () => {
  const [counter, setCounter] = useState(0);
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);

  const handleCounter = () => {
    var count = counter;
    setCounter(count + 1);
  };

  const onFinish = async (values) => {
    const question = {
      subject: values.subject,
      category: values.category,
      q_name: values.question,
      q_audio: values.q_audio,
      q_img: values.q_img,
      answers: values.answers,
    };
    await setQuestions([...questions, question]);
    setCounter(0);
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
                  <Option value="unit 1">Unit 1</Option>
                  <Option value="unit 2">Unit 2</Option>
                  <Option value="unit 3">Unit 3</Option>
                  <Option value="unit 4">Unit 4</Option>
                  <Option value="unit 5">Unit 5</Option>
                  <Option value="unit 6">Unit 6</Option>
                  <Option value="unit 7">Unit 7</Option>
                  <Option value="unit 8">Unit 8</Option>
                  <Option value="unit 9">Unit 9</Option>
                  <Option value="unit 10">Unit 10</Option>
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
              {fields.map((field, idx) => (
                <div key={idx}>
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
                </div>
              ))}
              <Form.ErrorList errors={errors} />
              {counter === 4 ? null : (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      handleCounter();
                      console.log(counter);
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Answer
                  </Button>
                </Form.Item>
              )}
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

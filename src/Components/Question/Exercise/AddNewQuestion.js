import React, { useState } from "react";
import { Form, Input, Button, Select, Divider, Row, Col } from "antd";
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

  const handleMinus = () => {
    var count = counter;
    setCounter(count - 1);
  };

  const onFinish = (values) => {
    const question = {
      subject: values.subject,
      unit: values.unit,
      q_name: values.question,
      q_audio: values.q_audio,
      q_img: values.q_img,
      options: values.options,
    };
    setQuestions(question);
    setCounter(0);
    form.setFieldsValue({
      question: null,
      q_audio: null,
      q_img: null,
      options: null,
    });
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
          label="Select Subject"
          rules={[
            {
              required: true,
              message: "Please select Subject!",
            },
          ]}
        >
          <Select showSearch placeholder="Select Subject">
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
                name="unit"
                label="Select Unit"
                rules={[
                  {
                    required: true,
                    message: "Please select Unit!",
                  },
                ]}
              >
                <Select showSearch placeholder="Select Unit">
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
                  <Option value="unit 11">Unit 11</Option>
                  <Option value="unit 12">Unit 12</Option>
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item
          name="question"
          label="Question Text"
          rules={[{ required: true, message: "Please input a question" }]}
        >
          <Input.TextArea
            autoSize
            maxLength="250"
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
        <h2>Options</h2>
        <Form.List
          name="options"
          rules={[
            {
              validator: async (_, options) => {
                if (!options || options.length < 2) {
                  return Promise.reject(
                    new Error("At least 2 options are required")
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, idx) => (
                <Row gutter={24} key={idx}>
                  <Divider />
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      label={`Option ${idx + 1}`}
                      name={[field.name, "option"]}
                      fieldKey={[field.fieldKey, "option"]}
                      dependencies={["question"]}
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
                      dependencies={["question"]}
                      rules={[{ required: true, message: "Missing correct" }]}
                    >
                      <Select placeholder="Select Is Correct">
                        <Select.Option value="true">True</Select.Option>
                        <Select.Option value="false">False</Select.Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ float: "right", color: "red" }}
                      onClick={() => {
                        remove(field.name);
                        handleMinus();
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.ErrorList errors={errors} />
              {counter === 4 ? null : (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      handleCounter();
                    }}
                    block
                    icon={<PlusOutlined />}
                    style={{ marginTop: 10 }}
                  >
                    Add Options
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

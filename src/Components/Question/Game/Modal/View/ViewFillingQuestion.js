import React, { useState, useEffect } from "react";
import { Form, Input, Select, Divider, Row, Col, Image } from "antd";

const { Option } = Select;

const options = [
  { option: "operator", operator: "-" },
  { option: "text", text: "123" },
  { option: "text", text: "sad" },
  { option: "text", text: "asd" },
  { option: "operator", operator: "-" },
];

const ViewFillingQuestion = (props) => {
  useEffect(() => {
    props.form.setFieldsValue({
      subject: "math",
      unit: "unit 1",
      question: "Fill in the blank with the correct word",
      options: options,
    });
  }, []);

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Filling Question</h2>
      <Divider />
      <Form.Item name="subject" label="Select Subject">
        <Select showSearch placeholder="Select Subject" disabled>
          <Option value="math">Math</Option>
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
            <Form.Item name="unit" label="Select Unit">
              <Select showSearch placeholder="Select Unit" disabled>
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
      <Form.Item name="questionTitle" label="Question Title">
        <Input.TextArea
          autoSize
          maxLength="100"
          showCount
          placeholder="Question Title"
          disabled
        />
      </Form.Item>
      <Form.Item name="question" label="Question Text">
        <Input.TextArea
          autoSize
          maxLength="250"
          showCount
          placeholder="Question Text"
          disabled
        />
      </Form.Item>
      <Form.Item name="q_img" label="Question Image">
        <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
      </Form.Item>
      {/* <Form.Item
        name="q_audio"
        label="Question Audio"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture"
          fileList={audioFile}
          beforeUpload={() => false}
          onRemove={() => {
            setAudioFile([]);
          }}
          onChange={(info) => {
            if (info.file.type) {
              if (info.file.type.split("/")[0] !== "audio") {
                message.error(`${info.file.name} is not an audio file`);
                setAudioFile([]);
              } else {
                handleChangeAudio(info);
              }
            }
          }}
        >
          {audioFile.length === 1 ? null : (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
      </Form.Item> */}
      <h2>Options</h2>
      <Form.List name="options">
        {(fields) => (
          <>
            {fields.map((field, idx) => (
              <Row gutter={24} key={idx}>
                <Divider />
                <Col span={12}>
                  <Form.Item
                    {...field}
                    label="Input Type"
                    name={[field.name, "option"]}
                    fieldKey={[field.fieldKey, "option"]}
                    dependencies={["question"]}
                  >
                    <Select placeholder="Select input type" disabled>
                      <Option value="operator">Operator</Option>
                      <Option value="text">Text</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.options !== currentValues.options
                    }
                  >
                    {() => {
                      return props.form.getFieldsValue().options[idx]
                        ?.option === "operator" ? (
                        <Form.Item
                          {...field}
                          name={[field.name, "operator"]}
                          fieldKey={[field.fieldKey, "operator"]}
                          dependencies={["question"]}
                          label="Operator"
                        >
                          <Select placeholder="Select Operator" disabled>
                            <Select.Option value="+">Plus (+)</Select.Option>
                            <Select.Option value="-">Minus (-)</Select.Option>
                            <Select.Option value="x">
                              Multiply (x)
                            </Select.Option>
                            <Select.Option value="/">Divide (/)</Select.Option>
                            <Select.Option value="=">Equal (=)</Select.Option>
                          </Select>
                        </Form.Item>
                      ) : props.form.getFieldsValue().options[idx]?.option ===
                        "text" ? (
                        <Form.Item
                          {...field}
                          name={[field.name, "text"]}
                          fieldKey={[field.fieldKey, "text"]}
                          dependencies={["question"]}
                          label="Text"
                        >
                          <Input.TextArea
                            autoSize
                            maxLength="100"
                            showCount
                            placeholder="Text"
                            disabled
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default ViewFillingQuestion;

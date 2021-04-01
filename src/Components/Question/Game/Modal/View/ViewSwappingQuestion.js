import React, { useState, useEffect } from "react";
import { Form, Input, Select, Divider, Row, Col, Image } from "antd";

const { Option } = Select;

const ViewSwappingQuestion = (props) => {
  useEffect(() => {
    props.form.setFieldsValue({
      subject: "science",
      unit: "unit 2",
      question: "Swap the word to the right picture",
      value1: "Hand",
      value2: "Leg",
      value3: "Ear",
      value4: "Nose",
      key1: "",
      key2: "",
      key3: "",
      key4: "",
    });
  }, []);

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Swapping Question</h2>
      <Divider />
      <Form.Item name="subject" label="Select Subject">
        <Select showSearch placeholder="Select Subject" disabled>
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
      <Form.Item name="question" label="Question Text">
        <Input.TextArea
          maxLength="250"
          showCount
          placeholder="Question Text"
          disabled
        />
      </Form.Item>
      <h2>Options</h2>
      <Divider />
      <h3>Pair 1</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key1" label="Pair's Picture">
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value1" label="Pair's Answer">
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <h3>Pair 2</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key2" label="Pair's Picture">
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value2" label="Pair's Answer">
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      {/* !Option 3 */}
      <h3>Pair 3</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key3" label="Pair's Picture">
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value3" label="Pair's Answer">
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      {/* Option 4 */}
      <h3>Pair 4</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key4" label="Pair's Picture">
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value4" label="Pair's Answer">
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </Form>
  );
};

export default ViewSwappingQuestion;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Divider, Row, Col, Image, InputNumber } from "antd";

const ViewMatchingQuestion = (props) => {
  const [option, setOption] = useState([]);
  useEffect(() => {
    getQuestionByID();
  }, []);

  const getQuestionByID = async () => {
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/question/${props.data.id}?questionType=MATCH`
      )
      .then((res) => {
        props.form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description,
          score: res.data.score,
          value1: res.data.optionQuestionDTOList[0].optionText,
          value2: res.data.optionQuestionDTOList[1].optionText,
          value3: res.data.optionQuestionDTOList[2].optionText,
          value4: res.data.optionQuestionDTOList[3].optionText,
          value5: res.data.optionQuestionDTOList[4].optionText,
          value6: res.data.optionQuestionDTOList[5].optionText,
        });
        setOption(res.data.optionQuestionDTOList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Matching Question</h2>
      <Divider />
      <Form.Item name="questionTitle" label="Question Title">
        <Input.TextArea
          autoSize
          maxLength="250"
          showCount
          placeholder="Question Title"
          disabled
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea
          autoSize
          maxLength="50"
          showCount
          placeholder="Description"
          disabled
        />
      </Form.Item>
      <Form.Item name="score" label="Score">
        <InputNumber placeholder="Score" disabled />
      </Form.Item>
      <h2>Options</h2>
      <Divider />
      <h3>Pair 1</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key1" label="Pair's Picture">
            {option && <Image src={option[0]?.optionImageUrl} />}
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
            {option && <Image src={option[1]?.optionImageUrl} />}
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
            {option && <Image src={option[2]?.optionImageUrl} />}
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
            {option && <Image src={option[3]?.optionImageUrl} />}
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
      {/* Option 5 */}
      <h3>Pair 5</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key5" label="Pair's Picture">
            {option && <Image src={option[4]?.optionImageUrl} />}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value5" label="Pair's Answer">
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
      {/* Option 6 */}
      <h3>Pair 6</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="key6" label="Pair's Picture">
            <Image src={option[5]?.optionImageUrl} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="value6" label="Pair's Answer">
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

export default ViewMatchingQuestion;

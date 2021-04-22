import React, { useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Divider,
  Row,
  Col,
  Image,
  InputNumber,
} from "antd";

const { Option } = Select;

const ViewFillingQuestion = (props) => {
  useEffect(() => {
    getQuestionByID();
  }, []);

  const getQuestionByID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=FILL`
      )
      .then((res) => {
        props.form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description,
          score: res.data.score,
          options: res.data.optionQuestionDTOList,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Filling Question</h2>
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
      <Form.Item name="q_img" label="Question Image">
        <Image src={props.data.questionImageUrl} />
      </Form.Item>
      <Form.Item name="score" label="Score">
        <InputNumber placeholder="Score" disabled />
      </Form.Item>
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
                    name={[field.name, "optionInputType"]}
                    fieldKey={[field.fieldKey, "optionInputType"]}
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
                        ?.optionInputType === "operator" ? (
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
                            <Select.Option value="=">Equals (=)</Select.Option>
                          </Select>
                        </Form.Item>
                      ) : props.form.getFieldsValue().options[idx]
                          ?.optionInputType === "text" ? (
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

import React, { useEffect } from "react";
import { Form, Input, Select, Divider, Row, Col, Image } from "antd";

const { Option } = Select;

const ViewFillingQuestion = (props) => {
  useEffect(() => {
    props.form.setFieldsValue({
      questionTitle: props.data.questionTitle,
      description: props.data.description,
      options: props.data.optionQuestionDTOList,
    });
  }, [
    props.data.description,
    props.data.optionQuestionDTOList,
    props.data.questionTitle,
    props.form,
  ]);

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

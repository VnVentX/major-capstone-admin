import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Row,
  Col,
  Upload,
  message,
  InputNumber,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditFillingQuestion = (props) => {
  const [imgFile, setImgFile] = useState([]);
  const [listOptionID, setListOptionID] = useState([]);

  useEffect(() => {
    getQuestionByID();
  }, []);

  const getQuestionByID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=FILL`
      )
      .then((res) => {
        let listID = [];
        props.form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description,
          score: res.data.score,
          options: res.data.optionQuestionDTOList,
        });
        setImgFile([
          {
            thumbUrl: res.data.questionImageUrl,
          },
        ]);
        res.data.optionQuestionDTOList.forEach((item) => {
          listID.push(item.id);
        });
        props.handleFillingDeleteID(listID);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeImg = ({ fileList }) => {
    setImgFile(fileList);
  };

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Filling Question</h2>
      <Divider />
      <Form.Item
        name="questionTitle"
        label="Question Title"
        rules={[{ required: true, message: "Please input a question title" }]}
      >
        <Input.TextArea
          autoSize
          maxLength="250"
          showCount
          placeholder="Question Title"
        />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea maxLength="50" showCount placeholder="Description" />
      </Form.Item>
      <Form.Item
        name="score"
        label="Score"
        rules={[
          { required: true, message: "Please input a score" },
          { type: "number", message: "Please input a number" },
        ]}
      >
        <InputNumber placeholder="Score" min={1} max={5} />
      </Form.Item>
      <Form.Item
        name="questionImg"
        label="Question Image"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture"
          fileList={imgFile}
          beforeUpload={() => false}
          onRemove={() => {
            setImgFile([]);
          }}
          onChange={(info) => {
            if (info.file.type) {
              if (info.file.type.split("/")[0] !== "image") {
                message.error(`${info.file.name} is not an image file`);
                setImgFile([]);
              } else {
                handleChangeImg(info);
              }
            }
          }}
        >
          {imgFile.length === 1 ? null : (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
      </Form.Item>
      <h2>Options</h2>
      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 5) {
                return Promise.reject(
                  new Error("At least 5 options are required")
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
                <Form.Item
                  {...field}
                  name={[field.name, "id"]}
                  fieldKey={[field.fieldKey, "id"]}
                  style={{ display: "none" }}
                >
                  <Input type="text" />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    {...field}
                    label="Input Type"
                    name={[field.name, "optionInputType"]}
                    fieldKey={[field.fieldKey, "optionInputType"]}
                    dependencies={["question"]}
                    rules={[
                      { required: true, message: "Please select input option" },
                    ]}
                  >
                    <Select placeholder="Select input type">
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
                          rules={[
                            { required: true, message: "Missing operator" },
                          ]}
                        >
                          <Select placeholder="Select Operator">
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
                          rules={[
                            { required: true, message: "Please input text" },
                          ]}
                        >
                          <Input.TextArea
                            autoSize
                            maxLength="100"
                            showCount
                            placeholder="Text"
                          />
                        </Form.Item>
                      ) : null;
                    }}
                  </Form.Item>
                  <MinusCircleOutlined
                    style={{ float: "right", color: "red" }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Col>
              </Row>
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
                style={{ marginTop: 10 }}
              >
                Add Options
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default EditFillingQuestion;

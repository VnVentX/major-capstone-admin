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

const FillingQuestion = (props) => {
  const [form] = Form.useForm();
  const [imgFile, setImgFile] = useState([]);
  const [subject, setSubject] = useState([]);
  const [unit, setUnit] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubjectByGrade();
  }, []);

  useEffect(() => {
    getUnitBySubjectID(selectedSubject);
  }, [selectedSubject]);

  const getSubjectByGrade = async () => {
    let gradeID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${gradeID}/subjects`)
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnitBySubjectID = async (subjectID) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/units`)
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeImg = ({ fileList }) => {
    setImgFile(fileList);
  };

  const onFinish = (values) => {
    let optionTextList = [];
    let optionInputTypeList = [];
    values.options.forEach((item) => {
      optionInputTypeList.push(item.option);
      if (item.text) {
        optionTextList.push(item.text.toLowerCase());
      }
      if (item.operator) {
        optionTextList.push(item.operator.toLowerCase());
      }
    });
    let formData = new FormData();
    formData.append("unitId", values.unit);
    formData.append("questionTitle", values.questionTitle);
    formData.append("questionType", props.type);
    formData.append("score", values.score);
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.q_img !== undefined && values.q_img.length !== 0) {
      formData.append("imageFile", values.q_img[0].originFileObj);
    }
    formData.append("optionInputTypeList", optionInputTypeList);
    formData.append("optionTextList", optionTextList);

    createFillQuestion(formData);
  };

  const createFillQuestion = async (formData) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/question/game/fillInBlank`,
        formData
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("Create Filling Question successfully");
        setImgFile([]);
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to create Filling Question");
      });
  };

  const handleChangeSubject = (value) => {
    setSelectedSubject(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ marginTop: 10 }}
    >
      <h2>Filling Question</h2>
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
        <Select
          showSearch
          placeholder="Select Subject"
          onChange={handleChangeSubject}
        >
          {subject?.map((item, idx) =>
            item.subjectName === "Math" ? (
              <Select.Option key={idx} value={item?.id}>
                {item?.subjectName}
              </Select.Option>
            ) : null
          )}
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
                {unit?.map((item, idx) => (
                  <Select.Option key={idx} value={item?.id}>
                    Unit {item?.unitName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item
        name="questionTitle"
        label="Question Title"
        rules={[{ required: true, message: "Please input a question title" }]}
      >
        <Input.TextArea
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
        name="q_img"
        label="Question Image"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Please select an Image" }]}
      >
        <Upload
          listType="picture"
          fileList={imgFile}
          beforeUpload={() => false}
          onChange={(info) => {
            if (info.file.type.split("/")[0] !== "image") {
              message.error(`${info.file.name} is not an image file`);
              setImgFile([]);
            } else {
              handleChangeImg(info);
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
                <Col span={12}>
                  <Form.Item
                    {...field}
                    label="Input Type"
                    name={[field.name, "option"]}
                    fieldKey={[field.fieldKey, "option"]}
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
                      return form.getFieldsValue().options[idx]?.option ===
                        "operator" ? (
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
                      ) : form.getFieldsValue().options[idx]?.option ===
                        "text" ? (
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
      <Form.Item>
        <Button
          loading={loading}
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
  );
};

export default FillingQuestion;

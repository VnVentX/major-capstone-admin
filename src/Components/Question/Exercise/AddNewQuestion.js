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
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getJwt } from "../../../helper/jwt";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

var correctCount = 0;

const AddNewQuestion = () => {
  const [counter, setCounter] = useState(0);
  const [form] = Form.useForm();
  const [audioFile, setAudioFile] = useState([]);
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
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${gradeID}/subjects`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnitBySubjectID = async (subjectID) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/units`, {
        headers: {
          Authorization: getJwt(),
        },
      })
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
  const handleChangeAudio = ({ fileList }) => {
    setAudioFile(fileList);
  };

  const handleCounter = () => {
    var count = counter;
    setCounter(count + 1);
  };

  const handleMinus = () => {
    var count = counter;
    setCounter(count - 1);
  };

  const handleCorrectCount = () => {
    correctCount = 0;
    form.getFieldsValue().options.forEach((item) => {
      if (item !== undefined) {
        if (item.correct === "true") {
          correctCount = correctCount + 1;
        }
      }
    });
  };

  const onFinish = (values) => {
    let formData = new FormData();
    let isCorrectList = [];
    values.options.forEach((item) => {
      formData.append("optionTextList", item.option);
      isCorrectList.push(item.correct);
    });
    formData.append("unitId", values.unit);
    formData.append(
      "questionTitle",
      values.questionTitle?.replace(/\s+/g, " ").trim()
    );
    formData.append("questionType", "EXERCISE");
    formData.append("score", 1);
    if (values.description) {
      formData.append(
        "description",
        values.description?.replace(/\s+/g, " ").trim()
      );
    }
    if (values.imgFile !== undefined && values.imgFile.length !== 0) {
      formData.append("imageFile", values.imgFile[0].originFileObj);
    }
    if (values.audioFile !== undefined && values.audioFile.length !== 0) {
      formData.append("audioFile", values.audioFile[0].originFileObj);
    }
    formData.append("isCorrectList", [isCorrectList]);

    createQuestion(formData);
  };

  const createQuestion = async (formData) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/question/exercise`, formData, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("Create Exercise Question successfully");
        form.setFieldsValue({
          questionTitle: "",
          description: "",
          score: "",
          options: "",
        });
        setAudioFile([]);
        setImgFile([]);
        setCounter(0);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to create Exercise Question");
      });
  };

  const handleChangeSubject = (value) => {
    setSelectedSubject(value);
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
          <Select
            showSearch
            placeholder="Select Subject"
            onChange={handleChangeSubject}
          >
            {subject?.map((item, idx) => (
              <Select.Option key={idx} value={item?.id}>
                {item?.subjectName}
              </Select.Option>
            ))}
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
          rules={[
            { required: true, message: "Please input a question title" },
            {
              pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
              message: "Can only input English characters",
            },
          ]}
        >
          <Input.TextArea
            autoSize
            maxLength="250"
            showCount
            placeholder="Question Title"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
              message: "Can only input English characters",
            },
          ]}
        >
          <Input.TextArea
            autoSize
            maxLength="50"
            showCount
            placeholder="Question Description"
          />
        </Form.Item>
        <Form.Item
          name="audioFile"
          label="Question Audio"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture"
            fileList={audioFile}
            beforeUpload={() => false}
            onChange={(info) => {
              if (info.file.type.split("/")[0] !== "audio") {
                message.error(`${info.file.name} is not an audio file`);
                setAudioFile([]);
              } else {
                handleChangeAudio(info);
              }
            }}
          >
            {audioFile.length === 1 ? null : (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="imgFile"
          label="Question Image"
          getValueFromEvent={normFile}
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
                if (!options || options.length < 2) {
                  return Promise.reject(
                    new Error("At least 2 options are required")
                  );
                }
                if (correctCount > 1) {
                  return Promise.reject(
                    new Error("Can only have one correct option")
                  );
                }
                if (correctCount === 0) {
                  return Promise.reject(
                    new Error("Must have one correct option")
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
                        { required: true, message: "Please input option" },
                        {
                          pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                          message: "Can only input English characters",
                        },
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
                      <Select
                        placeholder="Select Is Correct"
                        onChange={handleCorrectCount}
                      >
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
    </>
  );
};

export default AddNewQuestion;

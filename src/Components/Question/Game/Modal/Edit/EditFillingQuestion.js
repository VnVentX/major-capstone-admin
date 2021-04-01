import React, { useState, useEffect } from "react";
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

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const options = [
  { option: "operator", operator: "-" },
  { option: "text", text: "123" },
  { option: "text", text: "sad" },
  { option: "text", text: "asd" },
  { option: "operator", operator: "-" },
];

const EditFillingQuestion = (props) => {
  // const [audioFile, setAudioFile] = useState([
  //   {
  //     thumbUrl: getAudioThumbUrl(),
  //     url:
  //       "https://firebasestorage.googleapis.com/v0/b/mathscience-e425d.appspot.com/o/audios%2F94028074-2bc7-47df-89bb-748a475aee3fmp3?alt=media&token=44a7c7d4-cdbf-4eae-ada8-d5276e64792d",
  //   },
  // ]);
  const [imgFile, setImgFile] = useState([
    {
      thumbUrl: props.data,
    },
  ]);

  useEffect(() => {
    props.form.setFieldsValue({
      subject: "math",
      unit: "unit 1",
      question: "Fill in the blank with the correct word",
      options: options,
    });
  }, []);

  const handleChangeImg = ({ fileList }) => {
    setImgFile(fileList);
  };
  // const handleChangeAudio = ({ fileList }) => {
  //   setAudioFile(fileList);
  // };

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
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
        <Select showSearch placeholder="Select Subject">
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
        name="q_img"
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
                      return props.form.getFieldsValue().options[idx]
                        ?.option === "operator" ? (
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

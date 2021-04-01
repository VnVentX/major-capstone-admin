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
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditSwappingQuestion = (props) => {
  const [imgFile1, setImgFile1] = useState([
    {
      thumbUrl: props.data,
    },
  ]);
  const [imgFile2, setImgFile2] = useState([
    {
      thumbUrl: props.data,
    },
  ]);
  const [imgFile3, setImgFile3] = useState([
    {
      thumbUrl: props.data,
    },
  ]);
  const [imgFile4, setImgFile4] = useState([
    {
      thumbUrl: props.data,
    },
  ]);

  useEffect(() => {
    props.form.setFieldsValue({
      subject: "science",
      unit: "unit 2",
      question: "Swap the word with the right picture",
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

  const handleChangeImg1 = ({ fileList }) => {
    setImgFile1(fileList);
  };
  const handleChangeImg2 = ({ fileList }) => {
    setImgFile2(fileList);
  };
  const handleChangeImg3 = ({ fileList }) => {
    setImgFile3(fileList);
  };
  const handleChangeImg4 = ({ fileList }) => {
    setImgFile4(fileList);
  };

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Swapping Question</h2>
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
        <Input.TextArea maxLength="250" showCount placeholder="Question Text" />
      </Form.Item>
      <h2>Options</h2>
      <Divider />
      <h3>Pair 1</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key1"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile1}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile1([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile1([]);
                  } else {
                    handleChangeImg1(info);
                  }
                }
              }}
            >
              {imgFile1.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value1"
            label="Pair's Answer"
            rules={[
              {
                required: true,
                message: "Please input an answer for the picture",
              },
            ]}
          >
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <h3>Pair 2</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key2"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile2}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile2([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile2([]);
                  } else {
                    handleChangeImg2(info);
                  }
                }
              }}
            >
              {imgFile2.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value2"
            label="Pair's Answer"
            rules={[
              {
                required: true,
                message: "Please input an answer for the picture",
              },
            ]}
          >
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      {/* !Option 3 */}
      <h3>Pair 3</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key3"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile3}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile3([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile3([]);
                  } else {
                    handleChangeImg3(info);
                  }
                }
              }}
            >
              {imgFile3.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value3"
            label="Pair's Answer"
            rules={[
              {
                required: true,
                message: "Please input an answer for the picture",
              },
            ]}
          >
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      {/* Option 4 */}
      <h3>Pair 4</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key4"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile4}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile4([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile4([]);
                  } else {
                    handleChangeImg4(info);
                  }
                }
              }}
            >
              {imgFile4.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value4"
            label="Pair's Answer"
            rules={[
              {
                required: true,
                message: "Please input an answer for the picture",
              },
            ]}
          >
            <Input.TextArea
              maxLength="100"
              showCount
              placeholder="Pair's Answer"
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
    </Form>
  );
};

export default EditSwappingQuestion;
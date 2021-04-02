import React, { useState } from "react";
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

const ChoosingQuestion = (props) => {
  const [form] = Form.useForm();
  const [imgFile1, setImgFile1] = useState([]);
  const [imgFile2, setImgFile2] = useState([]);
  const [imgFile3, setImgFile3] = useState([]);
  const [imgFile4, setImgFile4] = useState([]);
  const [imgFile5, setImgFile5] = useState([]);
  const [imgFile6, setImgFile6] = useState([]);
  const [imgFile7, setImgFile7] = useState([]);
  const [imgFile8, setImgFile8] = useState([]);

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
  const handleChangeImg5 = ({ fileList }) => {
    setImgFile5(fileList);
  };
  const handleChangeImg6 = ({ fileList }) => {
    setImgFile6(fileList);
  };
  const handleChangeImg7 = ({ fileList }) => {
    setImgFile7(fileList);
  };
  const handleChangeImg8 = ({ fileList }) => {
    setImgFile8(fileList);
  };

  const onFinish = (values) => {
    const question = {
      type: props.type,
      subject: values.subject,
      unit: values.unit,
      q_name: values.question,
      options: [
        { key: values.key1[0].originFileObj, value: values.value1 },
        { key: values.key2[0].originFileObj, value: values.value2 },
        { key: values.key3[0].originFileObj, value: values.value3 },
        { key: values.key4[0].originFileObj, value: values.value4 },
        { key: values.key5[0].originFileObj, value: values.value5 },
        { key: values.key6[0].originFileObj, value: values.value6 },
        { key: values.key7[0].originFileObj, value: values.value7 },
        { key: values.key8[0].originFileObj, value: values.value8 },
      ],
    };
    // form.setFieldsValue({
    // });
    console.log(question);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ marginTop: 10 }}
    >
      <h2>Choosing Question</h2>
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
        name="questionTitle"
        label="Question Title"
        rules={[{ required: true, message: "Please input a question title" }]}
      >
        <Input.TextArea
          autoSize
          maxLength="100"
          showCount
          placeholder="Question Title"
        />
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
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile1}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile1([]);
                } else {
                  handleChangeImg1(info);
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
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile2}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile2([]);
                } else {
                  handleChangeImg2(info);
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
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile3}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile3([]);
                } else {
                  handleChangeImg3(info);
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
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile4}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile4([]);
                } else {
                  handleChangeImg4(info);
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
      {/* Option 5 */}
      <h3>Pair 5</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key5"
            label="Pair's Picture"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile5}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile5([]);
                } else {
                  handleChangeImg5(info);
                }
              }}
            >
              {imgFile5.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value5"
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
      {/* Option 6 */}
      <h3>Pair 6</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key6"
            label="Pair's Picture"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile6}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile6([]);
                } else {
                  handleChangeImg6(info);
                }
              }}
            >
              {imgFile6.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value6"
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
      {/* Option 7 */}
      <h3>Pair 7</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key7"
            label="Pair's Picture"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile7}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile7([]);
                } else {
                  handleChangeImg7(info);
                }
              }}
            >
              {imgFile7.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value7"
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
      {/* Option 8 */}
      <h3>Pair 8</h3>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="key8"
            label="Pair's Picture"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please select an image" }]}
          >
            <Upload
              listType="picture"
              fileList={imgFile8}
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file.type.split("/")[0] !== "image") {
                  message.error(`${info.file.name} is not an image file`);
                  setImgFile8([]);
                } else {
                  handleChangeImg8(info);
                }
              }}
            >
              {imgFile8.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="value8"
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
      <Form.Item>
        <Button
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

export default ChoosingQuestion;

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Divider, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditSwappingQuestion = (props) => {
  const [imgFile1, setImgFile1] = useState([]);
  const [imgFile2, setImgFile2] = useState([]);
  const [imgFile3, setImgFile3] = useState([]);
  const [imgFile4, setImgFile4] = useState([]);

  useEffect(() => {
    props.form.setFieldsValue({
      questionTitle: props.data.questionTitle,
      description: props.data.description,
      id1: props.data.optionQuestionDTOList[0].id,
      id2: props.data.optionQuestionDTOList[1].id,
      id3: props.data.optionQuestionDTOList[2].id,
      id4: props.data.optionQuestionDTOList[3].id,
      value1: props.data.optionQuestionDTOList[0].optionText,
      value2: props.data.optionQuestionDTOList[1].optionText,
      value3: props.data.optionQuestionDTOList[2].optionText,
      value4: props.data.optionQuestionDTOList[3].optionText,
    });
    setImgFile1([
      {
        thumbUrl: props.data.optionQuestionDTOList[0].optionImageUrl,
      },
    ]);
    setImgFile2([
      {
        thumbUrl: props.data.optionQuestionDTOList[1].optionImageUrl,
      },
    ]);
    setImgFile3([
      {
        thumbUrl: props.data.optionQuestionDTOList[2].optionImageUrl,
      },
    ]);
    setImgFile4([
      {
        thumbUrl: props.data.optionQuestionDTOList[3].optionImageUrl,
      },
    ]);
  }, [
    props.data.description,
    props.data.optionQuestionDTOList,
    props.data.questionTitle,
    props.form,
  ]);

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
        <Input.TextArea maxLength="50" showCount placeholder="Description" />
      </Form.Item>
      <h2>Options</h2>
      <Divider />
      <h3>Pair 1</h3>
      <Row gutter={24}>
        <Form.Item name="id1">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
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
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
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
        <Form.Item name="id2">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
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
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
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
        <Form.Item name="id3">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
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
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
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
        <Form.Item name="id4">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
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
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
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

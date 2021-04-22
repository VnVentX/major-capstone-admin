import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Divider,
  Row,
  Col,
  Upload,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditChoosingQuestion = (props) => {
  const [imgFile1, setImgFile1] = useState([]);
  const [imgFile2, setImgFile2] = useState([]);
  const [imgFile3, setImgFile3] = useState([]);
  const [imgFile4, setImgFile4] = useState([]);
  const [imgFile5, setImgFile5] = useState([]);
  const [imgFile6, setImgFile6] = useState([]);
  const [imgFile7, setImgFile7] = useState([]);
  const [imgFile8, setImgFile8] = useState([]);

  useEffect(() => {
    getQuestionByID();
  }, []);

  const getQuestionByID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=CHOOSE`
      )
      .then((res) => {
        console.log(res.data);
        props.form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description,
          score: res.data.score,
          id1: res.data.optionQuestionDTOList[0].id,
          id2: res.data.optionQuestionDTOList[1].id,
          id3: res.data.optionQuestionDTOList[2].id,
          id4: res.data.optionQuestionDTOList[3].id,
          id5: res.data.optionQuestionDTOList[4].id,
          id6: res.data.optionQuestionDTOList[5].id,
          id7: res.data.optionQuestionDTOList[6].id,
          id8: res.data.optionQuestionDTOList[7].id,
          value1: res.data.optionQuestionDTOList[0].optionText,
          value2: res.data.optionQuestionDTOList[1].optionText,
          value3: res.data.optionQuestionDTOList[2].optionText,
          value4: res.data.optionQuestionDTOList[3].optionText,
          value5: res.data.optionQuestionDTOList[4].optionText,
          value6: res.data.optionQuestionDTOList[5].optionText,
          value7: res.data.optionQuestionDTOList[6].optionText,
          value8: res.data.optionQuestionDTOList[7].optionText,
        });
        setImgFile1([
          {
            thumbUrl: res.data.optionQuestionDTOList[0].optionImageUrl,
          },
        ]);
        setImgFile2([
          {
            thumbUrl: res.data.optionQuestionDTOList[1].optionImageUrl,
          },
        ]);
        setImgFile3([
          {
            thumbUrl: res.data.optionQuestionDTOList[2].optionImageUrl,
          },
        ]);
        setImgFile4([
          {
            thumbUrl: res.data.optionQuestionDTOList[3].optionImageUrl,
          },
        ]);
        setImgFile5([
          {
            thumbUrl: res.data.optionQuestionDTOList[4].optionImageUrl,
          },
        ]);
        setImgFile6([
          {
            thumbUrl: res.data.optionQuestionDTOList[5].optionImageUrl,
          },
        ]);
        setImgFile7([
          {
            thumbUrl: res.data.optionQuestionDTOList[6].optionImageUrl,
          },
        ]);
        setImgFile8([
          {
            thumbUrl: res.data.optionQuestionDTOList[7].optionImageUrl,
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  return (
    <Form form={props.form} layout="vertical" style={{ marginTop: 10 }}>
      <h2>Choosing Question</h2>
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
        <Form.Item name="id5">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
        <Col span={12}>
          <Form.Item
            name="key5"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile5}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile5([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile5([]);
                  } else {
                    handleChangeImg5(info);
                  }
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
        <Form.Item name="id6">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
        <Col span={12}>
          <Form.Item
            name="key6"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile6}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile6([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile6([]);
                  } else {
                    handleChangeImg6(info);
                  }
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
        <Form.Item name="id7">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
        <Col span={12}>
          <Form.Item
            name="key7"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile7}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile7([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile7([]);
                  } else {
                    handleChangeImg7(info);
                  }
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
        <Form.Item name="id8">
          <Input type="text" style={{ display: "none" }} />
        </Form.Item>
        <Col span={12}>
          <Form.Item
            name="key8"
            label="Pair's Picture"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture"
              fileList={imgFile8}
              beforeUpload={() => false}
              onRemove={() => {
                setImgFile8([]);
              }}
              onChange={(info) => {
                if (info.file.type) {
                  if (info.file.type.split("/")[0] !== "image") {
                    message.error(`${info.file.name} is not an image file`);
                    setImgFile8([]);
                  } else {
                    handleChangeImg8(info);
                  }
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
    </Form>
  );
};

export default EditChoosingQuestion;

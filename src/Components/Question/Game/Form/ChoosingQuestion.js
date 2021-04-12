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
import { UploadOutlined } from "@ant-design/icons";

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
      .get(
        `https://mathscienceeducation.herokuapp.com/grade/${gradeID}/subjects`
      )
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnitBySubjectID = async (subjectID) => {
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/subject/${subjectID}/units`
      )
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
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

  const onFinish = (values) => {
    let formData = new FormData();
    let options = [
      { key: values.key1[0].originFileObj, value: values.value1 },
      { key: values.key2[0].originFileObj, value: values.value2 },
      { key: values.key3[0].originFileObj, value: values.value3 },
      { key: values.key4[0].originFileObj, value: values.value4 },
      { key: values.key5[0].originFileObj, value: values.value5 },
      { key: values.key6[0].originFileObj, value: values.value6 },
      { key: values.key7[0].originFileObj, value: values.value7 },
      { key: values.key8[0].originFileObj, value: values.value8 },
    ];
    let optionTextList = [];
    options.forEach((item) => {
      formData.append("imageFileList", item.key);
      optionTextList.push(item.value.toUpperCase());
    });

    formData.append("unitId", values.unit);
    formData.append("questionTitle", values.questionTitle);
    formData.append("questionType", props.type);
    formData.append("score", values.score);
    if (values.description) {
      formData.append("description", values.description);
    }
    formData.append("optionTextList", optionTextList);

    createChoosingQuestion(formData);
  };

  const createChoosingQuestion = async (formData) => {
    setLoading(true);
    await axios
      .post(
        "https://mathscienceeducation.herokuapp.com/question/game/others",
        formData
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("Create Choosing Question successfully");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to create Choosing Question");
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
        rules={[{ required: true, message: "Please input a score" }]}
      >
        <InputNumber placeholder="Score" min={1} />
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

export default ChoosingQuestion;

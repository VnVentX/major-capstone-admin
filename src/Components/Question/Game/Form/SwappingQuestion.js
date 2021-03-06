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
import { UploadOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../helper/jwt";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const SwappingQuestion = (props) => {
  const [form] = Form.useForm();
  const [imgFile1, setImgFile1] = useState([]);
  const [imgFile2, setImgFile2] = useState([]);
  const [imgFile3, setImgFile3] = useState([]);
  const [imgFile4, setImgFile4] = useState([]);
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

  const onFinish = (values) => {
    let formData = new FormData();
    let options = [
      { key: values.key1[0].originFileObj, value: values.value1 },
      { key: values.key2[0].originFileObj, value: values.value2 },
      { key: values.key3[0].originFileObj, value: values.value3 },
      { key: values.key4[0].originFileObj, value: values.value4 },
    ];
    options.forEach((item) => {
      formData.append("imageFileList", item.key);
      formData.append("optionTextList", item.value.toLowerCase());
    });

    formData.append("unitId", values.unit);
    formData.append("questionTitle", values.questionTitle);
    formData.append("questionType", props.type);
    formData.append("score", 1);
    if (values.description) {
      formData.append("description", values.description);
    }

    createSwapQuestion(formData);
  };

  const createSwapQuestion = async (formData) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/question/game/others`,
        formData,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("Create Swapping Question successfully");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to create Swapping Question");
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
        <Input.TextArea maxLength="50" showCount placeholder="Description" />
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

export default SwappingQuestion;

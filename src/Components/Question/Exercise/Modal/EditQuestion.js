import React, { useState } from "react";
import axios from "axios";
import { getAudioThumbUrl } from "../../../../helper/audioThumbUrl";
import {
  Select,
  Form,
  Modal,
  Button,
  Input,
  Divider,
  Row,
  Col,
  Upload,
  message,
  Tooltip,
} from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

let correctCount = 0;

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState([]);
  const [imgFile, setImgFile] = useState([]);
  const [listOptionID, setListOptionID] = useState([]);

  const getQuestionByID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=EXERCISE`
      )
      .then((res) => {
        let listID = [];
        form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description?.replace(/\s+/g, " ").trim(),
          score: res.data.score,
          options: res.data.optionQuestionDTOList,
        });
        setAudioFile([
          {
            thumbUrl: getAudioThumbUrl(),
            url: props.data.questionAudioUrl,
          },
        ]);
        setImgFile([
          {
            thumbUrl: props.data.questionImageUrl,
          },
        ]);
        setCounter(res.data.optionQuestionDTOList.length);
        res.data.optionQuestionDTOList.forEach((item) => {
          listID.push(item.id);
          if (item.correct === true) {
            correctCount = correctCount + 1;
          }
        });
        setListOptionID([...listID]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}/exercise`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (props.getQuestionByUnitID) {
          props.getQuestionByUnitID(props.unitID);
        }
        if (props.getQuestionByExerciseID) {
          props.getQuestionByExerciseID();
        }
        setLoading(false);
        handleCancel();
        message.success("Edit Exercise Question successfully");
        form.setFieldsValue({
          questionTitle: "",
          description: "",
          score: "",
          options: "",
        });
        setAudioFile([]);
        setImgFile([]);
        setCounter(0);
        correctCount = 0;
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to edit Exercise Question");
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
        if (item.correct === true) {
          correctCount = correctCount + 1;
        }
      }
    });
  };

  const onFinish = (values) => {
    let optionIdList = [];
    let optionTextList = [];
    let isCorrectList = [];
    let optionIdDeleteList = [];
    values.options.forEach((item) => {
      if (item.id === undefined) {
        optionIdList.push(0);
      } else {
        optionIdList.push(item.id);
      }
      optionTextList.push(item.optionText);
      isCorrectList.push(item.correct);
    });
    //List Option ID want to delete
    optionIdDeleteList = listOptionID.filter(
      (val) => !optionIdList.includes(val)
    );
    let formData = new FormData();
    formData.append("id", props.data.id);
    formData.append("questionTitle", values.questionTitle);
    formData.append("score", 1);
    if (values.description) {
      formData.append(
        "description",
        values.description?.replace(/\s+/g, " ").trim()
      );
    }
    if (values.imgFile !== undefined && values.imgFile.length !== 0) {
      formData.append("imageFile", values.imgFile[0].originFileObj);
    } else if (values.imgFile !== undefined && values.imgFile.length === 0) {
      let fakeFile = new File([""], "fakeFile", { type: "image/png" });
      formData.append("imageFile", fakeFile);
    }
    if (values.audioFile !== undefined && values.audioFile.length !== 0) {
      formData.append("audioFile", values.audioFile[0].originFileObj);
    } else if (
      values.audioFile !== undefined &&
      values.audioFile.length === 0
    ) {
      let fakeFile = new File([""], "fakeFile", { type: "audio/mpeg" });
      formData.append("audioFile", fakeFile);
    }
    formData.append("isCorrectList", [isCorrectList]);
    formData.append("optionTextList", optionTextList);
    formData.append("optionIdList", optionIdList);
    if (optionIdDeleteList.length === 0) {
      formData.append("optionIdDeleteList", []);
    } else {
      formData.append("optionIdDeleteList", optionIdDeleteList);
    }
    editQuestion(formData);
  };

  const showModal = () => {
    setVisible(true);
    getQuestionByID();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    correctCount = 0;
  };

  return (
    <div>
      <Tooltip title="Edit Question">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        visible={visible}
        width={"45vw"}
        title="Edit Question"
        confirmLoading={loading}
        okText="Update"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <h1>Question</h1>
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
            <Input.TextArea
              autoSize
              maxLength="50"
              showCount
              placeholder="Description"
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
          <h1>Options</h1>
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
            {(fields, { add, remove }, { errors }) => {
              return (
                <div>
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
                          label={`Option ${idx + 1}`}
                          name={[field.name, "optionText"]}
                          fieldKey={[field.fieldKey, "optionText"]}
                          rules={[
                            { required: true, message: "Please input option!" },
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
                          rules={[
                            { required: true, message: "Missing correct" },
                          ]}
                        >
                          <Select
                            placeholder="Select Is Correct"
                            onChange={handleCorrectCount}
                          >
                            <Select.Option value={true}>True</Select.Option>
                            <Select.Option value={false}>False</Select.Option>
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
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default EditQuestion;

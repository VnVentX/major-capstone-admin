import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAudioThumbUrl } from "../../../../helper/audioThumbUrl";
import {
  Select,
  Form,
  Modal,
  Button,
  Input,
  InputNumber,
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

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState([
    {
      thumbUrl: getAudioThumbUrl(),
      url: props.data.questionAudioUrl,
    },
  ]);
  const [imgFile, setImgFile] = useState([
    {
      thumbUrl: props.data.questionImageUrl,
    },
  ]);

  useEffect(() => {
    const getQuestionByID = async () => {
      await axios
        .get(
          `https://mathscienceeducation.herokuapp.com/question/${props.data.id}?questionType=EXERCISE`
        )
        .then((res) => {
          form.setFieldsValue({
            questionTitle: res.data.questionTitle,
            description: res.data.description,
            score: res.data.score,
            options: res.data.optionQuestionDTOList,
          });
          setCounter(res.data.optionQuestionDTOList.length);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getQuestionByID();
  }, [form, props.data.id]);

  const editQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/question/${props.data.id}/exercise`,
        formData
      )
      .then((res) => {
        console.log(res);
        props.getQuestionByUnitID(props.unitID);
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
    console.log(form.getFieldsValue().options);
    let count = 0;
    form.getFieldsValue().options.forEach((item) => {
      if (item !== undefined) {
        if (item.correct === true) {
          count = count + 1;
        }
      }
    });
    setCorrectCount(count);
    console.log(count);
  };

  const onFinish = (values) => {
    let optionIdList = [];
    let optionTextList = [];
    let isCorrectList = [];
    values.options.forEach((item) => {
      optionIdList.push(item.id);
      optionTextList.push(item.optionText);
      isCorrectList.push(item.correct);
    });
    let formData = new FormData();
    formData.append("id", props.data.id);
    formData.append("questionTitle", values.questionTitle);
    formData.append("score", values.score);
    formData.append("description", values.description);
    if (values.imgFile !== undefined && values.imgFile.length !== 0) {
      formData.append("imageFile", values.imgFile[0].originFileObj);
    }
    if (values.audioFile !== undefined && values.audioFile.length !== 0) {
      formData.append("audioFile", values.audioFile[0].originFileObj);
    }
    formData.append("isCorrectList", [isCorrectList]);
    formData.append("optionTextList", optionTextList);
    formData.append("optionIdList", optionIdList);

    editQuestion(formData);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
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
            ]}
          >
            <Input.TextArea
              autoSize
              maxLength="250"
              showCount
              placeholder="Question Title"
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              autoSize
              maxLength="50"
              showCount
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            name="score"
            label="Score"
            rules={[{ required: true, message: "Please input a score" }]}
          >
            <InputNumber placeholder="Score" min={1} />
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

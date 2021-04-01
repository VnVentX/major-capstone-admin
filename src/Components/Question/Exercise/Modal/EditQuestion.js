import React, { useState, useEffect } from "react";
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

const options = [
  {
    option: "A",
    correct: "True",
  },
  {
    option: "B",
    correct: "False",
  },
];

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [audioFile, setAudioFile] = useState([
    {
      thumbUrl: getAudioThumbUrl(),
      url:
        "https://firebasestorage.googleapis.com/v0/b/mathscience-e425d.appspot.com/o/audios%2F94028074-2bc7-47df-89bb-748a475aee3fmp3?alt=media&token=44a7c7d4-cdbf-4eae-ada8-d5276e64792d",
    },
  ]);
  const [imgFile, setImgFile] = useState([
    {
      thumbUrl: props.data.q_img,
    },
  ]);

  useEffect(() => {
    form.setFieldsValue({
      question: props.data.q_name,
      options: options,
    });
    setCounter(options.length);
  }, []);

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

  const onFinish = (event) => {
    console.log(event);
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
        okText="Update"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
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
            name="question"
            label="Question Text"
            rules={[{ required: true, message: "Please input a question" }]}
          >
            <Input.TextArea
              autoSize
              maxLength="100"
              showCount
              placeholder="Question Text"
            />
          </Form.Item>
          <Form.Item
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
          <h1>Options</h1>
          <Form.List name="options">
            {(fields, { add, remove }, { errors }) => {
              return (
                <div>
                  {fields.map((field, idx) => (
                    <Row gutter={24} key={idx}>
                      <Divider />
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label={`Option ${idx + 1}`}
                          name={[field.name, "option"]}
                          fieldKey={[field.fieldKey, "option"]}
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
                          <Select placeholder="Select Is Correct">
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

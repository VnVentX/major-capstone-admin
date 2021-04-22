import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Image,
  Tooltip,
} from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const ViewQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [playing, toggle] = useAudio(props.data.questionAudioUrl);

  const getQuestionByID = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=EXERCISE`
      )
      .then((res) => {
        form.setFieldsValue({
          questionTitle: res.data.questionTitle,
          description: res.data.description,
          score: res.data.score,
          options: res.data.optionQuestionDTOList,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    setVisible(true);
    getQuestionByID();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Tooltip title="View Question">
        <Button type="primary" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        visible={visible}
        width={"45vw"}
        title="View Question"
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <h1>Question</h1>
          <Divider />
          <Form.Item name="questionTitle" label="Question Title">
            <Input.TextArea
              autoSize
              maxLength="250"
              showCount
              placeholder="Question Title"
              disabled
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              autoSize
              maxLength="50"
              showCount
              placeholder="Description"
              disabled
            />
          </Form.Item>
          <Form.Item name="score" label="Score">
            <InputNumber placeholder="Score" disabled />
          </Form.Item>
          <Form.Item name="q_audio" label="Question Audio">
            <div onClick={toggle}>
              {playing ? (
                <Button icon={<PauseCircleOutlined />}>Pause</Button>
              ) : (
                <Button icon={<PlayCircleOutlined />}>Play</Button>
              )}
            </div>
          </Form.Item>
          <Form.Item name="q_img" label="Question Image">
            <Image src={props.data.questionImageUrl} />
          </Form.Item>
          <h1>Options</h1>
          <Form.List name="options">
            {(fields) => {
              return (
                <div>
                  {fields.map((field, idx) => (
                    <Row gutter={24} key={idx}>
                      <Divider />
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label={`Option ${idx + 1}`}
                          name={[field.name, "optionText"]}
                          fieldKey={[field.fieldKey, "optionText"]}
                        >
                          <Input.TextArea
                            autoSize
                            maxLength="100"
                            showCount
                            placeholder="Option Text"
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label="Is Correct"
                          name={[field.name, "correct"]}
                          fieldKey={[field.fieldKey, "correct"]}
                        >
                          <Select placeholder="Select Is Correct" disabled>
                            <Select.Option value={true}>True</Select.Option>
                            <Select.Option value={false}>False</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewQuestion;

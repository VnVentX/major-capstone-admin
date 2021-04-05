import React, { useState, useEffect } from "react";
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

  const [playing, toggle] = useAudio(
    "https://firebasestorage.googleapis.com/v0/b/mathscience-e425d.appspot.com/o/audios%2F94028074-2bc7-47df-89bb-748a475aee3fmp3?alt=media&token=44a7c7d4-cdbf-4eae-ada8-d5276e64792d"
  );

  useEffect(() => {
    form.setFieldsValue({
      questionTitle: props.data.q_name,
      description: "Unit 1 Question",
      score: 10,
      options: options,
    });
  }, []);

  const showModal = () => {
    setVisible(true);
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
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
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
                          name={[field.name, "option"]}
                          fieldKey={[field.fieldKey, "option"]}
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
                            <Select.Option value="true">True</Select.Option>
                            <Select.Option value="false">False</Select.Option>
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

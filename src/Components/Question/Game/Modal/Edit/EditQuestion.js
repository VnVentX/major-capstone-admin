import React, { useState } from "react";
import { Form, Modal, Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditFillingQuestion from "./EditFillingQuestion";
import EditChoosingQuestion from "./EditChoosingQuestions";
import EditMatchingQuestion from "./EditMatchingQuestion";
import EditSwappingQuestion from "./EditSwappingQuestion";

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    if (props.data?.type === "FILL") {
      fillingQuestionSubmit(values);
    } else if (props.data?.type === "CHOOSE") {
      choosingQuestionSubmit(values);
    } else if (props.data?.type === "MATCH") {
      matchingQuestionSubmit(values);
    } else if (props.data?.type === "SWAP") {
      swappingQuestionSubmit(values);
    }
  };

  const fillingQuestionSubmit = (values) => {
    const question = {
      id: props.data.key,
      subject: values.subject,
      unit: values.unit,
      q_title: values.questionTitle,
      q_name: values.question,
      q_audio: values.q_audio ? values.q_audio : "",
      q_img: values.q_img,
      options: values.options,
    };
    console.log(question);
  };

  const choosingQuestionSubmit = (values) => {
    const question = {
      id: props.data.key,
      subject: values.subject,
      unit: values.unit,
      q_title: values.questionTitle,
      q_name: values.question,
      options: [
        {
          key: values.key1[0] ? values.key1[0].originFileObj : null,
          value: values.value1,
        },
        {
          key: values.key2[0] ? values.key2[0].originFileObj : null,
          value: values.value2,
        },
        {
          key: values.key3[0] ? values.key3[0].originFileObj : null,
          value: values.value3,
        },
        {
          key: values.key4[0] ? values.key4[0].originFileObj : null,
          value: values.value4,
        },
        {
          key: values.key5[0] ? values.key5[0].originFileObj : null,
          value: values.value5,
        },
        {
          key: values.key6[0] ? values.key6[0].originFileObj : null,
          value: values.value6,
        },
        {
          key: values.key7[0] ? values.key7[0].originFileObj : null,
          value: values.value7,
        },
        {
          key: values.key8[0] ? values.key8[0].originFileObj : null,
          value: values.value8,
        },
      ],
    };
    console.log(question);
  };
  const swappingQuestionSubmit = (values) => {
    const question = {
      id: props.data.key,
      subject: values.subject,
      unit: values.unit,
      q_title: values.questionTitle,
      q_name: values.question,
      options: [
        {
          key: values.key1[0] ? values.key1[0].originFileObj : null,
          value: values.value1,
        },
        {
          key: values.key2[0] ? values.key2[0].originFileObj : null,
          value: values.value2,
        },
        {
          key: values.key3[0] ? values.key3[0].originFileObj : null,
          value: values.value3,
        },
        {
          key: values.key4[0] ? values.key4[0].originFileObj : null,
          value: values.value4,
        },
      ],
    };
    console.log(question);
  };

  const matchingQuestionSubmit = (values) => {
    const question = {
      id: props.key,
      subject: values.subject,
      unit: values.unit,
      q_title: values.questionTitle,
      q_name: values.question,
      options: [
        {
          key: values.key1[0] ? values.key1[0].originFileObj : null,
          value: values.value1,
        },
        {
          key: values.key2[0] ? values.key2[0].originFileObj : null,
          value: values.value2,
        },
        {
          key: values.key3[0] ? values.key3[0].originFileObj : null,
          value: values.value3,
        },
        {
          key: values.key4[0] ? values.key4[0].originFileObj : null,
          value: values.value4,
        },
        {
          key: values.key5[0] ? values.key5[0].originFileObj : null,
          value: values.value5,
        },
        {
          key: values.key6[0] ? values.key6[0].originFileObj : null,
          value: values.value6,
        },
      ],
    };
    console.log(question);
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
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        {props.data?.type === "MATCH" ? (
          <EditMatchingQuestion form={form} />
        ) : props.data?.type === "FILL" ? (
          <EditFillingQuestion form={form} />
        ) : props.data?.type === "SWAP" ? (
          <EditSwappingQuestion form={form} />
        ) : props.data?.type === "CHOOSE" ? (
          <EditChoosingQuestion form={form} />
        ) : null}
      </Modal>
    </div>
  );
};

export default EditQuestion;

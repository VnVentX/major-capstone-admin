import React, { useState } from "react";
import axios from "axios";
import { Form, Modal, Tooltip, Button, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ViewMatchingQuestion from "./ViewMatchingQuestion";
import ViewChoosingQuestion from "./ViewChoosingQuestion";
import ViewFillingQuestion from "./ViewFillingQuestion";
import ViewSwappingQuestion from "./ViewSwappingQuestion";

const ViewQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [questionData, setQuestionData] = useState([]);

  const getQuestionChoosing = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=CHOOSE`
      )
      .then((res) => {
        setQuestionData(res.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to view this question");
      });
  };
  const getQuestionFilling = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=FILL`
      )
      .then((res) => {
        setQuestionData(res.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to view this question");
      });
  };
  const getQuestionMatching = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=MATCH`
      )
      .then((res) => {
        setQuestionData(res.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to view this question");
      });
  };
  const getQuestionSwapping = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=SWAP`
      )
      .then((res) => {
        setQuestionData(res.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to view this question");
      });
  };
  const showModal = async () => {
    if (props.data?.questionType === "CHOOSE") {
      await getQuestionChoosing();
    } else if (props.data?.questionType === "FILL") {
      await getQuestionFilling();
    } else if (props.data?.questionType === "MATCH") {
      await getQuestionMatching();
    } else if (props.data?.questionType === "SWAP") {
      await getQuestionSwapping();
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
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
        cancelText="Cancel"
        onCancel={handleCancel}
        footer={null}
      >
        {props.data?.questionType === "MATCH" ? (
          <ViewMatchingQuestion form={form} data={questionData} />
        ) : props.data?.questionType === "CHOOSE" ? (
          <ViewChoosingQuestion form={form} data={questionData} />
        ) : props.data?.questionType === "FILL" ? (
          <ViewFillingQuestion form={form} data={questionData} />
        ) : props.data?.questionType === "SWAP" ? (
          <ViewSwappingQuestion form={form} data={questionData} />
        ) : null}
      </Modal>
    </div>
  );
};

export default ViewQuestion;

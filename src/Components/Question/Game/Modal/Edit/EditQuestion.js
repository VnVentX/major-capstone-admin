import React, { useState } from "react";
import axios from "axios";
import { Form, Modal, Tooltip, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditFillingQuestion from "./EditFillingQuestion";
import EditChoosingQuestion from "./EditChoosingQuestions";
import EditMatchingQuestion from "./EditMatchingQuestion";
import EditSwappingQuestion from "./EditSwappingQuestion";

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const editQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/question/${props.data.id}/game/others`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (props.getQuestionByUnitID) {
          props.getQuestionByUnitID(props.unitID);
        }
        if (props.getQuestionByGameID) {
          props.getQuestionByGameID();
        }
        setLoading(false);
        handleCancel();
        message.success("Edit Question successfully");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to edit Question");
      });
  };

  const editFillQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/question/${props.data.id}/game/fillInBlank`,
        formData
      )
      .then((res) => {
        console.log(res);
        if (props.getQuestionByUnitID) {
          props.getQuestionByUnitID(props.unitID);
        }
        if (props.getQuestionByGameID) {
          props.getQuestionByGameID();
        }
        setLoading(false);
        handleCancel();
        message.success("Edit Question successfully");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to edit Question");
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    if (props.data?.questionType === "FILL") {
      fillingQuestionSubmit(values);
    } else if (props.data?.questionType === "CHOOSE") {
      choosingQuestionSubmit(values);
    } else if (props.data?.questionType === "MATCH") {
      matchingQuestionSubmit(values);
    } else if (props.data?.questionType === "SWAP") {
      swappingQuestionSubmit(values);
    }
  };

  const fillingQuestionSubmit = (values) => {
    let optionIdList = [];
    let optionInputTypeList = [];
    let optionTextList = [];
    values.options.forEach((item) => {
      optionIdList.push(item.id);
      optionInputTypeList.push(item.optionInputType.toLowerCase());
      if (item.text) {
        optionTextList.push(item.text.toLowerCase());
      }
      if (item.operator) {
        optionTextList.push(item.operator.toLowerCase());
      }
    });
    let formData = new FormData();
    formData.append("id", props.data.id);
    formData.append("questionTitle", values.questionTitle);
    formData.append("score", values.score);
    formData.append("description", values.description);
    if (values.imgFile !== undefined && values.imgFile.length !== 0) {
      formData.append("imageFile", values.imgFile[0].originFileObj);
    }
    formData.append("optionInputTypeList", optionInputTypeList);
    formData.append("optionTextList", optionTextList);
    formData.append("optionIdList", optionIdList);

    editFillQuestion(formData);
  };

  const choosingQuestionSubmit = (values) => {
    var fakeFile = new File([""], "fakeFile", { type: "text/html" });
    let formData = new FormData();
    let options = [
      {
        id: values.id1,
        key:
          values.key1 && values.key1.length !== 0
            ? values.key1[0]?.originFileObj
            : null,
        value: values.value1,
      },
      {
        id: values.id2,
        key:
          values.key2 && values.key2.length !== 0
            ? values.key2[0]?.originFileObj
            : null,
        value: values.value2,
      },
      {
        id: values.id3,
        key:
          values.key3 && values.key3.length !== 0
            ? values.key3[0]?.originFileObj
            : null,
        value: values.value3,
      },
      {
        id: values.id4,
        key:
          values.key4 && values.key4.length !== 0
            ? values.key4[0]?.originFileObj
            : null,
        value: values.value4,
      },
      {
        id: values.id5,
        key:
          values.key5 && values.key5.length !== 0
            ? values.key5[0]?.originFileObj
            : null,
        value: values.value5,
      },
      {
        id: values.id6,
        key:
          values.key6 && values.key6.length !== 0
            ? values.key6[0]?.originFileObj
            : null,
        value: values.value6,
      },
      {
        id: values.id7,
        key:
          values.key7 && values.key7.length !== 0
            ? values.key7[0]?.originFileObj
            : null,
        value: values.value7,
      },
      {
        id: values.id8,
        key:
          values.key8 && values.key8.length !== 0
            ? values.key8[0]?.originFileObj
            : null,
        value: values.value8,
      },
    ];
    let optionTextList = [];
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      optionTextList.push(item.value.toUpperCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    formData.append("description", values.description);
    formData.append("score", values.score);
    formData.append("optionIdList", optionIdList);
    formData.append("optionTextList", optionTextList);

    editQuestion(formData);
  };

  const swappingQuestionSubmit = (values) => {
    let fakeFile = new File([""], "fakeFile", { type: "text/html" });
    let formData = new FormData();
    let options = [
      {
        id: values.id1,
        key:
          values.key1 && values.key1.length !== 0
            ? values.key1[0]?.originFileObj
            : null,
        value: values.value1,
      },
      {
        id: values.id2,
        key:
          values.key2 && values.key2.length !== 0
            ? values.key2[0]?.originFileObj
            : null,
        value: values.value2,
      },
      {
        id: values.id3,
        key:
          values.key3 && values.key3.length !== 0
            ? values.key3[0]?.originFileObj
            : null,
        value: values.value3,
      },
      {
        id: values.id4,
        key:
          values.key4 && values.key4.length !== 0
            ? values.key4[0]?.originFileObj
            : null,
        value: values.value4,
      },
    ];
    let optionTextList = [];
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      optionTextList.push(item.value.toUpperCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    formData.append("description", values.description);
    formData.append("score", values.score);
    formData.append("optionIdList", optionIdList);
    formData.append("optionTextList", optionTextList);

    editQuestion(formData);
  };

  const matchingQuestionSubmit = (values) => {
    let fakeFile = new File([""], "fakeFile", { type: "text/html" });
    let formData = new FormData();
    let options = [
      {
        id: values.id1,
        key:
          values.key1 && values.key1.length !== 0
            ? values.key1[0]?.originFileObj
            : null,
        value: values.value1,
      },
      {
        id: values.id2,
        key:
          values.key2 && values.key2.length !== 0
            ? values.key2[0]?.originFileObj
            : null,
        value: values.value2,
      },
      {
        id: values.id3,
        key:
          values.key3 && values.key3.length !== 0
            ? values.key3[0]?.originFileObj
            : null,
        value: values.value3,
      },
      {
        id: values.id4,
        key:
          values.key4 && values.key4.length !== 0
            ? values.key4[0]?.originFileObj
            : null,
        value: values.value4,
      },
      {
        id: values.id5,
        key:
          values.key5 && values.key5.length !== 0
            ? values.key5[0]?.originFileObj
            : null,
        value: values.value5,
      },
      {
        id: values.id6,
        key:
          values.key6 && values.key6.length !== 0
            ? values.key6[0]?.originFileObj
            : null,
        value: values.value6,
      },
    ];
    let optionTextList = [];
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      optionTextList.push(item.value.toUpperCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    formData.append("description", values.description);
    formData.append("score", values.score);
    formData.append("optionIdList", optionIdList);
    formData.append("optionTextList", optionTextList);

    editQuestion(formData);
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
        {props.data?.questionType === "MATCH" ? (
          <EditMatchingQuestion form={form} data={props.data} />
        ) : props.data?.questionType === "FILL" ? (
          <EditFillingQuestion form={form} data={props.data} />
        ) : props.data?.questionType === "SWAP" ? (
          <EditSwappingQuestion form={form} data={props.data} />
        ) : props.data?.questionType === "CHOOSE" ? (
          <EditChoosingQuestion form={form} data={props.data} />
        ) : null}
      </Modal>
    </div>
  );
};

export default EditQuestion;

import React, { useState } from "react";
import axios from "axios";
import { Form, Modal, Tooltip, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import EditFillingQuestion from "./EditFillingQuestion";
import EditChoosingQuestion from "./EditChoosingQuestions";
import EditMatchingQuestion from "./EditMatchingQuestion";
import EditSwappingQuestion from "./EditSwappingQuestion";
import { getJwt } from "../../../../../helper/jwt";

const EditQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOptionID, setListOptionID] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const handleFillingDeleteID = (values) => {
    setListOptionID([...values]);
  };
  const editQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}/game/others`,
        formData,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
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
        if (e.response.data === "CANNOT UPDATE") {
          message.error(
            "This question is currently being used, please check again"
          );
        } else {
          message.error("Fail to edit this Question");
        }
      });
  };
  const editFillQuestion = async (formData) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}/game/fillInBlank`,
        formData,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
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
        setListOptionID([]);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        if (e.response.data === "CANNOT UPDATE") {
          message.error(
            "This question is currently being used, please check again"
          );
        } else {
          message.error("Fail to edit this Question");
        }
      });
  };
  const getQuestionChoosing = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/question/${props.data?.id}?questionType=CHOOSE`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
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
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=FILL`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        let listID = [];
        setQuestionData(res.data);
        res.data.optionQuestionDTOList?.forEach((item) => {
          listID.push(item.id);
        });
        handleFillingDeleteID(listID);
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
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=MATCH`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
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
        `${process.env.REACT_APP_BASE_URL}/question/${props.data.id}?questionType=SWAP`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
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
    let formData = new FormData();
    let optionIdList = [];
    let optionInputTypeList = [];
    let optionIdDeleteList = [];
    values.options.forEach((item) => {
      if (item.id === undefined) {
        optionIdList.push(0);
      } else {
        optionIdList.push(item.id);
      }
      optionInputTypeList.push(item.optionInputType.toLowerCase());
      if (item.text) {
        formData.append("optionTextList", item.text.toLowerCase());
      }
      if (item.operator) {
        formData.append("optionTextList", item.operator.toLowerCase());
      }
    });
    //List Option ID want to delete
    optionIdDeleteList = listOptionID.filter(
      (val) => !optionIdList.includes(val)
    );
    formData.append("id", props.data.id);
    formData.append("questionTitle", values.questionTitle);
    formData.append("score", 1);
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.questionImg !== undefined && values.questionImg.length !== 0) {
      formData.append("imageFile", values.questionImg[0].originFileObj);
    }
    formData.append("optionInputTypeList", optionInputTypeList);
    formData.append("optionIdList", optionIdList);
    if (optionIdDeleteList.length === 0) {
      formData.append("optionIdDeleteList", []);
    } else {
      formData.append("optionIdDeleteList", optionIdDeleteList);
    }
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
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      formData.append("optionTextList", item.value.toLowerCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    if (values.description) {
      formData.append("description", values.description);
    }
    formData.append("score", 1);
    formData.append("optionIdList", optionIdList);

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
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      formData.append("optionTextList", item.value.toLowerCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    if (values.description) {
      formData.append("description", values.description);
    }
    formData.append("score", 1);
    formData.append("optionIdList", optionIdList);

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
    let optionIdList = [];
    options.forEach((item) => {
      if (item.key === null) {
        formData.append("imageFileList", fakeFile);
      } else {
        formData.append("imageFileList", item.key);
      }
      formData.append("optionTextList", item.value.toLowerCase());
      optionIdList.push(item.id);
    });
    formData.append("questionTitle", values.questionTitle);
    if (values.description) {
      formData.append("description", values.description);
    }
    formData.append("score", 1);
    formData.append("optionIdList", optionIdList);

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
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
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
          <EditMatchingQuestion form={form} data={questionData} />
        ) : props.data?.questionType === "FILL" ? (
          <EditFillingQuestion
            form={form}
            data={questionData}
            handleFillingDeleteID={handleFillingDeleteID}
          />
        ) : props.data?.questionType === "SWAP" ? (
          <EditSwappingQuestion form={form} data={questionData} />
        ) : props.data?.questionType === "CHOOSE" ? (
          <EditChoosingQuestion form={form} data={questionData} />
        ) : null}
      </Modal>
    </div>
  );
};

export default EditQuestion;

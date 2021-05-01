import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ViewQuestion from "../../../../Question/Exercise/Modal/ViewQuestion";
import { getJwt } from "../../../../../helper/jwt";

const selectingQuestionCol = [
  {
    title: "Question",
    width: "90%",
    dataIndex: "questionTitle",
  },
  {
    title: "Action",
    align: "center",
    render: (record) => (
      <Space size="middle">
        <ViewQuestion data={record} />
      </Space>
    ),
  },
];

var resArr = [];

const AddQuestion = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);

  const getQuestionByUnitID = async () => {
    let unitID = window.location.pathname.split("/")[4];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/unit/${unitID}/questions?isExercise=true`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        resArr = Array.from(res.data);
        var ids = new Set(props.data.map(({ id }) => id));
        resArr = resArr.filter(({ id }) => !ids.has(id));
        setData(resArr);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addQuestion = async () => {
    setLoading(true);
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/exerciseGameQuestion`,
        {
          exercise: true,
          exerciseId: exerciseID,
          questionIds: selectedRowKeys,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.getQuestionByExerciseID();
        setSelectedRowKeys([]);
        setLoading(false);
        handleCancel();
        setSelectedRowKeys([]);
        message.success("Add Question successfully");
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        if (e.response.data === "EXCEED LIMIT") {
          message.error(
            "One exercise can only have 10 questions, Please check your input!"
          );
        } else {
          message.error("Fail to add Question");
        }
        console.log(e);
        setLoading(false);
      });
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showModal = () => {
    getQuestionByUnitID();
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = () => {
    addQuestion();
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Add Question from Question Bank
      </Button>
      <Modal
        title="Add Questions"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          selectedRowKeys.length === 0 ? (
            <Button key="submit" type="primary" disabled>
              Add Question
            </Button>
          ) : (
            <Button
              key="submit"
              type="primary"
              onClick={onFinish}
              loading={loading}
            >
              Add Question
            </Button>
          ),
        ]}
      >
        <Form name="add-questions" layout="vertical">
          <Table
            rowSelection={rowSelection}
            columns={selectingQuestionCol}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </Form>
      </Modal>
    </>
  );
};

export default AddQuestion;

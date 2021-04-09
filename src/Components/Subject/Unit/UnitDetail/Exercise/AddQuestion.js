import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ViewQuestion from "../../../../Question/Exercise/Modal/ViewQuestion";

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

  useEffect(() => {
    const getQuestionByUnitID = async () => {
      let unitID = window.location.pathname.split("/")[4];
      await axios
        .get(
          `https://mathscienceeducation.herokuapp.com/unit/${unitID}/questions?isExercise=true`
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
    getQuestionByUnitID();
  }, [props.data]);

  const addQuestion = async () => {
    setLoading(true);
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .post("https://mathscienceeducation.herokuapp.com/exerciseGameQuestion", {
        exercise: true,
        exerciseId: exerciseID,
        questionIds: selectedRowKeys,
      })
      .then((res) => {
        console.log(res);
        props.getQuestionByExerciseID();
        setSelectedRowKeys([]);
        setLoading(false);
        handleCancel();
        message.success("Add Question successfully");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to add Question");
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

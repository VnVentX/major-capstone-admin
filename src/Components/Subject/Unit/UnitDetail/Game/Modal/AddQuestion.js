import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ViewQuestion from "../../../../../Question/Game/Modal/View/ViewQuestion";
import { getJwt } from "../../../../../../helper/jwt";

const selectingQuestionCol = [
  {
    title: "Question",
    width: "60%",
    dataIndex: "questionTitle",
  },
  {
    title: "Type",
    dataIndex: "questionType",
  },
  {
    title: "Action",
    key: "x",
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
    setLoading(true);
    let unitID = window.location.pathname.split("/")[4];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/unit/${unitID}/questions?isExercise=false`,
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
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const addQuestion = async () => {
    setLoading(true);
    let gameID = window.location.pathname.split("/")[6];
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/exerciseGameQuestion`,
        {
          exercise: false,
          gameId: gameID,
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
        props.getQuestionByGameID();
        setSelectedRowKeys([]);
        setLoading(false);
        handleCancel();
        setSelectedRowKeys([]);
        message.success("Add Question successfully");
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
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
        width={800}
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
            loading={loading}
          />
        </Form>
      </Modal>
    </>
  );
};

export default AddQuestion;

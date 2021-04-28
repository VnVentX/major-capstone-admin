import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Space, Select, message } from "antd";
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

const AddTestQuestion = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");

  useEffect(() => {
    const getQuestionByUnitID = async (unitID) => {
      setTableLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/unit/${unitID}/questions?isExercise=true`
        )
        .then((res) => {
          resArr = Array.from(res.data);
          var ids = new Set(props.data.map(({ id }) => id));
          resArr = resArr.filter(({ id }) => !ids.has(id));
          setData(resArr);
          setTableLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setTableLoading(false);
        });
    };
    getQuestionByUnitID(selectedUnit);
  }, [props.data, selectedUnit]);

  const getUnitBySubjectID = async () => {
    let subjectID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/units`)
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addQuestion = async () => {
    setLoading(true);
    let exerciseID = window.location.pathname.split("/")[6];
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/exerciseGameQuestion`, {
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

  const handleChangeUnit = (value) => {
    setSelectedUnit(value);
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
    getUnitBySubjectID();
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
          <Form.Item
            name="unit"
            label="Select Unit"
            rules={[
              {
                required: true,
                message: "Please select a Unit",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select unit"
              onChange={handleChangeUnit}
            >
              {unit?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  Unit {item?.unitName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Table
            rowSelection={rowSelection}
            columns={selectingQuestionCol}
            dataSource={data}
            rowKey={(record) => record.id}
            loading={tableLoading}
          />
        </Form>
      </Modal>
    </>
  );
};

export default AddTestQuestion;

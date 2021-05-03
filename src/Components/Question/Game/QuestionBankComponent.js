import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Select,
  Form,
  Button,
  Space,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import EditQuestion from "./Modal/Edit/EditQuestion";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import ViewQuestion from "./Modal/View/ViewQuestion";
import { getJwt } from "../../../helper/jwt";

const QuestionBankComponent = () => {
  const [form] = Form.useForm();
  const [questionData, setQuestionData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subject, setSubject] = useState([]);
  const [unit, setUnit] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSubjectByGrade();
  }, []);

  useEffect(() => {
    getUnitBySubjectID(selectedSubject);
  }, [selectedSubject]);

  const getSubjectByGrade = async () => {
    let gradeID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${gradeID}/subjects`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnitBySubjectID = async (subjectID) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/units`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getQuestionByUnitID = async (unitID) => {
    setLoading(true);
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
        setQuestionData(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const deleteQuestion = async (id) => {
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    let formData = new FormData();
    formData.append("ids", ids);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/question/delete`, formData, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        console.log(res);
        getQuestionByUnitID(selectedUnit);
        message.success("Delete Question successfully");
        setSelectedRowKeys([]);
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete this Question");
      });
  };

  const handleChangeSubject = (value) => {
    setSelectedSubject(value);
    setSelectedUnit([]);
    form.setFieldsValue({
      unit: null,
    });
  };

  const handleChangeUnit = (value) => {
    setSelectedUnit(value);
  };

  const handleDeleteQuestion = (item) => {
    deleteQuestion(item);
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const onFinish = (event) => {
    getQuestionByUnitID(event.unit);
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "questionTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Type",
      dataIndex: "questionType",
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
    },
    {
      title: "Modified Date",
      dataIndex: "modifiedDate",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space size="small">
          <ViewQuestion data={record} />
          <EditQuestion
            data={record}
            unitID={selectedUnit}
            getQuestionByUnitID={getQuestionByUnitID}
          />
          <Tooltip title="Delete Question">
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this question?"
              onConfirm={() => handleDeleteQuestion(record.id)}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Form
        form={form}
        name="search_form"
        onFinish={onFinish}
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Form.Item
          name="subject"
          label="Select subject"
          rules={[
            {
              required: true,
              message: "Please select subject",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select Subject"
            style={{ width: 200, marginRight: 10 }}
            onChange={handleChangeSubject}
            allowClear
          >
            {subject?.map((item, idx) => (
              <Select.Option key={idx} value={item?.id}>
                {item?.subjectName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.subject !== currentValues.subject
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue("subject") !== undefined ? (
              <Form.Item
                name="unit"
                label="Select Unit"
                rules={[
                  {
                    required: true,
                    message: "Please select Unit",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select Unit"
                  onChange={handleChangeUnit}
                  style={{ width: 200, marginRight: 10 }}
                  allowClear
                >
                  {unit?.map((item, idx) => (
                    <Select.Option key={idx} value={item?.id}>
                      Unit {item?.unitName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Search
        </Button>
      </Form>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={questionData}
        scroll={{ x: true }}
        loading={loading}
      />
      <div>
        <h1>With selected:</h1>
        {selectedRowKeys.length === 0 ? (
          <>
            <Button type="danger" disabled icon={<DeleteOutlined />}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete selected Question?"
              onConfirm={() => handleDeleteQuestion(selectedRowKeys)} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    </>
  );
};

export default QuestionBankComponent;

import React, { useState } from "react";
import { Table, Select, Form, Button } from "antd";
import EditQuestion from "./Modal/EditQuestion";
const { Option } = Select;

const QuestionBankComponent = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const onFinish = (event) => {
    console.log(event);
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "q_name",
    },
    {
      title: "Created By",
      dataIndex: "createdby",
      sorter: (a, b) => a.createdby.length - b.createdby.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Modified By",
      dataIndex: "modifiedby",
      sorter: (a, b) => a.modifiedby.length - b.modifiedby.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => <EditQuestion data={record} />,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = [
    {
      key: "1",
      q_name: "Question 1",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Trần Thiên Anh",
    },
    {
      key: "2",
      q_name: "Question 2",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Từ Thiệu Hào",
    },
    {
      key: "3",
      q_name: "Question 3",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Trương Thành Đạt",
    },
    {
      key: "4",
      q_name: "Question 4",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Đoàn Tuấn Đức",
    },
  ];

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
            style={{ width: 200, marginRight: 10 }}
            placeholder="Select subject"
          >
            <Option value="math">Math</Option>
            <Option value="science">Science</Option>
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
                  placeholder="Select category"
                  style={{ width: 200, marginRight: 10 }}
                >
                  <Option value="unit 1">Unit 1</Option>
                  <Option value="unit 2">Unit 2</Option>
                  <Option value="unit 3">Unit 3</Option>
                  <Option value="unit 4">Unit 4</Option>
                  <Option value="unit 5">Unit 5</Option>
                  <Option value="unit 6">Unit 6</Option>
                  <Option value="unit 7">Unit 7</Option>
                  <Option value="unit 8">Unit 8</Option>
                  <Option value="unit 9">Unit 9</Option>
                  <Option value="unit 10">Unit 10</Option>
                </Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={data.key}
        scroll={{ x: true }}
      />
      {/* <div>
        <h1>With selected:</h1>
        {selectedRowKeys.length === 0 ? (
          <>
            <Button type="danger" disabled style={{ marginRight: 10 }}>
              Delete
            </Button>
            <Button type="primary" disabled style={{ marginRight: 10 }}>
              Move to &gt;&gt;
            </Button>
            <Select
              defaultValue="quiz 1"
              style={{ width: 200, marginRight: 10 }}
              disabled
            >
              <Option value="quiz 1">Quiz 1</Option>
              <Option value="quiz 2">Quiz 2</Option>
            </Select>
          </>
        ) : (
          <>
            <Button type="danger" style={{ marginRight: 10 }}>
              Delete
            </Button>
            <Button type="primary" style={{ marginRight: 10 }}>
              Move to &gt;&gt;
            </Button>
            <Select
              defaultValue="quiz 1"
              style={{ width: 200, marginRight: 10 }}
            >
              <Option value="quiz1">Quiz 1</Option>
              <Option value="quiz 2">Quiz 2</Option>
            </Select>
          </>
        )}
      </div> */}
    </>
  );
};

export default QuestionBankComponent;

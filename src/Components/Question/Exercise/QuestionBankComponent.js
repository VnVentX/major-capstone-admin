import React, { useState } from "react";
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
import EditQuestion from "./Modal/EditQuestion";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
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

  const handleDelete = (item) => {
    console.log(item);
    message.success("Delete Question successfully!");
  };

  const handleDeleteList = () => {
    console.log(selectedRowKeys);
    message.success("Delete news successfully!");
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "q_name",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
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
      align: "center",
      render: (record) => (
        <Space size="small">
          <EditQuestion data={record} />
          <Tooltip title="Delete Question">
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this news?"
              onConfirm={() => handleDelete(record.key)} //Handle disable logic here
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

  const data = [
    {
      key: 1,
      q_name: "Question 1",
      createdBy: "anhtt",
      modifiedBy: "anhtt",
      createdDate: "14:24PM, 24/02/2021",
      modifiedDate: "14:50PM, 24/02/2021",
    },
    {
      key: 2,
      q_name: "Question 2",
      createdBy: "anhtt",
      modifiedBy: "anhtt",
      createdDate: "14:24PM, 24/02/2021",
      modifiedDate: "14:50PM, 24/02/2021",
    },
    {
      key: 3,
      q_name: "Question 3",
      createdBy: "anhtt",
      modifiedBy: "anhtt",
      createdDate: "14:24PM, 24/02/2021",
      modifiedDate: "14:50PM, 24/02/2021",
    },
    {
      key: 4,
      q_name: "Question 4",
      createdBy: "anhtt",
      modifiedBy: "anhtt",
      createdDate: "14:24PM, 24/02/2021",
      modifiedDate: "14:50PM, 24/02/2021",
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
      <div>
        <h1>With selected:</h1>
        {selectedRowKeys.length === 0 ? (
          <>
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              disabled
              style={{ marginRight: 10 }}
            >
              Delete
            </Button>
            {/* <Button type="primary" disabled style={{ marginRight: 10 }}>
              Move to &gt;&gt;
            </Button>
            <Select
              defaultValue="quiz 1"
              style={{ width: 200, marginRight: 10 }}
              disabled
            >
              <Option value="quiz 1">Quiz 1</Option>
              <Option value="quiz 2">Quiz 2</Option>
            </Select> */}
          </>
        ) : (
          <>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete selected Questions?"
              onConfirm={handleDeleteList} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                style={{ marginRight: 10 }}
              >
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

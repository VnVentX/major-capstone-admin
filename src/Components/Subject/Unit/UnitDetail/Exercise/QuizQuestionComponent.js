import React, { useState } from "react";
import { Card, Button, Modal, Form, Table, Space, Select } from "antd";
import EditQuestion from "../../../../Question/EditQuestion";
import ViewQuestion from "../../../../Question/ViewQuestion";

const { Option } = Select;

const selectedQuestionCol = [
  {
    title: "Question",
    width: "90%",
    dataIndex: "q_name",
    key: "q_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "x",
    render: (record) => (
      <Space size="middle">
        <EditQuestion data={record} />
        <a>Delete</a>
      </Space>
    ),
  },
];

const selectingQuestionCol = [
  {
    title: "Question",
    width: "90%",
    dataIndex: "q_name",
    key: "q_name",
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

const data = [
  {
    key: 1,
    q_name: "Question 1",
  },
  {
    key: 2,
    q_name: "Question 2",
  },
  {
    key: 3,
    q_name: "Question 3",
  },
];

const QuizQuestionComponent = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
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

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Card type="inner" title={"Editing Quiz: " + "Quiz 1"}>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button type="primary" size="middle" onClick={showModal}>
          Add Question from Question Bank
        </Button>
        <Modal
          title="Create Subject"
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            selectedRowKeys.length === 0 ? (
              <Button key="submit" type="primary" disabled>
                Submit
              </Button>
            ) : (
              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      onFinish(values);
                      form.resetFields();
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
              >
                Submit
              </Button>
            ),
          ]}
        >
          <Form form={form} name="add-questions" layout="vertical">
            <Form.Item
              name="category"
              label="Select category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
            >
              <Select showSearch placeholder="Select category">
                <Option value="quiz 1">Quiz 1</Option>
                <Option value="quiz 2">Quiz 2</Option>
              </Select>
            </Form.Item>
            <Table
              rowSelection={rowSelection}
              columns={selectingQuestionCol}
              dataSource={data}
              rowKey={data.key}
            />
          </Form>
        </Modal>
      </div>
      <Table columns={selectedQuestionCol} dataSource={data} />
    </Card>
  );
};

export default QuizQuestionComponent;

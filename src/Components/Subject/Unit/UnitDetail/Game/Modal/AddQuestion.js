import React, { useState } from "react";
import { Button, Modal, Form, Table, Space } from "antd";
import ViewQuestion from "../../../../../Question/Game/Modal/View/ViewQuestion";

const selectingQuestionCol = [
  {
    title: "Question",
    width: "60%",
    dataIndex: "q_name",
    key: "q_name",
  },
  {
    title: "Type",
    dataIndex: "type",
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
    key: "1",
    q_name: "Question 1",
    type: "FILL",
  },
  {
    key: "2",
    q_name: "Question 2",
    type: "MATCH",
  },
  {
    key: "3",
    q_name: "Question 3",
    type: "SWAP",
  },
  {
    key: "4",
    q_name: "Question 4",
    type: "CHOOSE",
  },
];

const AddQuestion = () => {
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
    <>
      <Button type="primary" size="middle" onClick={showModal}>
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
          <Table
            rowSelection={rowSelection}
            columns={selectingQuestionCol}
            dataSource={data}
            rowKey={data.key}
          />
        </Form>
      </Modal>
    </>
  );
};

export default AddQuestion;

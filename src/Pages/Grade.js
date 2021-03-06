import React, { useState } from "react";
import {
  Layout,
  Card,
  Button,
  Modal,
  Tag,
  Space,
  Form,
  Table,
  Select,
  Popconfirm,
  message,
} from "antd";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Grade",
    dataIndex: "grade",
    align: "center",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    align: "center",
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    align: "center",
  },
  {
    title: "Modified By",
    dataIndex: "modifiedBy",
    align: "center",
  },
  {
    title: "Modified Date",
    dataIndex: "modifiedDate",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => (
      <span>
        {status === "active" ? (
          <Tag color={"green"} key={status}>
            Active
          </Tag>
        ) : status === "dropout" ? (
          <Tag color={"volcano"} key={status}>
            Disabled
          </Tag>
        ) : null}
      </span>
    ),
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    align: "center",
    render: (record) => (
      <Space size="small">
        <Button type="primary">Change Status</Button>
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    grade: "Grade 1",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 2,
    grade: "Grade 2",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 3,
    grade: "Grade 3",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 4,
    grade: "Grade 4",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
  {
    id: 5,
    grade: "Grade 5",
    createdBy: "anhtt",
    modifiedBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
    status: "active",
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Grade = () => {
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
    handleCancel();
  };

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
    setSelectedRowKeys([]);
  };

  return (
    <Content className="main-layout site-layout-background">
      <Card type="inner" title="Grade Management">
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" size="large" onClick={showModal}>
            Create new Grade
          </Button>
          {selectedRowKeys.length === 0 ? null : (
            <Popconfirm
              placement="topRight"
              title="Are you sure to disable selected Grades?"
              onConfirm={confirm} //Handle disable logic here
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" size="large" style={{ marginLeft: 5 }}>
                Disable
              </Button>
            </Popconfirm>
          )}
          <Modal
            title="Create new Grade"
            visible={visible}
            onCancel={handleCancel}
            okText="Create"
            onOk={() => {
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
            destroyOnClose
          >
            <Form {...layout} form={form} name="add-questions">
              <Form.Item
                name="grade"
                label="Select a Grade"
                rules={[
                  {
                    required: true,
                    message: "Please select a Grade",
                  },
                ]}
              >
                <Select showSearch placeholder="Select a Grade">
                  <Option value="Grade 1">Grade 1</Option>
                  <Option value="Grade 2">Grade 2</Option>
                  <Option value="Grade 3">Grade 3</Option>
                  <Option value="Grade 4">Grade 4</Option>
                  <Option value="Grade 5">Grade 5</Option>
                  <Option value="Grade 6">Grade 6</Option>
                  <Option value="Grade 7">Grade 7</Option>
                  <Option value="Grade 8">Grade 8</Option>
                  <Option value="Grade 9">Grade 9</Option>
                  <Option value="Grade 10">Grade 10</Option>
                  <Option value="Grade 11">Grade 11</Option>
                  <Option value="Grade 12">Grade 12</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </Content>
  );
};

export default Grade;

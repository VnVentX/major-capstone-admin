import React, { useState } from "react";
import { Table, Select, Form, Button } from "antd";
import EditCategory from "./EditCategory";
const { Option } = Select;

const CategoryComponent = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const onFinish = (event) => {
    console.log(event);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
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
      render: (record) => <EditCategory data={record} />,
    },
  ];

  const data = [
    {
      key: "1",
      category: "Unit 1",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Trần Thiên Anh",
    },
    {
      key: "2",
      category: "Unit 2",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Từ Thiệu Hào",
    },
    {
      key: "3",
      category: "Unit 3",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Trương Thành Đạt",
    },
    {
      key: "4",
      category: "Unit 4",
      createdby: "Đoàn Tuấn Đức",
      modifiedby: "Đoàn Tuấn Đức",
    },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            name="grade"
            label="Select grade"
            rules={[
              {
                required: true,
                message: "Please select grade",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200, marginRight: 10 }}
              placeholder="Select grade"
            >
              <Option value="1">Grade 1</Option>
              <Option value="2">Grade 2</Option>
              <Option value="3">Grade 3</Option>
              <Option value="4">Grade 4</Option>
              <Option value="5">Grade 5</Option>
            </Select>
          </Form.Item>
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
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form>
        <Button type="primary">Add Category</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={data.key}
        pagination
        scroll={{ x: true }}
      />
    </>
  );
};

export default CategoryComponent;

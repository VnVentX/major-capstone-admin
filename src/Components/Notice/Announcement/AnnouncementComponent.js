import React from "react";
import { Table, Button, Input, Space, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import AddNewAnnouncement from "./Modal/AddNewAnnouncement";
import EditAnnouncement from "./Modal/EditAnnouncement";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    id: 1,
    title: "Announce 1",
    content:
      "<h2>Lịch nghỉ Tết Nguyên Đán</h2><p>Học sinh của trường Major Edu sẽ được nghỉ tết đến hết tháng 2 năm 2021.</p>",
    status: "active",
    uploadedBy: "anhtt",
    uploadedDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 2,
    title: "Announce 2",
    content:
      "<h2>Lịch nghỉ Tết Nguyên Đán</h2><p>Học sinh của trường Major Edu sẽ được nghỉ tết đến hết tháng 2 năm 2021.</p>",
    status: "active",
    uploadedBy: "anhtt",
    uploadedDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 3,
    title: "Announce 3",
    content:
      "<h2>Lịch nghỉ Tết Nguyên Đán</h2><p>Học sinh của trường Major Edu sẽ được nghỉ tết đến hết tháng 2 năm 2021.</p>",
    status: "active",
    uploadedBy: "anhtt",
    uploadedDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 4,
    title: "Announce 4",
    content:
      "<h2>Lịch nghỉ Tết Nguyên Đán</h2><p>Học sinh của trường Major Edu sẽ được nghỉ tết đến hết tháng 2 năm 2021.</p>",
    status: "active",
    uploadedBy: "anhtt",
    uploadedDate: "14:24PM, 24/02/2021",
    modifiedDate: "14:50PM, 24/02/2021",
  },
];

export default class AnnouncementComponent extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Uploaded By",
        dataIndex: "uploadedBy",
        ...this.getColumnSearchProps("uploadedBy"),
      },
      {
        title: "Uploaded Date",
        dataIndex: "uploadedDate",
        ...this.getColumnSearchProps("uploadedDate"),
      },
      {
        title: "Action",
        align: "center",
        render: (record) => (
          <Space size="small">
            <EditAnnouncement data={record} />

            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this news?"
              onConfirm={this.confirm} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <AddNewAnnouncement />
        </div>
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
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
            </>
          ) : (
            <>
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete selected News?"
                onConfirm={this.confirm} //Handle disable logic here
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
      </div>
    );
  }
}

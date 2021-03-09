import React, { Component } from "react";
import {
  Table,
  Card,
  Tag,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AddNewStudent from "./Modal/AddNewStudent";
import EditStudent from "./Modal/EditStudent";

export default class StudentAccountComponent extends Component {
  state = {
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    searchText: "",
    searchedColumn: "",
    loading: false,
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
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

  confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  render() {
    const columns = [
      {
        title: "Name",
        align: "center",
        render: (record) => (
          <Link to={`/student/${record.id}`}>
            {record.firstName} {record.lastName}
          </Link>
        ),
      },
      {
        title: "School",
        dataIndex: "school",
        align: "center",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        align: "center",
      },
      {
        title: "Grade",
        dataIndex: "grade",
        align: "center",
      },
      {
        title: "Class",
        dataIndex: "class",
        align: "center",
      },
      {
        title: "Account",
        dataIndex: "account",
        align: "center",
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
        render: (status) => (
          <span>
            {status === "done" ? (
              <Tag color={"green"} key={status}>
                Done
              </Tag>
            ) : status === "dropout" ? (
              <Tag color={"volcano"} key={status}>
                Dropout
              </Tag>
            ) : (
              <Tag color={"green"} key={status}>
                Learning
              </Tag>
            )}
          </span>
        ),
      },
      {
        title: "Action",
        align: "center",
        render: (record) => (
          <Space size="small">
            <EditStudent data={record} />
          </Space>
        ),
      },
    ];

    const { selectedRowKeys, pagination, loading } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <Card>
          <div
            style={{
              display: "flex",
              marginBottom: 10,
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button type="primary" size="large" icon={<DownloadOutlined />}>
                Export Student List
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <AddNewStudent />
              {selectedRowKeys.length === 0 ? null : (
                <Popconfirm
                  placement="topRight"
                  title="Are you sure to disable selected Schools?"
                  onConfirm={this.confirm} //Handle disable logic here
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" size="large" style={{ marginLeft: 5 }}>
                    Disable
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>
          <Table
            rowKey={this.props.data.id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            scroll={{ x: true }}
            pagination={pagination}
            loading={loading}
          />
        </Card>
      </>
    );
  }
}

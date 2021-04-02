import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
  AutoComplete,
  Select,
} from "antd";
import {
  SearchOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import AddNewSchool from "./Modal/AddNewSchool";
import EditSchool from "./Modal/EditSchool";

export default class SchoolComponent extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    dataSource: [],
    dataSearch: [],
    schoolSearch: "",
    isLoading: true,
  };

  componentDidMount() {
    this.getAllSchool();
    this.setState({ isLoading: false });
  }

  getAllSchool = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/school/all")
      .then((res) => {
        this.setState({
          dataSource: res.data.length === 0 ? [] : res.data,
          dataSearch: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  disableSchool = async (id, status) => {
    await axios
      .put("https://mathscienceeducation.herokuapp.com/school/changeStatus", {
        id: id,
        status: status,
      })
      .then((res) => {
        console.log(res);
        this.getAllSchool();
      })
      .catch((e) => {
        console.log(e);
      });
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

  handleDisableSchool = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    this.disableSchool(e, message);
  };

  render() {
    const columns = [
      {
        title: "School",
        render: (record) => (
          <Link to={`/school/${record.id}`}>TH {record.schoolName}</Link>
        ),
      },
      {
        title: "School Code",
        dataIndex: "schoolCode",
        ...this.getColumnSearchProps("schoolCode"),
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        ...this.getColumnSearchProps("createdBy"),
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        ...this.getColumnSearchProps("createdDate"),
      },
      {
        title: "Modified By",
        dataIndex: "modifiedBy",
        ...this.getColumnSearchProps("modifiedBy"),
      },
      {
        title: "Modified Date",
        dataIndex: "modifiedDate",
        ...this.getColumnSearchProps("modifiedDate"),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status) => (
          <span>
            {status === "ACTIVE" ? (
              <Tag color={"green"} key={status}>
                Active
              </Tag>
            ) : status === "INACTIVE" ? (
              <Tag color={"volcano"} key={status}>
                Disabled
              </Tag>
            ) : null}
          </span>
        ),
      },
      {
        title: "Action",
        align: "center",
        render: (record) => (
          <Space size="small">
            <Popconfirm
              placement="topRight"
              title={
                record.status === "ACTIVE"
                  ? "Are you sure to disable this School?"
                  : "Are you sure to active this School?"
              }
              onConfirm={() =>
                this.handleDisableSchool(record.id, record.status)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Change Status</Button>
            </Popconfirm>
            <EditSchool getAllSchool={this.getAllSchool} schoolID={record.id} />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this Schools?"
              onConfirm={() => this.handleDisableSchool(record.id, "DELETED")}
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
          </Space>
        ),
      },
    ];

    return (
      <Card type="inner" title="School Management">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <AutoComplete
            dataSource={this.state.dataSearch?.map((item, idx) => (
              <Select.Option key={idx} value={item.schoolName}>
                {item.schoolName}
              </Select.Option>
            ))}
          >
            <Input.Search
              placeholder="Search a School"
              allowClear
              onSearch={(schoolSearch) =>
                this.setState({
                  dataSource: this.state.dataSearch?.filter((item) =>
                    item.schoolName
                      .toString()
                      .toLowerCase()
                      .includes(schoolSearch.toLowerCase())
                  ),
                })
              }
              enterButton
            />
          </AutoComplete>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <AddNewSchool getAllSchool={this.getAllSchool} />
          </div>
        </div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={this.state.dataSource}
          scroll={{ x: true }}
          loading={this.state.isLoading}
        />
      </Card>
    );
  }
}

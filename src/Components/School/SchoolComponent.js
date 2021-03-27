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

export default class SchoolComponent extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    dataSource: [],
    dataSearch: [],
    schoolSearch: "",
  };

  componentDidMount() {
    this.getAllSchool();
  }

  getAllSchool = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/schools")
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
        title: "School",
        render: (record) => (
          <Link to={`/school/${record.id}`}>{record.schoolName}</Link>
        ),
      },
      {
        title: "School Code",
        dataIndex: "schoolCode",
        ...this.getColumnSearchProps("schoolCode"),
      },
      {
        title: "Created By",
        render: (record) => (
          <Space direction="vertical" size="small">
            {record.createdBy}
            {record.createdDate}
          </Space>
        ),
      },
      {
        title: "Modified By",
        render: (record) => (
          <Space direction="vertical" size="small">
            {record.modifiedBy}
            {record.modifiedDate}
          </Space>
        ),
      },
      {
        title: "Status",
        dataIndex: "disable",
        key: "disable",
        align: "center",
        render: (disable) => (
          <span>
            {disable === true ? (
              <Tag color={"green"} key={disable}>
                Active
              </Tag>
            ) : disable === false ? (
              <Tag color={"volcano"} key={disable}>
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

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    console.log(this.state.dataSource);

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
            dataSource={this.state.dataSearch.map((item, idx) => (
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
                  dataSource: this.state.dataSearch.filter((item) =>
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.dataSource}
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
                title="Are you sure to delete selected Schools?"
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
      </Card>
    );
  }
}

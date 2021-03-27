import React, { Component } from "react";
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
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import LinkNewSchool from "./Modal/LinkNewSchool";

const data = [
  {
    id: 1,
    code: "DMC",
    school: "Dương Minh Châu",
    district: "Q10",
    status: "active",
    createdBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedBy: "anhtt",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 2,
    code: "NCT",
    school: "Nguyễn Chí Thanh",
    district: "Q10",
    status: "active",
    createdBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedBy: "anhtt",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 3,
    code: "NVT",
    school: "Nguyễn Văn Tố",
    district: "Q10",
    status: "active",
    createdBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedBy: "anhtt",
    modifiedDate: "14:50PM, 24/02/2021",
  },
  {
    id: 4,
    code: "TQC",
    school: "Trần Quang Cơ",
    district: "Q10",
    status: "active",
    createdBy: "anhtt",
    createdDate: "14:24PM, 24/02/2021",
    modifiedBy: "anhtt",
    modifiedDate: "14:50PM, 24/02/2021",
  },
];

export default class GradeDetailTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    dataSource: data,
    schoolSearch: "",
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
        align: "center",
        render: (record) => (
          <Link to={`/school/${record.id}`}>{record.school}</Link>
        ),
      },
      {
        title: "School Code",
        dataIndex: "code",
        align: "center",
        ...this.getColumnSearchProps("code"),
      },
      {
        title: "Created By",
        align: "center",
        render: (record) => (
          <Space direction="vertical" size="small">
            {record.createdBy}
            {record.createdDate}
          </Space>
        ),
      },
      {
        title: "Modified By",
        align: "center",
        render: (record) => (
          <Space direction="vertical" size="small">
            {record.modifiedBy}
            {record.modifiedDate}
          </Space>
        ),
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

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Card type="inner" title="Linked Schools">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <AutoComplete
            dataSource={data.map((item, idx) => (
              <Select.Option key={idx} value={item.school}>
                {item.school}
              </Select.Option>
            ))}
          >
            <Input.Search
              placeholder="Search a School"
              allowClear
              onSearch={(schoolSearch) =>
                this.setState({
                  dataSource: data.filter((item) =>
                    item.school
                      .toString()
                      .toLowerCase()
                      .includes(schoolSearch.toLowerCase())
                  ),
                })
              }
              enterButton
            />
          </AutoComplete>
          <div>
            <LinkNewSchool />
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

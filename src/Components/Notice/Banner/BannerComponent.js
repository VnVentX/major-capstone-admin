import React from "react";
import {
  Table,
  Image,
  Button,
  Input,
  Space,
  Tag,
  Popconfirm,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import AddNewBanner from "./Modal/AddNewBanner";
import EditBanner from "./Modal/EditBanner";

const data = [
  {
    id: 1,
    imageUrl: "https://i.ibb.co/MMR1fHg/banner-science.jpg",
    description: "Banner 1",
    status: "active",
    uploadedBy: "haotpv",
  },
  {
    id: 2,
    imageUrl: "https://i.ibb.co/MMR1fHg/banner-science.jpg",
    description: "Banner 2",
    status: "active",
    uploadedBy: "anhtt",
  },
  {
    id: 3,
    imageUrl: "https://i.ibb.co/MMR1fHg/banner-science.jpg",
    description: "Banner 3",
    status: "active",
    uploadedBy: "anhtt",
  },
  {
    id: 4,
    imageUrl: "https://i.ibb.co/MMR1fHg/banner-science.jpg",
    description: "Banner 4",
    status: "active",
    uploadedBy: "anhtt",
  },
];

export default class BannerComponent extends React.Component {
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
        title: "Banner",
        dataIndex: "imageUrl",
        width: "20%",
        align: "center",
        render: (record) => (
          <Image
            width={200}
            src={record}
            placeholder={<Image preview={false} src={record} width={200} />}
          />
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        align: "center",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Uploaded By",
        dataIndex: "uploadedBy",
        align: "center",
        ...this.getColumnSearchProps("uploadedBy"),
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
            <EditBanner data={record} />
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
          <AddNewBanner />
          {selectedRowKeys.length === 0 ? null : (
            <Popconfirm
              placement="topRight"
              title="Are you sure to disable selected banners?"
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
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
}

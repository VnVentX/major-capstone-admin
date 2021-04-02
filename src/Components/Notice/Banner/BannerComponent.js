import React from "react";
import axios from "axios";
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
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

export default class BannerComponent extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    dataSource: [],
  };

  componentDidMount() {
    this.getAllBanner();
  }

  getAllBanner = async () => {
    await axios
      .get("https://mathscienceeducation.herokuapp.com/bannerImage/all")
      .then((res) => {
        this.setState({
          dataSource: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  disableBanner = async (id, status) => {
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put("https://mathscienceeducation.herokuapp.com/bannerImage", {
        ids: ids,
        status: status,
      })
      .then((res) => {
        console.log(res);
        this.getAllBanner();
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

  handleDisableBanner = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    this.disableBanner(e, message);
  };

  render() {
    const columns = [
      {
        title: "Banner",
        dataIndex: "imageUrl",
        width: "20%",
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
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Uploaded By",
        dataIndex: "createdBy",
        ...this.getColumnSearchProps("createdBy"),
      },
      {
        title: "Uploaded Date",
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
        align: "center",
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
                  ? "Are you sure to disable this Banner?"
                  : "Are you sure to active this Banner?"
              }
              onConfirm={() =>
                this.handleDisableBanner(record.id, record.status)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Change Status</Button>
            </Popconfirm>
            <EditBanner data={record} getAllBanner={this.getAllBanner} />
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
          <AddNewBanner getAllBanner={this.getAllBanner} />
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
              <Button type="danger" disabled icon={<DeleteOutlined />}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete selected Banners?"
                onConfirm={() =>
                  this.handleDisableBanner(selectedRowKeys, "DELETED")
                } //Handle disable logic here
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button type="danger" icon={<DeleteOutlined />}>
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

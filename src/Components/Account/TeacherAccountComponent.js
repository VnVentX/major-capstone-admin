import React, { Component } from "react";
import {
  Table,
  Card,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Space,
  DatePicker,
} from "antd";

import { DownloadOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export default class TeacherAccountComponent extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    isEditAccount: false,
    isCreateAccount: false,
    modalTitle: "",
    pagination: {
      current: 1,
      pageSize: 10,
    },
    searchText: "",
    searchedColumn: "",
    loading: false,
    visible: false,
  };

  //   Modal Add new
  showModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Create Account",
      isCreateAccount: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false, isEditAccount: false, modalTitle: "" });
  };
  //   End Modal

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

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "School",
        dataIndex: "school",
        key: "school",
        width: "20%",
        ...this.getColumnSearchProps("school"),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        width: "20%",
      },
      {
        title: "Account",
        dataIndex: "account",
        width: "20%",
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        render: (enabled) => (
          <span>
            {enabled === true ? (
              <Tag color={"green"} key={enabled}>
                ACTIVE
              </Tag>
            ) : (
              <Tag color={"volcano"} key={enabled}>
                DISABLED
              </Tag>
            )}
          </span>
        ),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              className="ant-btn-link"
              onClick={async () => {
                // const idStore = record.idStore;
                this.setState({
                  //   btnModal: "Create",
                  visible: true,
                  isEditAccount: true,
                  modalTitle: "Edit Account",
                  //   idStore,
                });
              }}
            >
              Edit
            </button>
            |<button className="ant-btn-link">Details</button>
          </div>
        ),
      },
    ];

    const {
      selectedRowKeys,
      pagination,
      visible,
      modalTitle,
      loading,
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    };

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const onFinish = (values) => {
      console.log(values);
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
              <Button
                type="primary"
                size="large"
                icon={<UploadOutlined />}
                style={{ marginRight: 5 }}
              >
                Import from Excel
              </Button>
              <Button type="primary" size="large" icon={<DownloadOutlined />}>
                Export to Excel
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={this.showModal}
                style={{ marginRight: 5 }}
              >
                Add New Account
              </Button>
              {selectedRowKeys.length === 0 ? null : (
                <Button type="danger" size="large">
                  Disable
                </Button>
              )}
            </div>
          </div>
          <Modal
            visible={visible}
            title={modalTitle}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleOk}
              >
                Submit
              </Button>,
            ]}
          >
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
              <Form.Item name={["user", "firstName"]} label="First Name">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "lastName"]} label="Last Name">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "school"]} label="School">
                <Select>
                  <Select.Option value="demo">TH Major</Select.Option>
                  <Select.Option value="demo">THCS Major</Select.Option>
                  <Select.Option value="demo">THPT Major</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name={["user", "age"]} label="DoB">
                <DatePicker />
              </Form.Item>
              <Form.Item name={["user", "gender"]} label="Gender">
                <Select>
                  <Select.Option value="demo">Male</Select.Option>
                  <Select.Option value="demo">Female</Select.Option>
                  <Select.Option value="demo">Other</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            rowKey={this.props.data.key}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </Card>
      </>
    );
  }
}

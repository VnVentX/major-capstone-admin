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
  DatePicker,
  Space,
  Upload,
  message,
} from "antd";
import { Link } from "react-router-dom";
import {
  InboxOutlined,
  DownloadOutlined,
  UploadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class StudentAccountComponent extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    isEditAccount: false,
    isCreateAccount: false,
    modalTitle: "",
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    searchText: "",
    searchedColumn: "",
    loading: false,
    visible: false,
    visibleImport: false,
    visibleExport: false,
  };

  //   Modal Add new
  showModal = () => {
    this.setState({
      visible: true,
      modalTitle: "Create Account",
      isCreateAccount: true,
    });
  };

  showModalImport = () => {
    this.setState({
      visibleImport: true,
      modalTitle: "Import from Excel",
    });
  };

  showModalExport = () => {
    this.setState({
      visibleExport: true,
      modalTitle: "Export to Excel",
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        visible: false,
        visibleExport: false,
        visibleImport: false,
        isEditAccount: false,
        modalTitle: "",
      });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleExport: false,
      visibleImport: false,
      isEditAccount: false,
      modalTitle: "",
    });
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
        title: "Site",
        dataIndex: "site",
        key: "site",
        width: "20%",
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
        width: "10%",
      },
      {
        title: "Grade",
        dataIndex: "grade",
        width: "10%",
      },
      {
        title: "Class",
        dataIndex: "class",
        width: "10%",
      },
      {
        title: "Account",
        dataIndex: "account",
        width: "20%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
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
        width: "40%",
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
              style={{
                marginRight: 5,
              }}
              className="ant-btn-link"
              onClick={async () => {
                await this.setState({
                  visible: true,
                  isEditAccount: true,
                  modalTitle: "Edit Account",
                });
              }}
            >
              Edit
            </button>
            |
            <Button type="link">
              <Link to="/account/detail">Details</Link>
            </Button>
          </div>
        ),
      },
    ];

    const {
      selectedRowKeys,
      pagination,
      visible,
      visibleImport,
      visibleExport,
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
                onClick={this.showModalImport}
              >
                Import from Excel
              </Button>
              {/* Modal Import excel */}
              <Modal
                title={modalTitle}
                visible={visibleImport}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
              </Modal>
              <Button
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
                onClick={this.showModalExport}
              >
                Export to Excel
              </Button>
              {/* Modal Import excel */}
              <Modal
                title={modalTitle}
                visible={visibleExport}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="Export"
              >
                <Form {...layout} name="nest-messages">
                  <Form.Item
                    name="site"
                    label="Site"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="HCM">Hồ Chí Minh</Select.Option>
                      <Select.Option value="HN">Hà Nội</Select.Option>
                      <Select.Option value="ĐN">Đà Nẵng</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="school"
                    label="School"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="TH Major">TH Major</Select.Option>
                      <Select.Option value="THCS Major">
                        THCS Major
                      </Select.Option>
                      <Select.Option value="THPT Major">
                        THPT Major
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="grade"
                    label="Grade"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                      <Select.Option value="5">5</Select.Option>
                      <Select.Option value="6">6</Select.Option>
                      <Select.Option value="7">7</Select.Option>
                      <Select.Option value="8">8</Select.Option>
                      <Select.Option value="9">9</Select.Option>
                      <Select.Option value="10">10</Select.Option>
                      <Select.Option value="11">11</Select.Option>
                      <Select.Option value="12">12</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="class"
                    label="Class"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                      <Select.Option value="5">5</Select.Option>
                      <Select.Option value="6">6</Select.Option>
                      <Select.Option value="7">7</Select.Option>
                      <Select.Option value="8">8</Select.Option>
                      <Select.Option value="9">9</Select.Option>
                      <Select.Option value="10">10</Select.Option>
                      <Select.Option value="11">11</Select.Option>
                      <Select.Option value="12">12</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Modal>
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

          {/* Modal edit create */}
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
                onClick={onFinish}
              >
                Submit
              </Button>,
            ]}
          >
            <Form {...layout} name="nest-messages">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="site" label="Site" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value="HCM">Hồ Chí Minh</Select.Option>
                  <Select.Option value="HN">Hà Nội</Select.Option>
                  <Select.Option value="ĐN">Đà Nẵng</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.site !== currentValues.site
                }
              >
                {({ getFieldValue }) => {
                  return getFieldValue("site") !== undefined ? (
                    <Form.Item
                      name="school"
                      label="School"
                      rules={[{ required: true }]}
                    >
                      <Select>
                        <Select.Option value="TH Major">TH Major</Select.Option>
                        <Select.Option value="THCS Major">
                          THCS Major
                        </Select.Option>
                        <Select.Option value="THPT Major">
                          THPT Major
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
              <Form.Item name="age" label="DoB" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4">4</Select.Option>
                  <Select.Option value="5">5</Select.Option>
                  <Select.Option value="6">6</Select.Option>
                  <Select.Option value="7">7</Select.Option>
                  <Select.Option value="8">8</Select.Option>
                  <Select.Option value="9">9</Select.Option>
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="11">11</Select.Option>
                  <Select.Option value="12">12</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.grade !== currentValues.grade
                }
              >
                {({ getFieldValue }) => {
                  return getFieldValue("grade") !== undefined ? (
                    <Form.Item
                      name="class"
                      label="Class"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="1-1">1-1</Select.Option>
                        <Select.Option value="1-2">1-2</Select.Option>
                        <Select.Option value="1-3">1-3</Select.Option>
                        <Select.Option value="1-4">1-4</Select.Option>
                        <Select.Option value="1-5">1-5</Select.Option>
                        <Select.Option value="1-6">1-6</Select.Option>
                      </Select>
                    </Form.Item>
                  ) : null;
                }}
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
            scroll={{ x: true }}
          />
        </Card>
      </>
    );
  }
}

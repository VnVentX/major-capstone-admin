import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  Popconfirm,
  message,
  Cascader,
  Input,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import AddNewStudent from "./Modal/AddNewStudent";
import EditStudent from "./Modal/EditStudent";
import ViewStudent from "./Modal/ViewStudent";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

export default class StudentAccountComponent extends Component {
  state = {
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    changeClassID: "",
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleDisableStudent = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    this.disableStudent(e, message);
  };

  disableStudent = async (id, status) => {
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/student`, {
        ids: ids,
        status: status,
      })
      .then((res) => {
        console.log(res);
        this.props.handleSearch(this.props.searchData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  changeClass = async () => {
    let formData = new FormData();
    formData.append("classesId", this.state.changeClassID);
    formData.append("studentIdList", this.state.selectedRowKeys);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/student/changeClass`, formData)
      .then((res) => {
        console.log(res.data);
        this.props.handleSearch(this.props.searchData);
        this.setState({ selectedRowKeys: [] });
        message.success("Move students successfully");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to move students");
      });
  };

  confirmChangeSchoolClass = () => {
    this.changeClass();
  };

  onChangeCascader = (value) => {
    this.setState({
      changeClassID: value[1],
    });
  };

  render() {
    const columns = [
      {
        title: "Name",
        render: (record) => <ViewStudent data={record} />,
      },
      {
        title: "School",
        dataIndex: "schoolName",
      },
      {
        title: "Gender",
        dataIndex: "gender",
      },
      {
        title: "Grade",
        dataIndex: "gradeName",
      },
      {
        title: "Class",
        dataIndex: "className",
      },
      {
        title: "Account",
        dataIndex: "username",
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
                  ? "Are you sure to disable this Student?"
                  : "Are you sure to active this Student?"
              }
              onConfirm={() =>
                this.handleDisableStudent(record.id, record.status)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Change Status</Button>
            </Popconfirm>
            <EditStudent data={record} />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this Students?"
              onConfirm={() => this.handleDisableStudent(record.id, "DELETED")}
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
              <Input.Search
                placeholder="Search Student"
                allowClear
                onSearch={(name) => this.props.handleNameSearch(name)}
                enterButton
              />
            </div>
            {this.props.searchData?.school &&
              this.props.searchData?.grade &&
              this.props.searchData?.class && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {this.props.data.length > 0 && (
                    <Button
                      type="primary"
                      size="large"
                      icon={<DownloadOutlined />}
                    >
                      Export Student List
                    </Button>
                  )}
                  <AddNewStudent
                    searchData={this.props.searchData}
                    handleSearch={this.props.handleSearch}
                  />
                </div>
              )}
          </div>
          <Table
            rowKey={(record) => record.id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            scroll={{ x: true }}
            pagination={pagination}
            loading={loading}
          />
          <div>
            <h1>With selected:</h1>
            {selectedRowKeys.length === 0 ? (
              <>
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  style={{ marginRight: 10 }}
                  disabled
                >
                  Delete
                </Button>
                {this.props.searchData?.school &&
                  this.props.searchData?.grade &&
                  this.props.searchData?.class && (
                    <>
                      <Button
                        type="primary"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        Move students to selected Class &gt;&gt;
                      </Button>
                      <Cascader
                        options={this.props.gradeClassList}
                        fieldNames={{
                          label: "name",
                          value: "id",
                          children: "classesList",
                        }}
                        placeholder="Please select destination"
                        disabled
                        style={{ width: 300 }}
                      />
                    </>
                  )}
              </>
            ) : (
              <>
                <Popconfirm
                  placement="topRight"
                  title="Are you sure to delete selected Students?"
                  onConfirm={() =>
                    this.handleDisableStudent(selectedRowKeys, "DELETED")
                  }
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
                <>
                  {this.state.changeClassID === "" ? (
                    <Button type="primary" style={{ marginRight: 10 }} disabled>
                      Move students to other Class &gt;&gt;
                    </Button>
                  ) : (
                    <Popconfirm
                      placement="topRight"
                      title="Are you sure to move selected Students?"
                      onConfirm={this.confirmChangeSchoolClass} //Handle disable logic here
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" style={{ marginRight: 10 }}>
                        Move students to other Class &gt;&gt;
                      </Button>
                    </Popconfirm>
                  )}
                  <Cascader
                    options={this.props.gradeClassList}
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "classesList",
                    }}
                    placeholder="Please select destination"
                    onChange={this.onChangeCascader}
                    matchInputWidth={true}
                    style={{ width: 300 }}
                  />
                </>
              </>
            )}
          </div>
        </Card>
      </>
    );
  }
}

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
import AddNewStudent from "./Modal/AddNewStudent";
import EditStudent from "./Modal/EditStudent";
import ViewStudent from "./Modal/ViewStudent";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getJwt } from "../../helper/jwt";

export default class StudentAccountComponent extends Component {
  state = {
    loading: false,
    changeClassID: undefined,
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
    this.setState({ loading: true });
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/student`,
        {
          ids: ids,
          status: status,
        },
        {
          headers: {
            Authorization: await getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (status === "ACTIVE" || status === "INACTIVE") {
          message.success("Change status successfully!");
        } else {
          message.success("Delete student successfully!");
        }
        this.setState({
          selectedRowKeys: [],
          loading: false,
        });
        this.props.handleSearch(this.props.searchData);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "CANNOT DELETE") {
          message.error("Can not delete active student!");
        } else if (e.response.data === "CANNOT ACTIVE") {
          message.error("Can not active student in disabled class!");
        } else {
          message.error("Fail to delete student!");
        }
        this.setState({
          loading: false,
        });
      });
  };

  changeClass = async () => {
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append("classesId", this.state.changeClassID);
    formData.append("studentIdList", this.props.selectedRowKeys);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/student/changeClass`, formData, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (Object.keys(res.data)[0] === "HAVE PROBLEM") {
          this.props.handleSearch(this.props.searchData);
          message.error(
            "Some selected students have already existed in chosen class"
          );
          this.props.handleSelectChange(Object.values(res.data)[0]);
          this.setState({
            loading: false,
          });
        } else {
          this.props.handleSearch(this.props.searchData);
          message.success("Move students successfully");
          this.setState({ loading: false });
        }
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to move students");
        this.setState({ loading: false });
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
            ) : status === "PENDING" ? (
              <Tag color={"gold"} key={status}>
                Pending
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
            {record.status.toUpperCase() !== "PENDING" && (
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
            )}
            <EditStudent
              data={record}
              handleSearch={this.props.handleSearch}
              searchData={this.props.searchData}
            />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this Student?"
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
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => {
        return `Total Students: ${total}`;
      },
    };
    const { loading } = this.state;

    const selectedRowKeys = this.props.selectedRowKeys;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.props.handleSelectChange,
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
                  {this.props.data.length < 60 && (
                    <AddNewStudent
                      searchData={this.props.searchData}
                      handleSearch={this.props.handleSearch}
                    />
                  )}
                </div>
              )}
          </div>
          <Table
            rowKey={(record) => record.id}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            scroll={{ x: true }}
            pagination={paginationProps}
            loading={loading || this.props.loading}
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
                {this.props.searchData?.school && this.props.searchData?.grade && (
                  <>
                    <Cascader
                      options={this.props.gradeClassList}
                      fieldNames={{
                        label: "name",
                        value: "id",
                        children: "classesList",
                      }}
                      placeholder="Please select destination"
                      disabled
                      style={{ width: 300, marginRight: 10 }}
                    />
                    <Button type="primary" disabled>
                      Move students to selected Class
                    </Button>
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
                {this.props.searchData?.school && this.props.searchData?.grade && (
                  <>
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
                      style={{ width: 300, marginRight: 10 }}
                    />
                    {this.state.changeClassID === undefined ? (
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        disabled
                      >
                        Move students to selected Class
                      </Button>
                    ) : (
                      <Popconfirm
                        placement="topRight"
                        title="Are you sure to move selected Students?"
                        onConfirm={this.confirmChangeSchoolClass} //Handle disable logic here
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" loading={this.state.loading}>
                          Move students to selected Class
                        </Button>
                      </Popconfirm>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Card>
      </>
    );
  }
}

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
  AutoComplete,
  Select,
  Input,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import AddNewStudent from "./Modal/AddNewStudent";
import EditStudent from "./Modal/EditStudent";
import ViewStudent from "./Modal/ViewStudent";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const options = [
  {
    id: 1,
    name: "Dương Minh Châu",
    items: [
      {
        id: 1,
        name: "Grade 1",
        items: [
          {
            id: 1,
            name: "Class 1-1",
          },
          {
            id: 2,
            name: "Class 1-2",
          },
          {
            id: 3,
            name: "Class 1-4",
          },
          {
            id: 4,
            name: "Class 1-5",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Nguyễn Chí Thanh",
    items: [
      {
        id: 2,
        name: "Grade 1",
        items: [
          {
            id: 1,
            name: "Class 1-1",
          },
          {
            id: 2,
            name: "Class 1-2",
          },
          {
            id: 3,
            name: "Class 1-4",
          },
          {
            id: 4,
            name: "Class 1-5",
          },
        ],
      },
    ],
  },
];

export default class StudentAccountComponent extends Component {
  state = {
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    changeSchoolClass: "",
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
      .put("https://mathscienceeducation.herokuapp.com/student", {
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

  confirmChangeSchoolClass = () => {
    message.success("Click on Yes");
    console.log(this.state.changeSchoolClass);
  };

  onChangeCascader = (value) => {
    console.log("selected destination");
    this.setState({
      changeSchoolClass: {
        schoolID: value[0],
        gradeID: value[1],
        classID: value[2],
      },
    });
    console.log(this.state.changeSchoolClass);
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
        render: (record) => <span>TH {record}</span>,
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
              {/* <AutoComplete
                dataSource={this.props.searchRecord.map((item, idx) => (
                  <Select.Option key={idx} value={item.fullName}>
                    {item.fullName}
                  </Select.Option>
                ))}
              > */}
              <Input.Search
                placeholder="Search Student"
                allowClear
                onSearch={(name) => this.props.handleNameSearch(name)}
                enterButton
              />
              {/* </AutoComplete> */}
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
                        Move students to other Class &gt;&gt;
                      </Button>
                      <Cascader
                        options={options}
                        placeholder="Please select"
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
                {this.props.searchData?.school &&
                  this.props.searchData?.grade &&
                  this.props.searchData?.class && (
                    <>
                      {this.state.changeSchoolClass?.schoolID === undefined ? (
                        <Button
                          type="primary"
                          style={{ marginRight: 10 }}
                          disabled
                        >
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
                        options={options}
                        fieldNames={{
                          label: "name",
                          value: "id",
                          children: "items",
                        }}
                        placeholder="Please select destination"
                        onChange={this.onChangeCascader}
                        matchInputWidth={true}
                        style={{ width: 300 }}
                      />
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

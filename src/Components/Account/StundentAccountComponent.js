import React, { Component } from "react";
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

  confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  confirmChangeSchoolClass = () => {
    message.success("Click on Yes");
    console.log(this.state.changeSchoolClass);
  };

  onChangeCascader = (value) => {
    this.setState({
      changeSchoolClass: {
        schoolID: value[0],
        gradeID: value[1],
        classID: value[2],
      },
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
        dataIndex: "school",
      },
      {
        title: "Gender",
        dataIndex: "gender",
      },
      {
        title: "Grade",
        dataIndex: "grade",
      },
      {
        title: "Class",
        dataIndex: "class",
      },
      {
        title: "Account",
        dataIndex: "account",
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
        render: (status) => (
          <span>
            {status === "dropout" ? (
              <Tag color={"volcano"} key={status}>
                Dropout
              </Tag>
            ) : (
              <Tag color={"green"} key={status}>
                Active
              </Tag>
            )}
          </span>
        ),
      },
      {
        title: "Action",
        align: "center",
        render: (record) => (
          <Space size="small">
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
              <AutoComplete
                dataSource={this.props.searchRecord.map((item, idx) => (
                  <Select.Option
                    key={idx}
                    value={`${item.firstName} ${item.lastName}`}
                  >
                    {item.firstName} {item.lastName}
                  </Select.Option>
                ))}
              >
                <Input.Search
                  placeholder="Search Student"
                  allowClear
                  onSearch={(name) => this.props.handleNameSearch(name)}
                  enterButton
                />
              </AutoComplete>
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
                  <Button
                    type="primary"
                    size="large"
                    icon={<DownloadOutlined />}
                  >
                    Export Student List
                  </Button>
                  <AddNewStudent searchData={this.props.searchData} />
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
                <Button type="danger" disabled style={{ marginRight: 10 }}>
                  Disable
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
                  title="Are you sure to disable selected Students?"
                  onConfirm={this.confirm} //Handle disable logic here
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" style={{ marginRight: 10 }}>
                    Disable
                  </Button>
                </Popconfirm>
                {this.props.searchData?.school &&
                  this.props.searchData?.grade &&
                  this.props.searchData?.class && (
                    <>
                      {this.state.changeSchoolClass === "" ? (
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

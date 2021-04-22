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
  AutoComplete,
  Select,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LinkNewSchool from "./Modal/LinkNewSchool";

export default class GradeDetailTable extends Component {
  state = {
    dataSource: [],
    dataSearch: [],
    schoolSearch: "",
    allSchool: [],
    tableLoading: true,
  };

  componentDidMount() {
    this.getSchoolByGradeID(this.props.gradeID);
    this.getAllSchool();
  }

  getAllSchool = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          allSchool: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getSchoolByGradeID = async (id) => {
    var gradeID = id;
    if (id === "") {
      gradeID = window.location.pathname.split("/")[2];
    }
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${gradeID}/school`)
      .then((res) => {
        this.setState({
          tableLoading: false,
          dataSource: res.data.length === 0 ? [] : res.data,
          dataSearch: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ tableLoading: false });
      });
  };

  disableLink = async (schoolID, status) => {
    let ids = [];
    let gradeID = window.location.pathname.split("/")[2];
    ids.push(gradeID);
    ids.push(schoolID);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/schoolGrade`, {
        ids: ids,
        status: status,
      })
      .then((res) => {
        console.log(res);
        this.getSchoolByGradeID(this.props.gradeID);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleDisableLink = (schoolID, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    this.disableLink(schoolID, message);
  };

  render() {
    const columns = [
      {
        title: "School",
        render: (record) => (
          <Link to={`/school/${record.id}`}>
            {record.schoolLevel === "PRIMARY" ? (
              <>TH {record.schoolName}</>
            ) : record.schoolLevel === "JUNIOR" ? (
              <>THCS {record.schoolName}</>
            ) : (
              <>THPT {record.schoolName}</>
            )}
          </Link>
        ),
      },
      {
        title: "School Code",
        dataIndex: "schoolCode",
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
      },
      {
        title: "Modified By",
        dataIndex: "modifiedBy",
      },
      {
        title: "Modified Date",
        dataIndex: "modifiedDate",
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
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
                  ? "Are you sure to disable this School?"
                  : "Are you sure to active this School?"
              }
              onConfirm={() => this.handleDisableLink(record.id, record.status)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Change Status</Button>
            </Popconfirm>
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this School?"
              onConfirm={() => this.handleDisableLink(record.id, "DELETED")}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger">Unlink</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

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
          <div>
            <LinkNewSchool
              data={this.state.dataSource}
              getSchoolByGradeID={this.getSchoolByGradeID}
              allSchool={this.state.allSchool}
            />
          </div>
        </div>
        <Table
          loading={this.state.tableLoading}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={this.state.dataSource}
          scroll={{ x: true }}
        />
      </Card>
    );
  }
}

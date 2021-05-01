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
  message,
} from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AddNewSchool from "./Modal/AddNewSchool";
import EditSchool from "./Modal/EditSchool";
import { getJwt } from "../../helper/jwt";

export default class SchoolComponent extends Component {
  state = {
    dataSource: [],
    dataSearch: [],
    schoolSearch: "",
    isLoading: true,
  };

  componentDidMount() {
    this.getAllSchool();
  }

  getAllSchool = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          dataSource: res.data.length === 0 ? [] : res.data,
          dataSearch: res.data.length === 0 ? [] : res.data,
        });
        this.setState({ isLoading: false });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  disableSchool = async (id, status) => {
    this.setState({ isLoading: true });
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/school/changeStatus`,
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.getAllSchool();
        this.setState({ isLoading: false });
        if (status === "DELETED") {
          message.success("Delete school successfully");
        } else {
          message.success("Change status successfully");
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ isLoading: false });
        if (e.response.data === "CANNOT DELETE") {
          message.error("Can not delete school with active student!");
        } else if (status === "ACTIVE" || status === "INACTIVE") {
          message.error("Fail to change status!");
        }
      });
  };

  handleDisableSchool = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    this.disableSchool(e, message);
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
        title: "Modified By",
        dataIndex: "modifiedBy",
      },
      {
        title: "Modified Date",
        dataIndex: "modifiedDate",
      },
      {
        title: "Status",
        align: "center",
        width: "10%",
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
                  ? "Are you sure to disable this School?"
                  : "Are you sure to active this School?"
              }
              onConfirm={() =>
                this.handleDisableSchool(record.id, record.status)
              }
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Change Status</Button>
            </Popconfirm>
            <EditSchool getAllSchool={this.getAllSchool} schoolID={record.id} />
            <Popconfirm
              placement="topRight"
              title={
                <span>
                  Are you sure to delete this Schools?
                  <br />
                  (This action will remove all linked grade, class and student.)
                </span>
              }
              onConfirm={() => this.handleDisableSchool(record.id, "DELETED")}
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

    return (
      <Card type="inner" title="School Management">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <AutoComplete>
            <Input.Search
              placeholder="Search a School"
              allowClear
              onSearch={(schoolSearch) =>
                this.setState({
                  dataSource: this.state.dataSearch?.filter(
                    (item) =>
                      item.schoolName
                        .toString()
                        .toLowerCase()
                        .includes(schoolSearch.toLowerCase()) ||
                      item.schoolCode
                        .toString()
                        .toLowerCase()
                        .includes(schoolSearch.toLowerCase())
                  ),
                })
              }
              enterButton
            />
          </AutoComplete>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <AddNewSchool
              getAllSchool={this.getAllSchool}
              //!BreadCrumbs
              getAllSchoolBC={this.props.getAllSchool}
            />
          </div>
        </div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={this.state.dataSource}
          scroll={{ x: true }}
          loading={this.state.isLoading}
        />
      </Card>
    );
  }
}

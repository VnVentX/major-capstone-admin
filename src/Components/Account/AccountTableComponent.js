import React, { Component } from "react";
import StudentAccountComponent from "./StundentAccountComponent";
import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const student = [
  {
    id: "1",
    firstName: "Đoàn",
    lastName: "Tuấn Đức",
    school: "Duương Minh Châu",
    account: "DMC_G1_01",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: "2",
    firstName: "Trương",
    lastName: "Thành Đạt",
    school: "Duương Minh Châu",
    account: "DMC_G1_02",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: "3",
    firstName: "Từ",
    lastName: "Thiệu Hào",
    school: "Duương Minh Châu",
    account: "DMC_G1_03",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: "4",
    firstName: "Trần",
    lastName: "Thiên Anh",
    school: "Duương Minh Châu",
    account: "DMC_G1_04",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

export class AccountTableComponent extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    axios({
      url: "https://randomuser.me/api",
      method: "get",
      type: "json",
      data: getRandomuserParams(params),
    }).then((data) => {
      this.setState({
        loading: false,
        data: data,
        pagination: {
          ...params.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Student's Account" key="1">
          <StudentAccountComponent data={student} />
        </TabPane>
      </Tabs>
    );
  }
}

export default AccountTableComponent;

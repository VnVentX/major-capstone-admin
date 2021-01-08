import React, { Component } from "react";
import TeacherAccountComponent from "./TeacherAccountComponent";
import StudentAccountComponent from "./StundentAccountComponent";
import axios from "axios";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const student = [
  {
    key: "1",
    site: "HCM",
    name: "Đoàn Tuấn Đức",
    school: "TH Major",
    account: "HCM_12_M_G1_01",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    key: "2",
    site: "HCM",
    name: "Trương Thành Đạt",
    school: "TH Major",
    account: "HCM_12_M_G1_02",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    key: "3",
    site: "HCM",
    name: "Từ Thiệu Hào",
    school: "TH Major",
    account: "HCM_12_M_G1_03",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    key: "4",
    site: "HCM",
    name: "Trần Thiên Anh",
    school: "TH Major",
    account: "HCM_12_M_G1_04",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
];
const teacher = [
  {
    key: "1",
    name: "Nguyễn Thị Kim Ngân",
    school: "TH Major",
    account: "HCM_12_M_nganntk",
    gender: "female",
    email: "nganntk@mockemail.com",
  },
  {
    key: "2",
    name: "Phạm Ngọc Anh",
    school: "TH Major",
    account: "HCM_12_M_anhpn",
    gender: "female",
    email: "anhpn@mockemail.com",
  },
  {
    key: "3",
    name: "Trần Gia Huy",
    school: "TH Major",
    account: "HCM_12_M_huytg",
    gender: "male",
    email: "huytg@mockemail.com",
  },
  {
    key: "4",
    name: "Trần Thế Hào",
    school: "TH Major",
    account: "HCM_12_M_haott",
    gender: "male",
    email: "haott@mockemail.com",
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

export class AccountTableComponent extends Component {
  state = {
    data: [],
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
        <TabPane tab="Teacher's Account" key="2">
          <TeacherAccountComponent data={teacher} />
        </TabPane>
      </Tabs>
    );
  }
}

export default AccountTableComponent;

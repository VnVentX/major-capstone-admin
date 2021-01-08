import React from "react";
import { Layout, Menu, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DashBoard from "./DashBoard";
import Account from "./Account";
import AccountDetail from "./AccountDetail";
import BreadcrumbComponent from "../Components/BreadcrumbComponent";
import Lesson from "./Lesson";
import QuestionBank from "./QuestionBank";

const { Header, Sider } = Layout;

export default class Home extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={this.state.currentPage}
            >
              <Menu.Item key="1">
                <Link to="">
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/">
                  <DashboardOutlined />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/account">
                  <UserOutlined />
                  <span>Account</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/lesson">
                  <BookOutlined />
                  <span>Lesson</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/question">
                  <BookOutlined />
                  <span>Question Bank</span>
                </Link>
              </Menu.Item>
              <div className="seperator"></div>
              <Menu.Item key="">
                <Link to="/">
                  <LogoutOutlined />
                  <span>Logout</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="header-account"
              style={{ background: "#fff", padding: 0 }}
            >
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
              <h1 style={{ marginRight: 25 }}>Welcome Admin</h1>
            </Header>
            <BreadcrumbComponent />
            <Row gutter={16} style={{ margin: 0 }}>
              <Switch>
                <Route path="/" exact component={DashBoard} />
                <Route path="/account" exact component={Account} />
                <Route path="/account/detail" exact component={AccountDetail} />
                <Route path="/lesson" exact component={Lesson} />
                <Route path="/question" exact component={QuestionBank} />
              </Switch>
            </Row>
          </Layout>
        </BrowserRouter>
      </Layout>
    );
  }
}

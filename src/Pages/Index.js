import React from "react";
import { Layout, Menu, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  BankOutlined,
  HomeOutlined,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";
import logo from "../Img/major-logo-2.jpg";
import logobig from "../Img/major-logo-long.svg";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DashBoard from "./DashBoard";
import Account from "./Account";
import AccountDetail from "./AccountDetail";
import BreadcrumbComponent from "../Components/BreadcrumbComponent";
import QuestionBank from "./QuestionBank";
import Home from "./Home";
import UnitDetail from "./UnitDetail";
import Subject from "./Subject";
import Unit from "./Unit";
import AddQuizQuestion from "./AddQuizQuestion";
import Notice from "./Notice";

const { Header, Sider } = Layout;

const { SubMenu } = Menu;

export default class Index extends React.Component {
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
            {this.state.collapsed === false ? (
              <div style={{ backgroundColor: "#26255f" }}>
                <img src={logobig} alt="major-logo" width="200" height="80" />
              </div>
            ) : (
              <img src={logo} alt="major-logo" width="80" height="80" />
            )}

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/notice">
                  <DashboardOutlined />
                  <span>Notice</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/account">
                  <UserOutlined />
                  <span>Account</span>
                </Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<BookOutlined />} title="Lesson">
                <Menu.Item key="5">
                  <Link to="/lesson/grade/1">Grade 1</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/lesson/grade/2">Grade 2</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/lesson/grade/3">Grade 3</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/lesson/grade/4">Grade 4</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to="/lesson/grade/5">Grade 5</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="10">
                <Link to="/question">
                  <BankOutlined />
                  <span>Question Bank</span>
                </Link>
              </Menu.Item>
              <div className="seperator"></div>
              <Menu.Item key="11">
                <Link to="">
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
                <Route path="/" exact component={Home} />
                {/* <Route path="/dashboard" exact component={DashBoard} /> */}
                <Route path="/notice" exact component={Notice} />
                <Route path="/account" exact component={Account} />
                <Route path="/account/detail" exact component={AccountDetail} />
                <Route path="/lesson" exact component={Home} />
                <Route path="/lesson/grade/1" exact component={Subject} />
                <Route path="/lesson/grade/2" exact component={Subject} />
                <Route path="/lesson/grade/3" exact component={Subject} />
                <Route path="/lesson/grade/4" exact component={Subject} />
                <Route path="/lesson/grade/5" exact component={Subject} />
                <Route path="/lesson/grade/1/math" exact component={Unit} />
                <Route
                  path="/lesson/grade/1/math/1"
                  exact
                  component={UnitDetail}
                />
                <Route
                  path="/lesson/grade/1/math/1/quiz"
                  exact
                  component={AddQuizQuestion}
                />
                <Route path="/question" exact component={QuestionBank} />
              </Switch>
            </Row>
          </Layout>
        </BrowserRouter>
      </Layout>
    );
  }
}

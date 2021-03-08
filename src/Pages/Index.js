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
import Lesson from "./Lesson";
import QuestionComponent from "../Components/Question/QuestionComponent";
import Grade from "./Grade";
import School from "./School";
import SchoolDetail from "./SchoolDetail";

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
                <Link to="/grade">
                  <DashboardOutlined />
                  <span>Grade</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/school">
                  <DashboardOutlined />
                  <span>School</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/account">
                  <UserOutlined />
                  <span>Account</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/subject">
                  <BookOutlined />
                  <span>Subject</span>
                </Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<BankOutlined />} title="Question Bank">
                <Menu.Item key="7">
                  <Link to="/exercise-question">Exercise</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/game-question">Game</Link>
                </Menu.Item>
              </SubMenu>
              <div className="seperator"></div>
              <Menu.Item key="9">
                <Link
                  to=""
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    this.props.history.push("/login");
                  }}
                >
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
                <Route path="/grade" exact component={Grade} />
                <Route path="/school" exact component={School} />
                <Route
                  path="/school/:schoolID"
                  exact
                  component={SchoolDetail}
                />
                <Route path="/account" exact component={Account} />
                <Route path="/account/detail" exact component={AccountDetail} />
                <Route path="/subject" exact component={Lesson} />
                <Route
                  path="/grade/:gradeID/subject"
                  exact
                  component={Subject}
                />
                <Route
                  path="/grade/:gradeID/subject/:subjectID"
                  exact
                  component={Unit}
                />
                <Route
                  path="/grade/:gradeID/subject/:subjectID/unit/:unitID"
                  exact
                  component={UnitDetail}
                />
                <Route
                  path="/grade/:gradeID/subject/:subjectID/unit/:unitID/excecise/:exceciseID"
                  exact
                  component={AddQuizQuestion}
                />
                <Route
                  path="/game-question"
                  exact
                  component={QuestionComponent}
                />
                <Route
                  path="/exercise-question"
                  exact
                  component={QuestionComponent}
                />
                <Route
                  path="/grade/:gradeID/game-question"
                  exact
                  component={QuestionBank}
                />
                <Route
                  path="/grade/:gradeID/exercise-question"
                  exact
                  component={QuestionBank}
                />
              </Switch>
            </Row>
          </Layout>
        </BrowserRouter>
      </Layout>
    );
  }
}

import React from "react";
import { Layout, Menu, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  BankOutlined,
  HomeOutlined,
  LogoutOutlined,
  BookOutlined,
} from "@ant-design/icons";
import logo from "../Img/major-logo-2.jpg";
import logobig from "../Img/major-logo-long.svg";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Account from "./Account";
import AccountDetail from "./AccountDetail";
import BreadcrumbComponent from "../Components/BreadcrumbComponent";
import QuestionBank from "./QuestionBank";
import Home from "./Home";
import UnitDetail from "./UnitDetail";
import Subject from "./Subject";
import AddQuizQuestion from "./AddQuizQuestion";
import Notice from "./Notice";
import QuestionComponent from "../Components/Question/QuestionComponent";
import Grade from "./Grade";
import School from "./School";
import SchoolDetail from "./SchoolDetail";
import GradeDetail from "./GradeDetail";
import SubjectDetail from "./SubjectDetail";
import AddGameQuestion from "./AddGameQuestion";

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
              <SubMenu key="sub1" icon={<DashboardOutlined />} title="Manage">
                <Menu.Item key="2">
                  <Link to="/notice">
                    <span>News</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/grade">
                    <span>Grade</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/school">
                    <span>School</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/student">
                    <span>Student</span>
                  </Link>
                </Menu.Item>
              </SubMenu>
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
                <Route path="/notice" exact component={Notice} />
                <Route path="/grade" exact component={Grade} />
                <Route path="/grade/:gradeID" exact component={GradeDetail} />
                <Route path="/school" exact component={School} />
                <Route
                  path="/school/:schoolID"
                  exact
                  component={SchoolDetail}
                />
                <Route path="/student" exact component={Account} />
                <Route
                  path="/student/:studentID"
                  exact
                  component={AccountDetail}
                />
                <Route path="/subject" exact component={Subject} />
                <Route
                  path="/subject/:subjectID"
                  exact
                  component={SubjectDetail}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID"
                  exact
                  component={UnitDetail}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID/excecise/:exceciseID"
                  exact
                  component={AddQuizQuestion}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID/game/:gameID"
                  exact
                  component={AddGameQuestion}
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

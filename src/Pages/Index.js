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
import ExerciseQuestionBank from "./ExerciseQuestionBank";
import GameQuestionBank from "./GameQuestionBank";

const { Header, Sider } = Layout;

const { SubMenu } = Menu;

const grade = [
  {
    id: 1,
    gradeName: "Grade 1",
  },
  {
    id: 2,
    gradeName: "Grade 2",
  },
  {
    id: 3,
    gradeName: "Grade 3",
  },
  {
    id: 4,
    gradeName: "Grade 4",
  },
  {
    id: 5,
    gradeName: "Grade 5",
  },
];

export default class Index extends React.Component {
  state = {
    collapsed: false,
    activePath: "",
    activeSub: [],
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentWillMount() {
    var path = window.location.pathname.split("/")[1];
    var gradePath = window.location.pathname.split("/")[2];
    if (path === "") {
      this.setState({ activePath: "1" });
    } else if (path === "news") {
      this.setState({ activePath: "2", activeSub: ["sub1"] });
    } else if (path === "school") {
      this.setState({ activePath: "4", activeSub: ["sub1"] });
    } else if (path === "student") {
      this.setState({ activePath: "5", activeSub: ["sub1"] });
    } else if (path === "grade" && gradePath === "1") {
      this.setState({ activePath: "20", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "2") {
      this.setState({ activePath: "21", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "3") {
      this.setState({ activePath: "22", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "4") {
      this.setState({ activePath: "23", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "5") {
      this.setState({ activePath: "24", activeSub: ["sub1", "sub3"] });
    } else if (path === "subject") {
      this.setState({ activePath: "6" });
    }
  }

  handleClickMenuItem = (e) => {
    this.setState({ activePath: e.key });
  };

  handleClickSubMenu = (e) => {
    if (this.state.activeSub.length > 0) {
      var arr = Array.from(this.state.activeSub);
      if (arr.find((element) => element === e.key)) {
        arr = arr.filter((item) => {
          return item !== e.key;
        });
        this.setState({ activeSub: arr });
      } else {
        this.setState({ activeSub: [...this.state.activeSub, ...[e.key]] });
      }
    } else this.setState({ activeSub: [...this.state.activeSub, ...[e.key]] });
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
              inlineCollapsed={this.state.collapsed}
              selectedKeys={[this.state.activePath]}
              openKeys={this.state.activeSub}
              onClick={this.handleClickMenuItem}
            >
              <Menu.Item key="1">
                <Link to="/">
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                icon={<DashboardOutlined />}
                title="Manage"
                onTitleClick={this.handleClickSubMenu}
              >
                <Menu.Item key="2">
                  <Link to="/news">
                    <span>News</span>
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="sub3"
                  title="Grade"
                  onTitleClick={this.handleClickSubMenu}
                >
                  {grade?.map((i, idx) => (
                    <Menu.Item key={idx + 20}>
                      <Link to={`/grade/${i.id}`}>
                        <span>{i.gradeName}</span>
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
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
              <SubMenu
                key="sub2"
                icon={<BankOutlined />}
                title="Question Bank"
                onTitleClick={this.handleClickSubMenu}
              >
                <Menu.Item key="7">
                  <Link to="/exercise-question">Exercise Questions</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/game-question">Game Questions</Link>
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
                <Route path="/news" exact component={Notice} />
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
                  path="/grade/:gradeID/exercise-question"
                  exact
                  component={ExerciseQuestionBank}
                />
                <Route
                  path="/grade/:gradeID/game-question"
                  exact
                  component={GameQuestionBank}
                />
              </Switch>
            </Row>
          </Layout>
        </BrowserRouter>
      </Layout>
    );
  }
}

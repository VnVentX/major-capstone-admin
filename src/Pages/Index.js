import React from "react";
import axios from "axios";
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
import { Breadcrumb } from "antd";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import logo from "../Img/major-logo-2.jpg";
import logobig from "../Img/major-logo-long.svg";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Account from "./Account";
import AccountDetail from "./AccountDetail";
import Home from "./Home";
import UnitDetail from "./UnitDetail";
import ProcessTestDetail from "./ProgressTestDetail";
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
import AddTestQuestion from "./AddTestQuestion";
import Page404 from "./Page404";
import { getJwt, getRole } from "../helper/jwt";
import Staff from "./Staff";

const { Header, Sider } = Layout;

const { SubMenu } = Menu;

export default class Index extends React.Component {
  state = {
    collapsed: false,
    activePath: "",
    activeSub: [],
    grade: [],
    gradePath: "",
    gradeNameByID: {},
    schoolNameByID: {},
    subjectNameByID: {},
    unitNameByID: {},
    progressTestNameByID: {},
    exerciseNameByID: {},
    gameNameByID: {},
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount() {
    this.getAllGrade();
    this.getAllSchool();
    this.getAllSubject();
    this.getAllUnit();
    this.getAllProgressTest();
    this.getAllExercise();
    this.getAllGame();
  }
  componentWillMount() {
    this.activeMenu();
  }
  activeMenu = () => {
    var path = window.location.pathname.split("/")[1];
    var gradePath = window.location.pathname.split("/")[2];
    if (path === "") {
      this.setState({ activePath: "home" });
    } else if (path === "news") {
      this.setState({ activePath: "news", activeSub: ["sub1"] });
    } else if (path === "school") {
      this.setState({ activePath: "school", activeSub: ["sub1"] });
    } else if (path === "student") {
      this.setState({ activePath: "student", activeSub: ["sub1"] });
    } else if (path === "grade" && gradePath === "1") {
      this.setState({ activePath: "20", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "5") {
      this.setState({ activePath: "21", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "2") {
      this.setState({ activePath: "22", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "4") {
      this.setState({ activePath: "23", activeSub: ["sub1", "sub3"] });
    } else if (path === "grade" && gradePath === "3") {
      this.setState({ activePath: "24", activeSub: ["sub1", "sub3"] });
    } else if (path === "subject") {
      this.setState({ activePath: "subject" });
    } else if (path === "exercise-question") {
      this.setState({ activePath: "exercise-question", activeSub: ["sub2"] });
    } else if (path === "game-question") {
      this.setState({ activePath: "game-question", activeSub: ["sub2"] });
    }
  };
  getAllGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/all`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          let key = item.id;
          let value = "Grade " + item.gradeName;
          this.setState({
            gradeNameByID: {
              ...this.state.gradeNameByID,
              [key]: value,
            },
          });
        });
        this.setState({
          grade: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllSchool = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          let key = item.id;
          let value = item.schoolName;
          this.setState({
            schoolNameByID: {
              ...this.state.schoolNameByID,
              [key]: value,
            },
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllSubject = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/breadcrumb/subject`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          subjectNameByID: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllUnit = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/breadcrumb/unit`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          unitNameByID: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllProgressTest = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/breadcrumb/progressTest`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          progressTestNameByID: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllExercise = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/breadcrumb/exercise`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          exerciseNameByID: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getAllGame = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/breadcrumb/game`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        this.setState({
          gameNameByID: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleClickMenuItem = (e) => {
    var gradePath = window.location.pathname.split("/")[2];
    this.setState({ activePath: e.key, gradePath: gradePath });
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
    const gradeNamesByID = this.state.gradeNameByID;
    const schoolNameByID = this.state.schoolNameByID;
    const subjectNameByID = this.state.subjectNameByID;
    const unitNameByID = this.state.unitNameByID;
    const progressTestNameByID = this.state.progressTestNameByID;
    const exerciseNameByID = this.state.exerciseNameByID;
    const gameNameByID = this.state.gameNameByID;

    const DynamicGradeBreadcrumb = ({ match }) => (
      <span>{gradeNamesByID[match.params.gradeID]}</span>
    );
    const DynamicSchoolBreadcrumb = ({ match }) => (
      <span>{schoolNameByID[match.params.schoolID]}</span>
    );
    const DynamicSubjectBreadcrumb = ({ match }) => (
      <span>{subjectNameByID[match.params.subjectID]}</span>
    );
    const DynamicUnitBreadcrumb = ({ match }) => (
      <span>Unit {unitNameByID[match.params.unitID]}</span>
    );
    const DynamicProgressTestBreadcrumb = ({ match }) => (
      <span>{progressTestNameByID[match.params.progressID]}</span>
    );
    const DynamicExerciseBreadcrumb = ({ match }) => (
      <span>Exercise {exerciseNameByID[match.params.exerciseID]}</span>
    );
    const DynamicGameBreadcrumb = ({ match }) => (
      <span>Game {gameNameByID[match.params.gameID]}</span>
    );

    const routes = [
      { path: "/school/:schoolID", breadcrumb: DynamicSchoolBreadcrumb },
      { path: "/subject/:subjectID", breadcrumb: DynamicSubjectBreadcrumb },
      { path: "/subject/:subjectID/unit", breadcrumb: null },
      {
        path: "/subject/:subjectID/unit/:unitID",
        breadcrumb: DynamicUnitBreadcrumb,
      },
      { path: "/subject/:subjectID/unit/:unitID/game", breadcrumb: null },
      { path: "/subject/:subjectID/unit/:unitID/exercise", breadcrumb: null },
      {
        path: "/subject/:subjectID/unit/:unitID/game/:gameID",
        breadcrumb: DynamicGameBreadcrumb,
      },
      {
        path: "/subject/:subjectID/unit/:unitID/exercise/:exerciseID",
        breadcrumb: DynamicExerciseBreadcrumb,
      },
      { path: "/subject/:subjectID/progress-test", breadcrumb: null },
      {
        path: "/subject/:subjectID/progress-test/:progressID",
        breadcrumb: DynamicProgressTestBreadcrumb,
      },
      {
        path: "/subject/:subjectID/progress-test/:progressID/exercise",
        breadcrumb: null,
      },
      {
        path:
          "/subject/:subjectID/progress-test/:progressID/exercise/:exerciseID",
        breadcrumb: DynamicExerciseBreadcrumb,
      },
      {
        path: "/grade/:gradeID",
        breadcrumb: DynamicGradeBreadcrumb,
      },
      { path: "/exercise-question", breadcrumb: "Exercise Question" },
      {
        path: "/exercise-question/:gradeID",
        breadcrumb: DynamicGradeBreadcrumb,
      },
      { path: "/game-question", breadcrumb: "Game Question" },
      { path: "/game-question/:gradeID", breadcrumb: DynamicGradeBreadcrumb },
      {
        path: "/subject/:subjectID/progress-test",
        breadcrumb: "Progress Test",
      },
    ];

    const BreadcrumbComponent = withBreadcrumbs(routes)(({ breadcrumbs }) => (
      <Breadcrumb separator=">" style={{ margin: "16px 0 0 25px" }}>
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Breadcrumb.Item key={match.url}>
            <Link to={match.url}>{breadcrumb}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    ));

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
              <Menu.Item key="home">
                <Link to="/">
                  <HomeOutlined />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              {getRole() === "admin" && (
                <SubMenu
                  key="sub1"
                  icon={<DashboardOutlined />}
                  title="Manage"
                  onTitleClick={this.handleClickSubMenu}
                >
                  <Menu.Item key="news">
                    <Link to="/news">
                      <span>News</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="school" id="school">
                    <Link to="/school">
                      <span>School</span>
                    </Link>
                  </Menu.Item>
                  <SubMenu
                    key="sub3"
                    title="Grade"
                    onTitleClick={this.handleClickSubMenu}
                  >
                    {this.state.grade?.map((i, idx) => (
                      <Menu.Item key={idx + 20} id={`grade${idx + 1}`}>
                        <Link
                          to={{
                            pathname: `/grade/${i.id}`,
                          }}
                        >
                          <span>Grade {i.gradeName}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                  <Menu.Item key="student" id="student">
                    <Link to="/student">
                      <span>Student</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="staff" id="staff">
                    <Link to="/staff">
                      <span>Staff</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              <Menu.Item key="subject">
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
                <Menu.Item key="exercise-question">
                  <Link to="/exercise-question">Exercise Questions</Link>
                </Menu.Item>
                <Menu.Item key="game-question">
                  <Link to="/game-question">Game Questions</Link>
                </Menu.Item>
              </SubMenu>
              <div className="seperator"></div>
              <Menu.Item key="9">
                <Link
                  to=""
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    localStorage.removeItem("role");
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
              <h1 style={{ marginRight: 25 }}>
                {getRole() === "admin" ? "Welcome Admin" : "Welcome Staff"}
              </h1>
            </Header>
            <BreadcrumbComponent />
            <Row gutter={16} style={{ margin: 0 }}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/news" exact component={Notice} />
                <Route path="/grade" exact component={Grade} />
                <Route
                  path="/grade/:gradeID"
                  exact
                  component={() => (
                    <GradeDetail gradeID={this.state.gradePath} />
                  )}
                />
                <Route
                  path="/school"
                  exact
                  render={() => <School getAllSchool={this.getAllSchool} />}
                />
                <Route
                  path="/school/:schoolID"
                  exact
                  render={() => <SchoolDetail activeMenu={this.activeMenu} />}
                />
                <Route
                  path="/student"
                  exact
                  render={() => <Account activeMenu={this.activeMenu} />}
                />
                <Route
                  path="/student/:studentID"
                  exact
                  component={AccountDetail}
                />
                <Route
                  path="/subject"
                  exact
                  render={() => <Subject getAllSubject={this.getAllSubject} />}
                />
                <Route
                  path="/subject/:subjectID"
                  exact
                  render={() => (
                    <SubjectDetail
                      getAllUnit={this.getAllUnit}
                      getAllProgressTest={this.getAllProgressTest}
                    />
                  )}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID"
                  exact
                  render={() => (
                    <UnitDetail
                      getAllExercise={this.getAllExercise}
                      getAllGame={this.getAllGame}
                    />
                  )}
                />
                <Route
                  path="/subject/:subjectID/progress-test/:progressID"
                  exact
                  render={() => (
                    <ProcessTestDetail getAllExercise={this.getAllExercise} />
                  )}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID/exercise/:exerciseID"
                  exact
                  component={AddQuizQuestion}
                />
                <Route
                  path="/subject/:subjectID/unit/:unitID/game/:gameID"
                  exact
                  component={AddGameQuestion}
                />
                <Route
                  path="/subject/:subjectID/progress-test/:progressID/exercise/:testID"
                  exact
                  component={AddTestQuestion}
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
                  path="/exercise-question/:gradeID"
                  exact
                  component={ExerciseQuestionBank}
                />
                <Route
                  path="/game-question/:gradeID"
                  exact
                  component={GameQuestionBank}
                />
                <Route path="/staff" exact component={Staff} />
                <Route exact component={Page404} />
              </Switch>
            </Row>
          </Layout>
        </BrowserRouter>
      </Layout>
    );
  }
}

import { Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";

const breadcrumbNameMap = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/account": "Account",
  "/account/detail": "User Detail",
  "/lesson": "Lesson",
  "/lesson/grade": "Grade",
  "/lesson/grade/1": "1",
  "/lesson/grade/2": "2",
  "/lesson/grade/3": "3",
  "/lesson/grade/4": "4",
  "/lesson/grade/5": "5",
  "/lesson/grade/1/subject": "Subject",
  "/lesson/grade/2/subject": "Subject",
  "/lesson/grade/3/subject": "Subject",
  "/lesson/grade/4/subject": "Subject",
  "/lesson/grade/5/subject": "Subject",
  "/lesson/grade/1/math": "Math",
  "/lesson/grade/2/math": "Math",
  "/lesson/grade/3/math": "Math",
  "/lesson/grade/4/math": "Math",
  "/lesson/grade/5/math": "Math",
  "/lesson/grade/1/math/1": "1",
  "/lesson/grade/2/math/1": "1",
  "/lesson/grade/3/math/1": "1",
  "/lesson/grade/4/math/1": "1",
  "/lesson/grade/5/math/1": "1",
  "/lesson/grade/1/math/1/quiz": "Quiz",
  "/question": "Question",
  "/question/grade": "Grade",
  "/question/grade/1": "1",
  "/question/grade/2": "2",
  "/question/grade/3": "3",
  "/question/grade/4": "4",
  "/question/grade/5": "5",
};
const BreadcrumbComponent = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0 0 25px" }}>
        {breadcrumbItems}
      </Breadcrumb>
    </>
  );
});

export default BreadcrumbComponent;

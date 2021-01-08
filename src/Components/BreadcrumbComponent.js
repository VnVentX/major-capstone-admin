import { Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";

const breadcrumbNameMap = {
  "/account": "Account",
  "/account/detail": "User Detail",
  "/lesson": "Lesson",
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
  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="dashboard">
  //     <Link to="/">Dashboard</Link>
  //   </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0 0 25px" }}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    </>
  );
});

export default BreadcrumbComponent;

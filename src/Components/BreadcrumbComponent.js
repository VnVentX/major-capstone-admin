import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

const userNamesById = { 1: "John", 2: "Mike" };
const classNamesById = { 1: "Class 1", 2: "Class 2" };
const schoolNamesById = { 1: "Duong Minh Chau", 2: "Mac Dinh Chi" };

const DynamicUserBreadcrumb = ({ match }) => (
  <span>{userNamesById[match.params.userID]}</span>
);
const DynamicClassBreadcrumb = ({ match }) => (
  <span>{classNamesById[match.params.classID]}</span>
);
const DynamicSchoolBreadcrumb = ({ match }) => (
  <span>{schoolNamesById[match.params.schoolID]}</span>
);

const routes = [
  { path: "/school/:schoolID", breadcrumb: DynamicSchoolBreadcrumb },
  {
    path: "/school/:schoolID/class/:classID",
    breadcrumb: DynamicClassBreadcrumb,
  },
  {
    path: "/school/:schoolID/class/:classID/users/:userID",
    breadcrumb: DynamicUserBreadcrumb,
  },
  { path: "/exercise-question", breadcrumb: "Exercise Question" },
  { path: "/game-question", breadcrumb: "Game Question" },
  { path: "/subject/:subjectID/progress-test", breadcrumb: "Progress Test" },
];

const BreadcrumbComponent = withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <Breadcrumb separator=">" style={{ margin: "16px 0 0 25px" }}>
    {breadcrumbs.map(({ match, breadcrumb }, idx) => {
      if (idx + 1 === breadcrumbs.length) {
        return (
          <Breadcrumb.Item key={match.url}>
            <Link to={match.url}>{breadcrumb}</Link>
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item key={match.url}>
            <Link to={match.url}>{breadcrumb}</Link>
          </Breadcrumb.Item>
        );
      }
    })}
  </Breadcrumb>
));

export default BreadcrumbComponent;

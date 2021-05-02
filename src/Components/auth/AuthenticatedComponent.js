import React, { Component } from "react";
import { getJwt } from "../../helper/jwt";
import { withRouter } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";

class AuthenticatedConponent extends Component {
  state = {
    role: "",
  };

  componentDidMount() {
    const jwt = getJwt();
    if (!jwt) {
      this.props.history.push("/login");
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/credential?token=${
            jwt?.split(" ")[1]
          }`,
          {
            headers: {
              Authorization: getJwt(),
            },
          }
        )
        .then((res) => {
          //item storage phải ở trước setState
          localStorage.setItem("id", res.data.accountId);
          localStorage.setItem("role", res.data.description);
          this.setState({
            role: res.data.description,
          });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("role");
          this.props.history.push("/login");
        });
    }
  }

  render() {
    if (!this.state.role) {
      return (
        <div>
          <h1
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </h1>
          ;
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedConponent);

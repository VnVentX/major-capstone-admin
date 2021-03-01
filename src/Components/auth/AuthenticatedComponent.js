import React, { Component } from "react";
import { getJwt, getID } from "../../helper/jwt";
import { withRouter } from "react-router-dom";
// import axios from "axios";

class AuthenticatedConponent extends Component {
  state = {
    user: "",
  };

  async componentDidMount() {
    const jwt = getJwt();
    // localStorage.setItem("token", "this is token");
    if (!jwt) {
      await this.props.history.push("/login");
    }
    localStorage.setItem("user", "user");
    this.setState({
      user: "user",
    });

    // await axios
    //   .get("https://mffood.herokuapp.com/api/users/" + id, {
    //     headers: {
    //       token: jwt,
    //     },
    //   })
    //   .then((res) => {
    //     //item storage phải ở trước setState
    //     localStorage.setItem("user", res.data.email);
    //     this.setState({
    //       user: res.data.email,
    //     });
    //   })
    //   .catch((err) => this.props.history.push("/login"));
  }

  render() {
    if (this.state.user === "") {
      return (
        <div>
          <h1>Loading...</h1>;
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthenticatedConponent);

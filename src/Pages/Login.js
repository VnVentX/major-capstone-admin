import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("token")) {
    props.history.push("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    await axios
      .post(
        "https://mathscienceeducation.herokuapp.com/account/login",
        formData
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === 0) {
          props.history.push("/login");
        }
        localStorage.setItem("token", "token");
        localStorage.setItem("id", res.data);
        // localStorage.setItem("role", res.data.userRoleDTO);
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <form className="login-form" onSubmit={onSubmit}>
        <h1>Major Education</h1>
        <div className="txtb">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="txtb">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input type="submit" className="logbtn" value="Login"></input>
      </form>
    </div>
  );
}

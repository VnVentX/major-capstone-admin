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
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, {
        password,
        username,
      })
      .then((res) => {
        if (res.data === "") {
          props.history.push("/login");
        } else {
          localStorage.setItem("token", "Bearer " + res.data);
          props.history.push("/");
        }
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

import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (localStorage.getItem("token")) {
    props.history.push("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", "admin");
    formData.append("password", "12345678");
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/login`, formData)
      .then((res) => {
        if (res.data === "") {
          props.history.push("/login");
        } else {
          localStorage.setItem("token", "Bearer " + res.data);
          props.history.push("/");
        }
        setError(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
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
            value="admin"
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
            value="12345678"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <h4>Username or password is incorrect</h4>}
        <input type="submit" className="logbtn" value="Login"></input>
      </form>
    </div>
  );
}

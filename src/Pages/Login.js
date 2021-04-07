import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("token")) {
    props.history.push("/");
  }
  const onSubmit = async (e) => {
    if (username === "admin" && password === "12345678") {
      localStorage.setItem("token", "token");
      props.history.push("/");
    }
    // await axios
    //   .post("https://mffood.herokuapp.com/api/users/login?isGmail=false", {
    //     email,
    //     password,
    //   })
    //   .then((res) => {
    //     if (
    //       res.data.userRoleDTO !== "ROLE_STOREADMIN" ||
    //       res.data.userRoleDTO !== "ROLE_ADMIN"
    //     ) {
    //       props.history.push("/login");
    //     }
    //     localStorage.setItem("token", res.data.tokenJWT);
    //     localStorage.setItem("id", res.data.idUser);
    //     localStorage.setItem("role", res.data.userRoleDTO);
    //     props.history.push("/order");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    e.preventDefault();
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

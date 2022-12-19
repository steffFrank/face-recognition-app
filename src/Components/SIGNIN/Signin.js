import React, { useState } from "react";
import "./signin.css";

export const Signin = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
    <main className="main">
      <form className="main__form">
        <h2>Sign In</h2>
        <label htmlFor="email">Email</label>
        <input
          onChange={onEmailChange}
          name="email"
          id="email"
          type="email"
          placeholder="me@example.test"
          autoComplete="username"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          onChange={onPasswordChange}
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
        ></input>
        <button onClick={onSubmitSignin} className="btn btn__signin">
          Sign in
        </button>
        <button
          type="button"
          onClick={() => onRouteChange("register")}
          className="btn btn__register"
        >
          Register
        </button>
      </form>
    </main>
  );
};

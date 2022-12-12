import React from "react";
import "./signin.css";

export const Signin = ({onRouteChange}) => {
    return (
        <main className="main">
            <form className="main__form">
                <h2>Sign In</h2>
                <label htmlFor="email">Email</label>
                <input name="email" id="email" type="email" placeholder="me@example.test" autoComplete="username"></input>
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="password" autoComplete="current-password"></input>
                <button onClick={() => onRouteChange("signin")} className="btn btn__signin">Sign in</button>
                <button onClick={() => onRouteChange("register")} className="btn btn__register">Register</button>
            </form>
        </main>
    )
}
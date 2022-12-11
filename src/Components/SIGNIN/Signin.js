import React from "react";
import "./signin.css";

export const Singin = () => {
    return (
        <main className="main">
            <form className="main__form">
                <h2>Sign In</h2>
                <label for="email">Email</label>
                <input name="email" id="email" type="email"></input>
                <label for="password">Password</label>
                <input name="password" id="password" type="password"></input>
                <button className="btn btn__signin">Sign in</button>
                <button className="btn btn__register">Register</button>
            </form>
        </main>
    )
}
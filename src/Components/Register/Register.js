import React from "react";
import "../SIGNIN/signin.css";


export const Register = ({onRouteChange}) => {
    return (
        <main className="main">
            <form className="main__form">
                <h2>Register</h2>
                <label htmlFor="first_name">Firstname</label>
                <input name="first_name" className="first_name" type="text" autoComplete="username"></input>
                <label htmlFor="last_name">Lastname</label>
                <input name="last_name" className="last_name" type="text" autoComplete="username"></input>
                <label htmlFor="email">Email</label>
                <input name="email" className="email" type="email" autoComplete="username"></input>
                <label htmlFor="password">Password</label>
                <input name="password" className="password" autoComplete="new-password" type="password"></input>
                <button onClick={() => onRouteChange("home")} className="btn btn__signin">Register</button>
            </form>
        </main>
    )
}
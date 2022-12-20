import React, { useState } from "react";
import "../SIGNIN/signin.css";


export const Register = ({onRouteChange, loadUser}) => {
    const [register, setRegister] = useState({name:"", email:"", password:""});

    const onNameChange = (event) => {
        setRegister(prevState => {
            return {...prevState, name:event.target.value}
        })
    }

    const onEmailChange = (event) => {
        setRegister(prevState => {
            return {...prevState, email:event.target.value}
        })
    }
    const onPasswordChange = (event) => {
        setRegister(prevState => {
            return {...prevState, password:event.target.value}
        })
    }

    const onSubmitChange = (event) => {
        event.preventDefault();
        fetch("http://localhost:3001/register", {
            method: "post",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(register)
        }).then(response => response.json())
          .then(user => {
            if (user) {
                loadUser(user);
                onRouteChange("signin");
            }
          });

    }

    return (
        <main className="main" >
            <form className="main__form">
                <h2>Register</h2>
                {/* <label htmlFor="first_name">Firstname</label>
                <input name="first_name" className="first_name" type="text" autoComplete="username"></input> */}
                <label htmlFor="last_name">Name</label>
                <input onChange={onNameChange} name="last_name" className="last_name" type="text" autoComplete="username"></input>
                <label htmlFor="email">Email</label>
                <input onChange={onEmailChange} name="email" className="email" type="email" autoComplete="username"></input>
                <label htmlFor="password">Password</label>
                <input onChange={onPasswordChange} name="password" className="password" autoComplete="new-password" type="password"></input>
                <button  onClick={onSubmitChange} className="btn btn__signin">Register</button>
            </form>
        </main>
    )
}
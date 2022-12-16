import React from "react";
import "./navigation.css";

export const Navigation = ({onRouteChange, route}) => {

    return (
        <nav className="nav">
            <p onClick={() => onRouteChange("signin")} className="nav__signing">{route === "signin" || route === "register" ? `Sign In` : `Sign Out`}</p>
            {route === "signin" && <p onClick={() => onRouteChange("register")} className="nav__signing">Register</p> }
        </nav>
    )
}
import React from "react";
import "./navigation.css";

export const Navigation = ({onRouteChange, route}) => {

    return (
        <nav className="nav">
            <p onClick={() => onRouteChange("home")} className="nav__signing">{route === "home" || route === "register" ? `Sign In` : `Sign Out`}</p>
            {route === "home" && <p onClick={() => onRouteChange("register")} className="nav__signing">Register</p> }
        </nav>
    )
}
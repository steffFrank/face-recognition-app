import React from "react";
import "./logo.css";
import Tilt from "react-parallax-tilt";

export const Logo = () => {
    return (
        <Tilt>
            <div className="logo">
                <img src={require("./artificial_brain.png")} alt="Articificial brain"/>
            </div>
        </Tilt>
    )
}
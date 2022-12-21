import React from "react";
import "./rank.css";


export const Rank = ({user}) => {
    return (
        <div className="rank">
            <h1>{user.name[0].toUpperCase() + user.name.substring(1)}, your entry count is :</h1>
            <h2>{user.entries}</h2>
        </div>
    )
}
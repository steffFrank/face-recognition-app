import React from "react";
import "./rank.css";


export const Rank = ({user}) => {
    return (
        <div className="rank">
            <h1>{user.name}, your number of entry is :</h1>
            <h2>#{user.entries}</h2>
        </div>
    )
}
import React from "react";
import "./input.css";


export const Input = () => {
    return (
        <div className="form">
            <p>The magic brain will detect faces in your pictures.Give it a try</p>
            <div>
                <input className="form__input"></input>
                <button className="form__button">Detect</button>    
            </div>
            
        </div>
    )
}
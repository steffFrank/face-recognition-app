import React from "react";
import "./input.css";
import { Rank } from "../Rank/Rank";

export const Input = ({onSubmit, input, onInputChange}) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            <Rank />
            <p>The magic brain will detect faces in your pictures.Give it a try</p>
            <div>
                <input type="text" value={input} onChange={onInputChange} className="form__input"></input>
                <button type="submit" className="btn form__button">Detect</button>    
            </div>
        </form>
    )
}
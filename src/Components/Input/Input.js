import React from "react";
import "./input.css";

export const Input = ({onSubmit, input, onInputChange}) => {
    return (
        <form className="form" >
            <p>The magic brain will detect faces in your pictures.Give it a try</p>
            <div>
                <input type="text" value={input} onChange={onInputChange} className="form__input"></input>
                <button type="submit" onClick={onSubmit} disabled={input ? false : true} className="btn form__button">Detect</button>    
            </div>
        </form>
    )
}
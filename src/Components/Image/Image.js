import React from "react";
import "./image.css";


export const Image = ({imageInput, boxRecognition}) => {
    
    return (
        boxRecognition.top_row ? <div className="img-box">
                <img id="image" src={imageInput} alt="a random face" />
                <div className="box"></div>
        </div> :
        <div className="img-box__message">Please enter a correct URL</div>
    )
}


import React from "react";
import "./image.css";


export const Image = ({imageInput, boxRecognition}) => {

     // Use after the image loaded
  const onLoad = () => {
    const img_div = document.getElementById("img-box");
    const box = document.createElement("div");
    img_div.appendChild(box);
    box.style.position = "absolute";
    box.style.boxShadow = "0 0 0 3px aqua inset";
    box.style.top = `${boxRecognition.top_row * 100}%`;
    box.style.left = `${(boxRecognition.left_col * 100)}%`;
    box.style.right = `${100 - (boxRecognition.right_col * 100)}%`;
    box.style.bottom = `${100 - (boxRecognition.bottom_row * 100)}%`;
    box.style.cursor = "pointer";
    
  }

    return (
        boxRecognition.top_row ? <div className="img-box" id="img-box">
                <img id="image" onLoad={() => onLoad()} src={imageInput} alt="a random face" />
        </div> :
        <div className="img-box__message">Please enter a correct URL</div>
    )
}


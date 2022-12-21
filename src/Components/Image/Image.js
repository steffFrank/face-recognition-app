import React from "react";
import "./image.css";


export const Image = ({imageInput, boxRecognition}) => {

     // Use after the image loaded
  const onLoad = () => {
    const img_div = document.getElementById("img-box");
  
    boxRecognition.forEach(item => {
      const box = document.createElement("div"); 
      box.className = "box-detect";
      box.style.top = `${item.region_info.bounding_box.top_row * 100}%`;
      box.style.left = `${(item.region_info.bounding_box.left_col * 100)}%`;
      box.style.right = `${100 - (item.region_info.bounding_box.right_col * 100)}%`;
      box.style.bottom = `${100 - (item.region_info.bounding_box.bottom_row * 100)}%`;
      img_div.appendChild(box);
    });
  }

    return (
        boxRecognition !== undefined ? <div className="img-box" id="img-box">
                <img id="image" onLoad={() => onLoad()} src={imageInput} alt="a random face" />
        </div> :
        <div className="img-box__message">Please enter a valid URL</div>
    )
}


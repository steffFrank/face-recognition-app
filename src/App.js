import React, {useState} from "react";
import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Image } from "./Components/Image/Image";
import { Input } from "./Components/Input/Input";
import { Logo } from "./Components/Logo/Logo";

export const App = () => {

    const [input , setInput] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [boxRecognition, setBoxRecognition] = useState({});

    const USER_ID = process.env.REACT_APP_USER_ID;
    const PAT = process.env.REACT_APP_PAT;
    const APP_ID = process.env.REACT_APP_APP_ID;
    const MODEL_ID = process.env.REACT_APP_MODEL_ID;
    const MODEL_VERSION_ID = process.env.REACT_APP_MODEL_VERSION_ID;    
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

    // Fecth body
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    // Fetch options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // Fetch function
    const fetchUrl = async () => {
        try {
          const url = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

          const response = await fetch(url, requestOptions)
          const result = await response.json();
          console.log(result);
          setBoxRecognition(result.outputs[0].data.regions[0].region_info.bounding_box);
          return true; // Cross-origin, chromium project
        }catch(error) {
          console.log(error);
        }
    }
  
  // Use after the image loaded
  const detectFaceOnImage = () => {
    const image = document.getElementById("image");
    const img_div = document.getElementById("img-box");
    const box = document.createElement("div");
    img_div.appendChild(box);
    const imgWidth = Number(image.clientWidth);
    const imgHeight = Number(image.clientHeight);
    box.style.position = "absolute";
    // box.style.width = "200px";
    // box.style.height = "100px";
    // box.style.border = "1px solid #149df2";
    box.style.boxShadow = "0 0 0 3px #149df2 inset";
    // box.style.display = "flex";
    // box.style.justifyContent = "center";
    // box.style.flexWrap = "wrap";
    box.style.top = `${boxRecognition.top_row * imgHeight}px`;
    console.log(box);
    box.style.left = `${imgWidth - (boxRecognition.left_col * imgWidth)}px`;
    box.style.right = `${imgWidth - (boxRecognition.right_col * imgWidth)}px`;
    box.style.bottom = `${imgHeight - (boxRecognition.bottom_row * imgHeight)}px`;
    box.style.cursor = "pointer";
    
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    fetchUrl();
    setImageSrc(input);
    setBoxRecognition({});
    setInput("");
  }


  return (
    <>
      <header className="header">
        <Logo />
        <Navigation />
      </header>
      <section>
        <Input onSubmit={onSubmit} input={input} onInputChange={onInputChange}/>
        <Image onLoad={detectFaceOnImage} imageInput={imageSrc} boxRecognition={boxRecognition}/>
      </section>
    </>
  )
}

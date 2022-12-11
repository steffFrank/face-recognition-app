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

    // Fetch funciton
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
        <Image imageInput={imageSrc} boxRecognition={boxRecognition}/>
      </section>
    </>
  )
}

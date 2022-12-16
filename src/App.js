import React, { useState } from "react";
import "./app.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Image } from "./Components/Image/Image";
import { Input } from "./Components/Input/Input";
import { Logo } from "./Components/Logo/Logo";
import { Signin } from "./Components/SIGNIN/Signin";
import { Register } from "./Components/Register/Register";
import { Rank } from "./Components/Rank/Rank";

export const App = () => {
  const [input, setInput] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [boxRecognition, setBoxRecognition] = useState();
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({});

  const USER_ID = process.env.REACT_APP_USER_ID;
  const PAT = process.env.REACT_APP_PAT;
  const APP_ID = process.env.REACT_APP_APP_ID;
  const MODEL_ID = process.env.REACT_APP_MODEL_ID;
  const MODEL_VERSION_ID = process.env.REACT_APP_MODEL_VERSION_ID;
  // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

  // Fecth body
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: input,
          },
        },
      },
    ],
  });

  // Fetch options
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  // Fetch function
  const fetchUrl = async () => {
    try {
      const url = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;

      const response = await fetch(url, requestOptions);
      const result = await response.json();
      const box_info = result.outputs[0].data.regions;
      setBoxRecognition(box_info);
      return true; // Cross-origin, chromium project
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = (data) => {
    setUser(data);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchUrl();
    setImageSrc(input);
    setBoxRecognition();
    setInput("");
    setUser(prevState => {
      return {...prevState, entries: prevState.entries + 1}
    })
  };

  const onRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  return (
    <>
      <header className="header">
        <Logo />
        <Navigation onRouteChange={onRouteChange} route={route} />
      </header>
      {route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : route === "home" ? (
        <section>
          <Rank user={user} />
          <Input
            onSubmit={onSubmit}
            input={input}
            onInputChange={onInputChange}
          />
          <Image imageInput={imageSrc} boxRecognition={boxRecognition} />
        </section>
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </>
  );
};

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

  const loadUser = (data) => {
    setUser(data);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const updateEntries = async (id) => {
    const response = await fetch("http://localhost:3001/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const count = await response.json();
    setUser((prevState) => {
      return { ...prevState, entries: Number(count) };
    });
  };

  const fetchUrl = async () => {
    try {
      const response = await fetch("http://localhost:3001/api", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const box_info = await response.json();
      setBoxRecognition(box_info);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    fetchUrl();
    setImageSrc(input);
    setInput("");
    updateEntries(user.id);
  };

  const onRouteChange = (newRoute) => {
    if (route === "home") {
      setUser({});
      setImageSrc("");
      setBoxRecognition();
    }
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

import React from "react";
import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Image } from "./Components/Image/Image";
import { Input } from "./Components/Input/Input";

export const App = () => {
  return (
    <>
      <Navigation />
      <Input />
      <Image />
    </>
  )
}

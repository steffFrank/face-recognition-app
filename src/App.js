import React from "react";
import "./App.css";
import { Navigation } from "./Components/Navigation/Navigation";
import { Image } from "./Components/Image/Image";
import { Input } from "./Components/Input/Input";
import { Logo } from "./Components/Logo/Logo";

export const App = () => {
  return (
    <>
      <header className="header">
        <Logo />
        <Navigation />
      </header>
      <section>
        <Input />
        <Image />
      </section>
    </>
  )
}

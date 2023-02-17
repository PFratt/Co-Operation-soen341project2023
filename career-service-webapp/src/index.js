import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import HomePage from "./homePage/HomePage.jsx";
import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons();
console.log("icons initialized");

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <HashRouter>
    {" "}
    <HomePage />
  </HashRouter>
);

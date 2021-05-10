import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {StylesProvider} from "@material-ui/core";

ReactDOM.render(
  <StylesProvider injectFirst>
    <App/>
  </StylesProvider>,
  document.getElementById("root")
);


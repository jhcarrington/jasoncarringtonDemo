/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/quotes */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./utils";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

window.React = React;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

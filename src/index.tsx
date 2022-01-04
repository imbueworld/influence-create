import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import detectEthereumProvider from "@metamask/detect-provider";

async function startApp() {
  let metamaskProvider = await detectEthereumProvider();
  ReactDOM.render(
    <React.StrictMode>
      <App metamaskProvider={metamaskProvider} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
try {
  startApp();
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
} catch (err) {
  console.error("err:" + err);
}

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { isMobile } from "react-device-detect";
async function startApp() {
  // let isMobile = true;
  let metamaskProvider;
  // if (isMobile) {
  //   metamaskProvider = new WalletConnectProvider({
  //     rpc: {
  //       [1]: "https://mainnet.infura.io/v3/ce3c71b85fea4d3db649667cd1fe1c6d",
  //     },
  //     qrcodeModalOptions: {
  //       mobileLinks: [
  //         // "rainbow",
  //         "metamask",
  //         // "argent",
  //         // "trust",
  //         // "imtoken",
  //         // "pillar",
  //       ],
  //       desktopLinks: ["encrypted ink"],
  //     },
  //   });
  //   await metamaskProvider.enable().catch((error: any) => console.log(error));
  // } else {
  metamaskProvider = await detectEthereumProvider();
  // }
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

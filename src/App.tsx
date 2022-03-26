import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import StartStream from "./pages/StartStream";
import PurchaseEvent from "./pages/PurchaseEvent";
import ListEvent from "./pages/ListEvent";
import JoinStream from "./pages/JoinStream";
import WrongNetwork from "./pages/WrongNetwork";
import Test from "./pages/Test";
import SecureRoute from "./components/Routing/SecureRoute";
import { useProvider } from "./web3/useProvider";
import Web3Provider from "./web3/Web3Provider";
export const WalletProviderContext = createContext({
  walletProvider: null,
  setWalletProvider: null,
});

function App({ metamaskProvider }) {
  const { getProvider } = useProvider();
  const [walletProvider, setWalletProvider] = useState(getProvider());
  const value = useMemo(
    () => ({ walletProvider, setWalletProvider }),
    [walletProvider]
  );




  return (
    <div className="container text-center m-auto font-Lulo">
      <HashRouter>
        <Web3Provider>
          <Routes>
            <Route
              path="/"
              element={<Home metamaskProvider={metamaskProvider} />}
            />
            <Route
              path="/create-event"
              element={
                <SecureRoute
                  component={CreateEvent}
                  metamaskProvider={metamaskProvider}
                />
              }
            />
            <Route
              path="/start-stream/:eventId"
              element={
                <SecureRoute
                  component={StartStream}
                  metamaskProvider={metamaskProvider}
                />
              }
            />
            <Route
              path="/join-stream/:eventId"
              element={
                <SecureRoute
                  component={JoinStream}
                  metamaskProvider={metamaskProvider}
                />
              }
            />
            <Route
              path="/purchase-event/:eventId"
              element={
                <SecureRoute
                  component={PurchaseEvent}
                  metamaskProvider={metamaskProvider}
                />
              }
            />
            <Route
              path="/list-event"
              element={
                <SecureRoute
                  component={ListEvent}
                  metamaskProvider={metamaskProvider}
                />
              }
            />
            <Route
              path="/wrong-network"
              element={<WrongNetwork metamaskProvider={metamaskProvider} />}
            />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Web3Provider>
      </HashRouter>
    </div>
  );
}

export default App;

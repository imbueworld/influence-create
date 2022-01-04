import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";
import StartStream from "./pages/StartStream";
import PurchaseEvent from "./pages/PurchaseEvent";
import ListEvent from "./pages/ListEvent";
import JoinStream from "./pages/JoinStream";
import WrongNetwork from "./pages/WrongNetwork";

function App({ metamaskProvider }) {
  return (
    <div className="container text-center m-auto font-Lulo">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Home metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/create-event"
            element={<CreateEvent metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/start-stream/:eventId"
            element={<StartStream metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/join-stream/:eventId"
            element={<JoinStream metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/purchase-event/:eventId"
            element={<PurchaseEvent metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/list-event"
            element={<ListEvent metamaskProvider={metamaskProvider} />}
          />
          <Route
            path="/wrong-network"
            element={<WrongNetwork metamaskProvider={metamaskProvider} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

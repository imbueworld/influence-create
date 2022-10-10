import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import 'react-calendar/dist/Calendar.css';
import "leaflet/dist/leaflet.css";

import CreateEvent from "./pages/CreateEvent";
import CreateStoredEvent from "./pages/CreateStoredEvent";
import Home from "./pages/Home";
import StartStream from "./pages/StartStream";
import StartStreamObs from "./pages/StartStreamObs";
import PurchaseEvent from "./pages/PurchaseEvent";
import ListEvent from "./pages/ListEvent";
import Explorer from "./pages/Explore";
import JoinStream from "./pages/JoinStream";
import WrongNetwork from "./pages/WrongNetwork";
import StreamView from "./pages/StreamView";
import Test from "./pages/Test";
import SecureRoute from "./components/Routing/SecureRoute";
import { useProvider } from "./web3/useProvider";
import Web3Provider from "./web3/Web3Provider";
import Subscriptions from "./pages/Subscriptions";
import CreateSubscription from "./pages/CreateSubscription";
import MySubscriptionPlan from "./pages/MySubscriptionPlan";
import PurchesedSubscriptions from "./pages/PurchesedSubscriptions";
import ServiceHome from "./pages/ServiceProvider/serviceHome";
import { EventsStoreProvider } from "./utils/events.store"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceProfile from "./pages/ServiceProvider/ServiceProfile";
import ServiceMain from "./pages/ServiceProvider/ServiceMain";
import ServiceLocation from "./pages/ServiceProvider/ServiceLocation";
import SerivceList from "./pages/ServiceProvider/SerivceList";
import ServiceEditClasses from "./pages/ServiceProvider/ServiceEditClasses";
import ViewClass from "./pages/ServiceUser/ViewClass";
import UserHome from "./pages/ServiceUser/UserHome";
import ServiceDescription from "./pages/ServiceProvider/ServiceDescription";
import UserClasses from "./pages/ServiceUser/UserClasses";
import UserJoinClass from "./pages/ServiceUser/UserJoinClass";
import UserViewDetails from "./pages/ServiceUser/UserViewDetails";

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
          <EventsStoreProvider>
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
                path="/create-event-st"
                element={
                  <SecureRoute
                    component={CreateStoredEvent}
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
                path="/start-stream-0bs/:eventId"
                element={
                  <SecureRoute
                    component={StartStreamObs}
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
                path="/view-stream/:eventId"
                element={
                  <SecureRoute
                    component={StreamView}
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
                path="/list-recorded"
                element={
                  <SecureRoute
                    component={Explorer}
                    metamaskProvider={metamaskProvider}
                  />
                }
              />
              <Route
                path="/list-subscriptions"
                element={
                  <SecureRoute
                    component={Subscriptions}
                    metamaskProvider={metamaskProvider}
                  />
                }
              />
              <Route
                path="/create-subscription"
                element={
                  <SecureRoute
                    component={CreateSubscription}
                    metamaskProvider={metamaskProvider}
                  />
                }
              />
              <Route
                path="/my-subscription-plan"
                element={
                  <SecureRoute
                    component={MySubscriptionPlan}
                    metamaskProvider={metamaskProvider}
                  />
                }
              />
              <Route
                path="/purchesed-subscriptions"
                element={
                  <SecureRoute
                    component={PurchesedSubscriptions}
                    metamaskProvider={metamaskProvider}
                  />
                }
              />
              <Route
                path="/wrong-network"
                element={<WrongNetwork metamaskProvider={metamaskProvider} />}
              />
              <Route path="/test" element={<Test />} />
              <Route path="/service-page" element={<ServiceHome />} />
              <Route path="/service-profile" element={ <SecureRoute
                    component={ServiceProfile}
                    metamaskProvider={metamaskProvider}
                  />} />
              <Route path="/service-description" element={<ServiceDescription />} />
              <Route path="/service-main" element={<ServiceMain />} />
              <Route path="/service-location" element={<ServiceLocation />} />
              <Route path="/service-list" element={<SerivceList />} />
              <Route path="/service-editclass" element={
                <SecureRoute
                  component={ServiceEditClasses}
                  metamaskProvider={metamaskProvider}
                />

              } />
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/viewclass" element={
                <SecureRoute
                  component={ViewClass}
                  metamaskProvider={metamaskProvider}
                />

              } />
              <Route path="/user-classes" element={<UserClasses/>}/>
              <Route path="/user-joinclass" element={<UserJoinClass/>}/>
              <Route path="/user-viewdetails" element={<UserViewDetails/>}/>
            </Routes>
          </EventsStoreProvider>
        </Web3Provider>
      </HashRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

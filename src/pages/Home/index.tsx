import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { BigNumber } from "ethers";

import Header from "../../components/Header";
import EventItem from "../../components/EventItem";
import ColoredButton from "../../components/ColoredButton";

import { useContract } from "../../web3/useContract";
import WalletSelector from "../../components/WalletSelector";
import { useProvider } from "../../web3/useProvider";
import { useGetEvents } from "./useGetEvents"



export default function Home({ metamaskProvider }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [address, setAddress] = useState(null);
  const [installedMetamask, setInstalledMetamask] = useState(true);
  const { response, error, loading1 } = useGetEvents();
  const { setProvider, getProvider, connectWallet, getAccounts, isConnected } =
    useProvider();
  const { getContract } = useContract();
  const navigate = useNavigate();
  useEffect(() => {
    if (!metamaskProvider) {
      setInstalledMetamask(false);
      return;
    }

    getContract().then((contract) => {
      contract.on("eventAdded", (creator) => {
        console.log(creator + " created");
        if (address) handleGetEvents(address);
      });
    });
    if (isConnected)
      getAccounts().then((accounts) => handleAccountChanged(accounts[0]));
  }, []);

  function handleAccountChanged(account) {
    if (account) {
      setLoading(true);
      setAddress(account);
      handleGetEvents(account);
    }
  }

  async function handleConnectMetamask() {
    await setProvider(true);
    await connectWallet()
      .then(handleAccountChanged)
      .catch((error) => {
        if (error.code === 4001) {
          alert("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  async function handleConnectWallet() {
    await setProvider(false);
    await connectWallet()
      .then(handleAccountChanged)
      .catch((error) => {
        if (error.code === 4001) {
          alert("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  function handleGetEvents(walletAddress) {
    getContract().then((contract) => {
      contract
        .getUpcomingEvents(walletAddress, BigNumber.from(Date.now())) //
        .then((events) => {
          setEvents(events);
          // console.log("events-----------events",events);
          setLoading(false);
        })
        .catch();
    });
  }

  function handleCreateEvent() {
    navigate("/create-event");
  }

  function handleListEvent() {
    navigate("/list-event");
  }
  function handleListStream() {
    navigate("/list-recorded");
  }
  function handleListSubscriptions() {
    navigate("/list-subscriptions");
  }

  function handleCreateSubscription() {
    navigate("/create-subscription");
  }
  // console.log(
  //   response)

  const homeData = address ? (
    <>
      <div className="md:text-3xl sm:text-2xl text-xl mb-3">
        UPCOMING
        <br />
        EVENTS
      </div>
      <div className="flex flex-wrap items-center justify-center my-8">
        <ColoredButton onClick={handleCreateEvent} stylec="mx-4 my-4">
          CREATE EVENT
        </ColoredButton>
        {/* <ColoredButton onClick={handleListEvent} stylec="mx-4 my-4">
          GET EVENTS
        </ColoredButton> */}
        {/* <ColoredButton onClick={handleListStream} stylec="mx-4 my-4">
          Explorere Page
        </ColoredButton> */}
        {/* <ColoredButton onClick={handleCreateSubscription} stylec="mx-4 my-4">
          CREATE SUBSCRIPTION
        </ColoredButton> */}
        {/* <ColoredButton onClick={handleListSubscriptions} stylec="mx-4 my-4">
          Subscriptions
        </ColoredButton> */}
      </div>
      <div className="grid grid-flow-row items-center justify-items-center">
        {response && response.length > 0 ? (
          response?.map((event) => (
            <EventItem
              key={event["id"]}
              event={Object.assign(event)}
              metamaskProvider={metamaskProvider}
            />
          ))
        ) : (
          <div className="text-2xl mt-3">NO UPCOMING EVENTS...
            <a href="#" onClick={handleCreateEvent} style={{ cursor: 'pointer' }}>
              CREATE ONE
            </a>
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      <p className="text-sm mb-4">
        LIVESTREM TO YOUR FAVORITE
        <br /> AUDIENCES AND GET PAID IN CRYPTO
      </p>
      <div className="text-3xl">
        CONNECT YOUR
        <br /> WALLET TO SIGN IN
      </div>
      <div className="items-center justify-center my-5">
        <WalletSelector
          handleConnectMetamask={handleConnectMetamask}
          handleConnectWallet={handleConnectWallet}
        />
        {installedMetamask ? null : (
          <div>
            Detect meatamask failed
            <br />
            Please install&nbsp;
            <a
              className="text-red-600 underline"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </div>
        )}
      </div>
    </>
  );
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="text-center m-auto">
        {loading ? <BeatLoader loading={loading} /> : homeData}
      </div>
    </>
  );
}

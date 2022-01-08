import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import moment from "moment";
import { BigNumber } from "ethers";

import Header from "../../components/Header";
import EventItem from "../../components/EventItem";
import ColoredButton from "../../components/ColoredButton";

import { getContract } from "../../connector/useContract";

export default function Home({ metamaskProvider }) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [address, setAddress] = useState(null);
  const [installedMetamask, setInstalledMetamask] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!metamaskProvider) {
      setInstalledMetamask(false);
      return;
    }

    metamaskProvider.on("accountsChanged", handleAccountsChanged);

    getContract(metamaskProvider).then((contract) => {
      contract.on("eventAdded", (creator) => {
        console.log(creator + " created");
        if (address) handleGetEvents(address);
      });
    });
    metamaskProvider
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleAccountsChanged(accounts) {
    if (accounts[0]) {
      setLoading(true);
      setAddress(accounts[0]);
      handleGetEvents(accounts[0]);
    }
  }

  function handleConnectWallet() {
    if (!metamaskProvider) {
      alert("Please install metamask!");
      return;
    }

    metamaskProvider
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((error) => {
        if (error.code === 4001) {
          alert("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  function handleGetEvents(walletAddress) {
    getContract(metamaskProvider).then((contract) => {
      contract
        .getUpcomingEvents(walletAddress, BigNumber.from(Date.now())) //
        .then((events) => {
          setEvents(events);
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

  const homeData = address ? (
    <>
      <div className="text-3xl mb-3">
        UPCOMING
        <br />
        EVENTS
      </div>
      <div className="flex flex-wrap items-center justify-center my-8">
        <ColoredButton onClick={handleCreateEvent} stylec="mx-4 my-4">
          CREATE EVENT
        </ColoredButton>
        <ColoredButton onClick={handleListEvent} stylec="mx-4 my-4">
          GET EVENTS
        </ColoredButton>
      </div>
      <div className="grid grid-flow-row items-center justify-items-center">
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventItem
              key={event["_index"]}
              event={Object.assign(event)}
              metamaskProvider={metamaskProvider}
            />
          ))
        ) : (
          <div className="text-2xl mt-3">NO UPCOMING EVENTS... CREATE ONE</div>
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
        <ColoredButton
          disabled={!installedMetamask}
          onClick={handleConnectWallet}
        >
          CONNECT WALLET
        </ColoredButton>
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
        {loading ? <RotateLoader loading={loading} /> : homeData}
      </div>
    </>
  );
}

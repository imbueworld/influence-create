import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import EventDescription from "../../components/EventDescription";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";
import { BeatLoader } from "react-spinners";

import NetworkSelector from "../../components/NetworkSelectorP";

import axios from "axios";

import { useEventsStoreContext } from "./../../utils/events.store";
import { apiUrls } from "./../../utils/apiUrsl";

export default function PurchaseEvent({ metamaskProvider }) {
  const { viewerEventList } = useEventsStoreContext();

  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (viewerEventList.length === 0) {
      navigate("/list-event");
    }
  }, []);

  const { getContract } = useContract();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contract = await getContract();
      // const event = await contract._events(BigNumber.from(eventId));
      const event = viewerEventList.find((o) => o.id === eventId);
      console.log("------------e", event);
      setEvent(event);

      const accarr = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        eventIndeses: event._eventIndexes,
        walletAddress: accarr[0],
      });

      let response = await axios.request({
        url: `${apiUrls.eventPurchased}`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      });
      console.log(response.data.isPurchased);

      const isPurchasedAnyBlockchain = response.data.isPurchased;

      // const purchased = await contract.isPurchased(BigNumber.from(eventId));

      setLoading(false);
      if (isPurchasedAnyBlockchain) {
        alert("You already purchase this event.");
        navigate(`/join-stream/${eventId}`);
      }
    }
    fetchData().catch((err) => console.error(err));
  }, []);

  async function handlePurchaseEvent() {
    if (!selectedOption) {
      console.log("hello");
      alert("Please Select Network");
      return;
    }
    console.log(selectedOption);
    setLoading(true);
    if (!metamaskProvider.selectedAddress) {
      alert("connect to wallet");
      navigate("/");
      return;
    }

    if (!metamaskProvider) return;
    const provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
    const network = await provider._networkPromise;
    const networkId = "0x" + network.chainId.toString(16);

    const searchObject = event._eventIndexes.find(
      (el) => el.chainId.toLowerCase() == selectedOption.value.toLowerCase()
    );
    console.log(event._eventIndexes, networkId);
    console.log(searchObject);
    // console.log("searchObject",searchObject.index.hex.toString(10), BigNumber.from( BigNumber.from(searchObject.index).toString()));
    console.log("ppprive", event._price);
    const overrides = {
      value: event._price,
      gasLimit: 90000,
    };
    try {
      debugger;
      const contract = await getContract();
      const res = await contract.addPerson(
        BigNumber.from(searchObject.index),
        overrides
      );

      const nres = await res.wait();
      if (nres.status) {
        alert("Purchase event successfully");
        navigate(`/join-stream/${eventId}`);
      }
    } catch (err) {
      if (err.code === 4001) alert("User denied purchase.");
      // setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="relative bg-event bg-cover rounded-xl w-3/4 pt-[36.25%] m-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="col-start-2 col-span-4">
            <div>
              <div>
                <div>Select Network </div>
                <NetworkSelector
                  indexes={event}
                  metamaskProvider={metamaskProvider}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>

              <ColoredButton
                stylec="items-center text-center"
                onClick={handlePurchaseEvent}
                disabled={loading}
              >
                {loading ? (
                  <BeatLoader loading={loading} />
                ) : (
                  <>PURCHASE EVENT</>
                )}
              </ColoredButton>
            </div>
          </div>
        </div>
      </div>
      <EventDescription event={event} stylec="w-3/4 m-auto" />
    </>
  );
}

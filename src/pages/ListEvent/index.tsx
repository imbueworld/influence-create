import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { BarLoader } from "react-spinners";

import { useContract } from "../../web3/useContract";
import {useViewEventList} from "./useViewEventList"



import EventItem from "../../components/EventItem";
import Header from "../../components/Header";
// import { EventItem, Header } from "../../components";
export default function ListEvent({ metamaskProvider }) {



  // const contract = getContract(metamaskProvider);

  // const [contract, setContract] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getContract } = useContract();
  useEffect(() => {
    handleGetAvailableEvents();
    getContract().then((con) => {
      con.on("eventAdded", (creator) => {
        console.log(creator + " created");
        handleGetAvailableEvents();
      });
      con.on("purchaseDone", (purchaseSuccess) => {
        if (purchaseSuccess) handleGetAvailableEvents();
      });
    });
  }, []);

  const  { response, error, loading1 } = useViewEventList();

  function handleGetAvailableEvents() {
    setLoading(true);
    getContract().then((contract) => {
      contract
        .getUpcomingEvents(
          "0x0000000000000000000000000000000000000000",
          BigNumber.from(Date.now())
        )
        .then((events) => {
          setEvents(events);
          
          setLoading(false);
        })
        .catch((err) => console.error(err));
    });
  }
  const availableEvents =
  response && response.length > 0 ? (
      response.map((event) => (
        <EventItem
          key={event["id"]}
          event={Object.assign(event)}
          metamaskProvider={metamaskProvider}
        />
      ))
    ) : (
      <div className="text-2xl mt-3">NO Available EVENTS...</div>
    );
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="text-4xl">Available Events</div>
      <div className="grid grid-flow-row items-center justify-items-center">
        {loading ? <BarLoader loading={loading} /> : availableEvents}
      </div>
    </>
  );
}

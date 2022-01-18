import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../web3/useContract";
import ColoredButton from "../ColoredButton";
import { BeatLoader } from "react-spinners";
import { getStreamStatus } from "../../utils/apiFactory";
import yes from "./yes.png";
import no from "./no.png";
const CryptoJS = require("crypto-js");
export default function EventItem({ event, metamaskProvider }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const navigate = useNavigate();
  const eventId = BigNumber.from(event._index).toString();
  const walletAddress = metamaskProvider.selectedAddress;

  const isCreator = BigNumber.from(walletAddress).eq(
    BigNumber.from(event._owner)
  );

  const startDate = new Date(event._start.toNumber());
  const month = monthNames[startDate.getMonth()];
  const day = startDate.getDate();
  const year = startDate.getFullYear();
  const hour = startDate.getHours();
  const minute = startDate.getMinutes();
  const date1 = month + " " + day.toString() + " " + year.toString();
  const date2 =
    (hour / 12 <= 1 ? hour : hour - 12) +
    ":" +
    minute +
    (hour / 12 <= 1 ? "AM" : "PM");
  let durationTime;
  durationTime = parseInt(BigNumber.from(event._duration).toString(), 10);
  if (durationTime >= 60) durationTime = durationTime / 60 + "H";
  else durationTime = durationTime + "min";

  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { getContract } = useContract();
  useEffect(() => {
    let streamData = event._streamData;
    streamData = CryptoJS.AES.decrypt(streamData, event._name).toString(
      CryptoJS.enc.Utf8
    );
    const streamArray = streamData.split("&&");

    setLoading(true);

    async function fetchData() {
      if (isCreator) {
        await getStreamStatus(streamArray[0]); //to verify event is deleted from livepeer
        setLoading(false);
        return;
      }

      const contract = await getContract();
      const purchased = await contract.isPurchased(BigNumber.from(eventId));
      setIsPurchased(purchased);
      const isActive = (await getStreamStatus(streamArray[0])).data.isActive;
      setIsActive(isActive);
      setLoading(false);
    }
    fetchData().catch((err) => {
      if (err.toString().endsWith(500)) {
        setDeleted(true);
      }
    });
  }, []);
  function handleStartStream() {
    navigate(`/start-stream/${eventId}`);
  }
  function handleJoinStream() {
    navigate(`/join-stream/${eventId}`);
  }
  function handlePurchaseEvent() {
    navigate(`/purchase-event/${eventId}`);
  }
  if (deleted) return <></>;
  return (
    <div className="md:grid md:grid-cols-12 items-center py-1 px-5 bg-[#242429] rounded-3xl my-3 text-white md:w-1/2">
      <div className="md:col-start-1 md:col-end-5 text-lg md:pl-8 md:text-left">
        {event._name}
      </div>
      <div className="md:col-start-5 md:col-end-9 text-center">
        <div className="py-1 truncate">{date1}</div>
        <div className="pb-1 font-sans">
          {date2 + "   (" + durationTime + ")"}
        </div>
      </div>
      <div className="md:col-start-9 md:col-end-10 text-center">
        {isCreator ? null : isActive ? (
          <img width="50%" height="50%" src={yes} alt="Alive" />
        ) : (
          <img width="50%" height="50%" src={no} alt="Dead" />
        )}
      </div>
      <div className=" md:col-start-10 md:col-end-13 text-center md:text-right">
        {loading ? (
          <BeatLoader loading={loading} />
        ) : isCreator ? (
          <ColoredButton onClick={handleStartStream}>START EVENT</ColoredButton>
        ) : isPurchased ? (
          <ColoredButton onClick={handleJoinStream}>JOIN EVENT</ColoredButton>
        ) : (
          <ColoredButton onClick={handlePurchaseEvent}>
            PURCHASE EVENT
          </ColoredButton>
        )}
      </div>
    </div>
  );
}

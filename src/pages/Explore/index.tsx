import React, { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { livepeer } from "../../utils/livepeer";
import { useContract } from "../../web3/useContract";
import eventex from "./../../assets/image/event-ex.png";
import EventItem from "../../components/EventItem";
import Header from "../../components/Header";
import ColoredButton from "../../components/ColoredButton";
import { getStreamStatus } from "../../utils/apiFactory";

const CryptoJS = require("crypto-js");
// import { EventItem, Header } from "../../components";
export default function Explorere({ metamaskProvider }) {
  const navigate = useNavigate();
  // const contract = getContract(metamaskProvider);

  // const [contract, setContract] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getContract } = useContract();
  useEffect(() => {
    setLoading(true);
    requestStreamList();
  }, []);
  async function requestStreamList() {
    const { apiKey, proxyURL } = livepeer;
    const authorizationHeader = `Bearer ${apiKey}`;
    try {
      const response = await axios.get(`${proxyURL}/recordedstream`, {
        headers: {
          "content-type": "application/json",
          authorization: authorizationHeader, // API Key needs to be passed as a header
        },
      });
      let recordedStreamList = response.data;


      const promises = Object.values(recordedStreamList).map(
        async (event: any) => {
          let assetName = event.name;
          const myArray = assetName.split("live-to-vod-");
          const streamIdA = myArray[1];
          // console.log(streamIdA);

          const b = await getStreamStatus(streamIdA);
          // console.log("bbb",b?.data?.parentId)
          const contract = await getContract();
          const thumbnail = await contract._thumbnails(b?.data?.parentId);
          // console.log("bbbb",thumbnail)
          event.thumbnail = thumbnail;
          return event;
        }
      );

      const promisedResult = await Promise.all(promises);
    

      setEvents(promisedResult);

      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  function viewpage(id) {
    navigate(`/view-stream/${id}`);
  }

  function handleListEvent() {
    navigate("/list-event");
  }
  const availableEvents =
    events && events.length > 0 ? (
      events.map((event) => {
        return (
          <div>
            <img
              onClick={() => {
                viewpage(event.id);
              }}
              style={{
                borderRadius: "2.375rem",
                cursor: "pointer",
                maxWidth: "222px",
                width: "222px",
                height: "115px",
              }}
              src={event.thumbnail ? event.thumbnail : eventex}
            />
            {/* <button
              onClick={() => {
                viewpage(event.id);
              }}
            >
              {event.name.split("_")[0]}
            </button> */}
          </div>
        );
      })
    ) : (
      <div className="text-2xl mt-3">NO Available Recorded Events...</div>
    );
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="px-40">

          <div className="flex sm:flex-co">
            <div style={{ width: "60%" }}>
              <div>
                {" "}
                <button
                  style={{
                    background: "#DEFCFC",
                    borderRadius: "19px",
                    paddingRight: "30px",
                    paddingTop: "10px",
                    paddingLeft: "38px",
                    paddingBottom: "10px",
                    marginBottom: "22px",
                  }}
                  onClick={handleListEvent}
                >
                  Live Now
                </button>
              </div>
              <div>
                {" "}
                <p>Last in 24 hours</p>
              </div>
            </div>
              {/* <div className="flex flex-wrap gap-10 ">{availableEvents}</div>
               */}
                  {loading ? <BarLoader loading={loading} /> : <div className="flex flex-wrap gap-10 ">{availableEvents}</div>}
          </div>
        {/* )} */}
      </div>
    </>
  );
}

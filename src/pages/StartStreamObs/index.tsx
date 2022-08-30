import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";
import { BigNumber } from "ethers";
import { BeatLoader } from "react-spinners";
import EventDescription from "../../components/EventDescription";
import { deleteStream, getStreamStatus } from "../../utils/apiFactory";
import ChatContainer from "../../components/ChatContainer";

import {useEventsStoreContext} from "./../../utils/events.store"

const CryptoJS = require("crypto-js");

export default function StartStreamObs({ metamaskProvider }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamId, setStreamId] = useState(null);
  const [streamKey, setStreamKey] = useState(null);
  const [connectedToLive, setConnectedToLive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); //delete stream from livepeer so that ended event does not listed from available lists.
  const [chatting, setChatting] = useState(false);
  const [loading, setLoading] = useState(false);
  const walletAddress = metamaskProvider.selectedAddress;

  const { ceratorEventList } = useEventsStoreContext();

  const timer = useRef(null);
  const navigate = useNavigate();

  const { getContract } = useContract();

  useEffect(()=>{
    if(ceratorEventList.length===0) {
      navigate("/");
    }
  },[]);

  useEffect(() => {
    setStreaming(true);
    async function fetchData() {
      try {
        setLoading(true);
        const contract = await getContract();
        // const event = await contract._events(BigNumber.from(eventId));
        const event = ceratorEventList.find(o => o.id === eventId);
        setEvent(event);

        let streamData = event._streamData;
        streamData = await CryptoJS.AES.decrypt(
          streamData,
          event._name
        ).toString(CryptoJS.enc.Utf8);
        const decryptedStreamId = streamData.split("&&")[0];
        const decryptedStreamKey = streamData.split("&&")[1];
        setStreamId(decryptedStreamId);
        setStreamKey(decryptedStreamKey);

        getConnected(decryptedStreamId);
        timer.current = window.setInterval(
          () => getConnected(decryptedStreamId),
          5000
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData().catch((err) => {
      console.log(err);
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (connectedToLive) window.clearInterval(timer.current);
  }, [connectedToLive]);

  function getConnected(decryptedStreamId) {
    getStreamStatus(decryptedStreamId)
      .then((res) => {
        setConnectedToLive(Boolean(Boolean(res.data.isActive)));
        if (res.data.isActive) {
          window.clearInterval(timer.current);
          console.log("res", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function stopStreaming() {
    setConnectedToLive(false);
    setStreaming(false);
  }

  function handleStopStreaming() {
    setIsDeleting(true);
    stopStreaming();
    deleteStream(streamId)
      .then((res) => {
        if (res.status === 200) {
          alert("Success");
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  }

  function handleChat(e) {
    setChatting(e);
  }

  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="my-5">
        {event && event._index ? (
          <a
            href={`${window.location.protocol}//${window.location.host}/#/join-stream/${event._index}`}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-2xl font-bold text-red-700"
          >
            {`${window.location.protocol}//${window.location.host}/#/join-stream/${event._index}`}
          </a>
        ) : null}
      </div>

      {connectedToLive ? (
        <div className="my-3 text-blue-700">Connected to Livepeer.</div>
      ) : null}
      <div className="relative bg-event bg-cover bg-center rounded-xl w-2/3  m-auto">
        <video className="rounded-xl w-full h-21" />
        {loading ? (
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BeatLoader loading={loading} />
          </div>
        ) : (
          <>
            <div className="absolute w-full top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 items-center">
              <div className="bg-[#DEFCFC] rounded-lg ml-2 mb-10 col-start-1 col-span-1">
                <div className="">
                  <h5 className="text-[10px] p-[5px] font-semibold">
                    RTMP URL
                    <br />
                  </h5>
                  <p
                    className="text-[9px] break-words lowercase cursor-pointer pb-3"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "rtmp://rtmp.livepeer.com/live/"
                      );
                      alert("Url Copied");
                    }}
                  >
                    {"rtmp://rtmp.livepeer.com/live/"}
                  </p>
                </div>
                <div>
                  <h5 className="text-[9px] p-[5px] font-semibold">
                    Stream Key
                    <br />
                  </h5>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(streamKey);
                      alert("Stream key Copied");
                    }}
                    className="text-[7px] lowercase cursor-pointer pb-3"
                  >
                    {streamKey}
                  </p>
                </div>
              </div>
              <div className="col-start-2 col-span-4">
                {isDeleting ? (
                  <BeatLoader loading={isDeleting} />
                ) : streaming ? (
                  <>
                    {/* <ColoredButton onClick={handleStopStreaming}>
                      STOP STREAM
                    </ColoredButton> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-end-7 col-span-1">
                {isDeleting || chatting ? null : (
                  <button onClick={handleChat}>
                    <svg
                      width="37"
                      height="35"
                      viewBox="0 0 37 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 32.6875C28.7166 32.6875 37 25.4401 37 16.5C37 7.55988 28.7166 0.3125 18.5 0.3125C8.28337 0.3125 0 7.55988 0 16.5C0 20.57 1.71819 24.2931 4.55562 27.1375C4.33131 29.487 3.59131 32.0631 2.77269 33.9964C2.59 34.4265 2.94381 34.9075 3.404 34.8335C8.621 33.9779 11.7221 32.6644 13.0702 31.9799C14.8414 32.4523 16.6669 32.6902 18.5 32.6875Z"
                        fill="#FFE6EB"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {chatting ? (
              <ChatContainer
                username={walletAddress}
                room={streamId}
                handler={handleChat}
              />
            ) : null}
          </>
        )}
      </div>
      <EventDescription event={event} stylec="w-3/4 mx-auto" />
    </>
  );
}

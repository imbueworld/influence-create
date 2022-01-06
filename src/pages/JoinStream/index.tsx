import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContract } from "../../connector/useContract";
import { BigNumber } from "ethers";
import { getStreamStatus } from "../../utils/apiFactory";
import CryptoJS from "crypto-js";
import ReactHlsPlayer from "react-hls-player";
// import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import EventDescription from "../../components/EventDescription";
import { BeatLoader } from "react-spinners";
export default function JoinStream({ metamaskProvider }) {
  const { eventId } = useParams();
  // const contract = getContract(metamaskProvider);

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [playbackURL, setPlaybackURL] = useState(null);
  const playerRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contract = await getContract(metamaskProvider);
      const purchased = await contract.isPurchased(BigNumber.from(eventId));

      if (!purchased) {
        alert("You didn`t purchase this event.Please purchase and try again.");
        navigate(`/purchase-event/${eventId}`);
        return;
      }
      const event = await contract._events(BigNumber.from(eventId));
      setEvent(event);
      let streamData = event._streamData;
      streamData = CryptoJS.AES.decrypt(streamData, event._name).toString(
        CryptoJS.enc.Utf8
      );
      const streamArray = streamData.split("&&");
      const streamId = streamArray[0];
      const playbackId = streamArray[2];
      const isActive = (await getStreamStatus(streamId)).data.isActive;
      setPlaybackURL(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);

      setIsActive(isActive);
      setLoading(false);
    }
    fetchData().catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="relative bg-event bg-cover bg-center rounded-xl w-2/3 m-auto">
        {loading ? (
          <div className="w-full h-full m-auto pt-[56.25%] relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BeatLoader loading={loading} />
            </div>
          </div>
        ) : isActive ? (
          <ReactHlsPlayer
            playerRef={playerRef}
            src={playbackURL}
            autoPlay={false}
            controls={isActive}
            playsInline
            className="rounded-xl w-full h-full"
          />
        ) : (
          <div className="w-full h-full m-auto pt-[56.25%] relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-red-700">
              This event doesn`t started now.
              <br />
              Please try it again.
            </div>
          </div>
        )}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 items-center">
          <div className="col-start-3 col-end-4">
            <ColoredButton onClick={handleStartStream} label="START" />
          </div>
        </div> */}
      </div>
      <EventDescription event={event} stylec="w-3/4 mx-auto" />
    </>
  );
}

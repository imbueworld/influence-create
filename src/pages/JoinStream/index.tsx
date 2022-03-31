import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useContract } from "../../web3/useContract";
import { BigNumber } from "ethers";
import { getStreamStatus } from "../../utils/apiFactory";
import CryptoJS from "crypto-js";
import ReactHlsPlayer from "react-hls-player";
import Header from "../../components/Header";
import EventDescription from "../../components/EventDescription";
import { BeatLoader } from "react-spinners";
import ChatContainer from "../../components/ChatContainer";
import { _fetchData } from "ethers/lib/utils";
import web3 from 'web3'

export default function JoinStream({ metamaskProvider }) {
  const { eventId } = useParams();

  const walletAddress = metamaskProvider.selectedAddress;

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [playbackURL, setPlaybackURL] = useState(null);
  const [chatting, setChatting] = useState(false);
  const [streamId, setStreamId] = useState(null);

  const timer = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const { getContract } = useContract();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contract = await getContract();
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
      setStreamId(streamArray[0]);
      const playbackId = streamArray[2];
      setPlaybackURL(`https://cdn.livepeer.com/hls/${playbackId}/index.m3u8`);
      setLoading(false);
    }
    fetchData().catch((err) => console.error(err));
  }, []);

  useEffect(() => {},[]);

  useEffect(() => {
    if (streamId)
      timer.current = window.setInterval(checkLiveStreamStatus, 5000);

    return function cleanup() {
      window.clearInterval(timer.current);
    };
  }, [streamId]);

  function checkLiveStreamStatus() {
    getStreamStatus(streamId)
      .then((res) => {
        setIsActive(res.data.isActive);
      })
      .catch((err) => {
        if (err.toString().endsWith("status code 500")) {
          alert("Event ended");
          navigate("/");
          window.clearInterval(timer.current);
        }
      });
  }

  function handleChat(e) {
    setChatting(e);
  }


  async function  getNft() {



  alert('hetnft')




// You can switch out this provider with any wallet or provider setup you like.
const provider =new web3(window.ethereum);
const sdk = new ThirdwebSDK(provider);
const contract = sdk.getNFTCollection("0x2c87c867D53413aD18F67709F24bF60F66461128");
  // Address of the wallet you want to mint the NFT to
const toAddress = "0xc33619fAc2aE1235b5850822AF94c54C07BfE27b";

// Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
const metadata = {
  name: "Cool NFT",
  description: "This is a cool NFT",
  image: "path/to/image.png" // This can be an image url or file
};

const tx = await contract.mintTo(toAddress, metadata);
const receipt = tx.receipt; // the transaction receipt
const tokenId = tx.id; // the id of the NFT minted
const nft = await tx.data(); // (optional) fetch details of minted NFT
}



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
            autoPlay={true}
            controls={isActive}
            playsInline
            className="rounded-xl w-full h-full"
          />
        ) : (
          <div className="w-full h-full m-auto pt-[56.25%] relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-red-700 bg-white opacity-50 rounded-xl">
              This event isn`t started now.
              <br />
              This will be removed when event is started.
            </div>
          </div>
        )}
        <div className="absolute top-[90%] w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 items-center">
          <div className="col-end-7 col-span-1">
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
          </div>
        </div>

        {chatting ? (
          <ChatContainer
            username={walletAddress}
            room={streamId}
            handler={handleChat}
          />
        ) : null}
      </div>
      <EventDescription event={event} stylec="w-3/4 mx-auto" />
      <br/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-full" onClick={getNft}>get nft of this event</button>
    </>
  );
}

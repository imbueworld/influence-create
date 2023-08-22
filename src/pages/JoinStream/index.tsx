import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContract } from "../../web3/useContract";
import { BigNumber } from "ethers";
import { getStreamStatus } from "../../utils/apiFactory";
import CryptoJS from "crypto-js";
import ReactHlsPlayer from "react-hls-player";
import Header from "../../components/Header";
import EventDescription from "../../components/EventDescription";
import { BeatLoader } from "react-spinners";
// import ChatContainer from "../../components/ChatContainer";
import { _fetchData } from "ethers/lib/utils";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import nftabi from "./nftAbi.json";
import axios from "axios";
import ColoredButton from "../../components/ColoredButton";
import { FaDiscord } from "react-icons/fa";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

export default function JoinStream({ metamaskProvider }) {
  const { eventId } = useParams();

  const walletAddress = metamaskProvider.selectedAddress;

  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [playbackURL, setPlaybackURL] = useState(null);
  const [chatting, setChatting] = useState(false);
  const [streamId, setStreamId] = useState(null);
  const [nftObj, setnftObj] = useState(null);
  const [nftOwner, setnftOwner] = useState(null);
  const [nfttokenid, setnfttokenid] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const timer = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const { getContract } = useContract();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contract = await getContract();
      const purchased = await contract.isPurchased(BigNumber.from(eventId));
      const event = await contract._events(BigNumber.from(eventId));
      if (!(parseInt(BigNumber.from(event._price).toString(), 10) === 0)) {
        if (!purchased) {
          alert(
            "You didn`t purchase this event.Please purchase and try again."
          );
          navigate(`/purchase-event/${eventId}`);
          return;
        }
      }

      setEvent(event);
      let streamData = event._streamData;
      streamData = CryptoJS.AES.decrypt(streamData, event._name).toString(
        CryptoJS.enc.Utf8
      );
      const streamArray = streamData.split("&&");
      setStreamId(streamArray[0]);
      const playbackId = streamArray[2];
      setPlaybackURL(`https://livepeercdn.studio/hls/${playbackId}/index.m3u8`);
      setLoading(false);
    }
    fetchData().catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, []);

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

  async function onUploadtoipfs() {
    const data = JSON.stringify({
      name: event._name,
      description: event._description,
      image:
        "https://gateway.pinata.cloud/ipfs/QmamS48Hk7Gyn5tB2GAvzZp3GGimtRepHihBerSqYpfpYi",
      external_url: "https://discord.gg/23YGjR9maF",
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

      const onMintNftTokeN = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xdA774732988fB28790c3A9329e85BCaFB93E025b",
          nftabi,
          signer
        );

        try {
          const transaction = await contract.freeMint(
            metamaskProvider.selectedAddress,
            url
          );

          transaction
            .wait()
            .then(async (tx) => {
              // alert(tx)
              console.log(tx.transactionHash);
              const receipt = await provider.getTransactionReceipt(
                tx.transactionHash
              );
              const tokenId = receipt.logs[0].topics[3];
              setnfttokenid(parseInt(tokenId, 16));
              let Owner = await contract.ownerOf(parseInt(tokenId, 16));
              // alert(Owner)
              setnftOwner(Owner);
              // alert(tokenId.toString())
              console.log(parseInt(tokenId, 16));
              let currentValue = await contract.tokenURI(parseInt(tokenId, 16));
              console.log(currentValue);

              let headersList = {
                Accept: "*/*",
              };

              axios
                .request({
                  url: currentValue,
                  method: "GET",
                  headers: headersList,
                })
                .then(function (response) {
                  console.log(response.data);
                  setnftObj(response.data);
                  console.log(nftObj);
                });
            })
            .catch(alert);
        } catch (error) {
          // logger.error(error);
          alert(error.message);
        }
      };

      onMintNftTokeN().then();
    } catch (error) {
      console.log(`Error uploading file: `, error);
      console.log(error.message);
    }
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

        {/* {chatting ? (
          <ChatContainer
            username={walletAddress}
            room={streamId}
            handler={handleChat}
          />
        ) : null} */}
      </div>
      <EventDescription event={event} stylec="w-3/4 mx-auto" />
      {/* <ColoredButton onClick={onUploadtoipfs} stylec="mt-4 my-8 bg-[#defcfb]">
        Get Nft
      </ColoredButton> */}

      {nftObj ? (
        <>
          <div className="container grid gap-2 xl:grid-cols-12 md:grid-cols-6 sm:grid-cols-1">
            <div className=" xl:col-start-4 xl:col-span-6 md:col-start-2 md:col-span-2 sm:col-start-1   text-center bg-[#defcfb] text-[#242429] rounded-md shadow-md  card">
              <h2 className="my-2 text-4xl font-bold card-title">
                #{nfttokenid}
              </h2>
              <div className="px-4 pt-4 ">
                <img
                  src={nftObj.image}
                  alt={nftObj.name}
                  className="mask mask-sircleu"
                />
              </div>
              <div className="card-body">
                <p className="text-sm ">Event Name: {nftObj.name}</p>
                <p className="text-sm  truncat">
                  Event Description: {nftObj.description}
                </p>
                <p className="text-sm">Owner: {nftOwner}</p>
                <div className="justify-center card-actions">
                  {/* <a className =" align-middle " target="_blank" href={nftObj.external_url} >
           <FaDiscord />
          </a> */}
                </div>
                <div>
                  <p className="text-sm">
                    Contract Address: 0xd99Fa8b62a48D35267F51aA9699E663568235476
                  </p>
                  <p className="text-sm">Token ID: {nfttokenid}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

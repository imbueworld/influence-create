import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detect } from "detect-browser";

 

import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";
import { BigNumber } from "ethers";
import { BeatLoader } from "react-spinners";
import { livepeer } from "../../utils/livepeer";
import EventDescription from "../../components/EventDescription";
import { deleteStream, getStreamStatus } from "../../utils/apiFactory";
import ChatContainer from "../../components/ChatContainer";
import screenEnabledIcon from "./screen_enabled.svg";
import screenDisabledIcon from "./screen_disabled.svg";
import "./ReplaceableMediaStream";
// import new

import Webcam from "react-webcam";
import { error } from "console";
const CryptoJS = require("crypto-js");


const CAMERA_CONSTRAINTS = {
  audio: true,
  video: true,
  facingMode: "user"
};
export default function StartStream({ metamaskProvider }) {

  const { eventId } = useParams();

const [cameraconst,setcameraConst] = useState({ audio: true,
  video: true,
  facingMode: "user"})


  const [event, setEvent] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamId, setStreamId] = useState(null);
  const [streamKey, setStreamKey] = useState(null);
  const [connectedToLive, setConnectedToLive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); //delete stream from livepeer so that ended event does not listed from available lists.
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [screenCapSupported, setScreenCapSupported] = useState(false);
  const [screenEnabled, setScreenEnabled] = useState(false);
  const [chatting, setChatting] = useState(false);
  const [loading, setLoading] = useState(false);
  const walletAddress = metamaskProvider.selectedAddress;


  const webcamRef = React.useRef(null);

  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timer = useRef(null);
  const inputStreamRef = useRef<MediaStream>();
  const screenStreamRef = useRef<MediaStream>();
  const outputStreamRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const { getContract } = useContract();
  useEffect(() => {
    async function fetchData() {
      try {
        
    
      setLoading(true);
      await enableCamera();
      const contract = await getContract();
      const event = await contract._events(BigNumber.from(eventId));
      setEvent(event);

      let streamData = event._streamData;
      streamData = CryptoJS.AES.decrypt(streamData, event._name).toString(
        CryptoJS.enc.Utf8
      );
      const decryptedStreamId = streamData.split("&&")[0];
      const decryptedStreamKey = streamData.split("&&")[1];
      setStreamId(decryptedStreamId);
      setStreamKey(decryptedStreamKey);

      if (window.navigator.mediaDevices.getDisplayMedia === undefined) {
        setScreenCapSupported(false);
      } else {
        setScreenCapSupported(true);
      }
      setLoading(false);
    } catch (error) {
        // alert(error)
        console.log(error);
    }
    }
    fetchData().catch((err) => {
      console.log(err);
    });

    return function cleanup() {
      screenStreamRef.current
        .getVideoTracks()[0]
        .addEventListener("ended", () => {
          async function captureCam() {
            console.log("screensharing has ended");
            videoRef.current.srcObject = inputStreamRef.current;
            await videoRef.current.play();
            setScreenEnabled(false);
          }
          captureCam();
        });
    };
  }, []);

  useEffect(() => {
    if (connectedToLive) window.clearInterval(timer.current);
  }, [connectedToLive]);

  function getConnected() {
    // alert('geotcon')
    getStreamStatus(streamId)
      .then((res) => {
        // alert(res.data.isActive)
        setConnectedToLive(Boolean(Boolean(res.data.isActive)));
      })
      .catch((err) => {
        // alert(err.message)
        // alert('err')
      });
  }

  function switchStream(stream) {
    stream.replaceVideoTrack(stream.getVideoTracks()[0]);
    stream.replaceAudioTrack(stream.getAudioTracks()[0]);
  }

  const enableCamera = async () => {
    // inputStreamRef.current = await window.navigator.mediaDevices.getUserMedia(
    //   CAMERA_CONSTRAINTS
    // );
    // switchStream(webcamRef.current.stream);
    const tempStream: any = new MediaStream();
    // videoRef.current.srcObject = tempStream.remoteStream;
    setCameraEnabled(true);
  };

  const enableScreenRec = async () => {
    if (screenEnabled) {
      console.log("switch stream to cam");
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      inputStreamRef.current = await window.navigator.mediaDevices.getUserMedia(
        CAMERA_CONSTRAINTS
      );
      switchStream(inputStreamRef.current);
      setScreenEnabled(false);
      return;
    }
    screenStreamRef.current =
      await window.navigator.mediaDevices.getDisplayMedia(CAMERA_CONSTRAINTS);

    //Add event for Stop sharing
    screenStreamRef.current
      .getVideoTracks()[0]
      .addEventListener("ended", () => {
        async function captureCam() {
          switchStream(inputStreamRef.current);
          setScreenEnabled(false);
        }
        captureCam();
      });
    switchStream(screenStreamRef.current);
    setScreenEnabled(true);
  };
  
  function handleStartStreaming() {
    // setConnectedToLive(true)
    // alert('click-on-hadlestart')
    const wsUrl = `${livepeer.webSocketServerURL}/rtmp?key=${streamKey}`;

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {




      try {

     let browser = detect();


if(browser.name=='crios') {
  mediaRecorderRef.current = new MediaRecorder(
    webcamRef.current.stream,
    {
      mimeType: "video/mp4",
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
    }
  );

} else {
  mediaRecorderRef.current = new MediaRecorder(
    webcamRef.current.stream,
    {
      mimeType: "video/webm",
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
    }
  );

  

}

     
    
        mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
          wsRef.current.send(e.data);
        });





        // alert('connected')
        console.log('connected');
        setStreaming(true);
        mediaRecorderRef.current.start(500);
        getConnected()
        timer.current = window.setInterval(getConnected, 5000);
        
      } catch (error) {
        alert(error.message)
      }
  

    }
   
    // wsRef.current.addEventListener("open", function open() {
    //   setStreaming(true);
    //   mediaRecorderRef.current.start(500);

    //   timer.current = window.setInterval(getConnected, 5000);
    // });

    wsRef.current.addEventListener("close", () => {
      console.log("websocket closed");
      stopStreaming();
      // alert('close-ws')
    });

    wsRef.current.addEventListener("error", (err) => {
      console.log("websocket error");
      stopStreaming();
      // alert('error')
    });

    // const tempStream: any = new MediaStream();
    // // outputStreamRef.current = new MediaStream();
    // const videoOutputStream = videoRef.current.captureStream(30); // 30 FPS

    // const audioStream = new MediaStream();
    // const audioTracks = inputStreamRef.current.getAudioTracks();
    // audioTracks.forEach(function (track) {
    //   audioStream.addTrack(track);
    // });

    // const outputStream = new MediaStream();
    // [audioStream, videoOutputStream].forEach(function (s) {
    //   s.getTracks().forEach(function (t) {
    //     outputStream.addTrack(t);
    //   });
    // });

    // mediaRecorderRef.current = new MediaRecorder(
    //   webcamRef.current.stream,
    //   {
    //     mimeType: "video/webm",
    //     audioBitsPerSecond: 128000,
    //     videoBitsPerSecond: 2500000,
    //   }
    // );

    // mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
    //   wsRef.current.send(e.data);
    // });
  }

  function stopStreaming() {
    const recorderState = mediaRecorderRef.current.state.toString();
    if (recorderState !== "inactive") mediaRecorderRef.current.stop();
    window.clearInterval(timer.current);
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
        {/* <video
          autoPlay={true}
          ref={videoRef}
          muted
          playsInline
          className="rounded-xl w-full h-full"
        /> */}
        
<Webcam ref={webcamRef}  videoConstraints={cameraconst}  className="rounded-xl w-full h-full"/>
        {loading ? (
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BeatLoader loading={loading} />
          </div>
        ) : (
          <>
            <div className="absolute w-full top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-6 items-center">
              {screenCapSupported ? (
                <div className="col-start-1 col-span-0">
                  {isDeleting ? null : (
                    <button
                      onClick={(e) =>
                        enableScreenRec().catch((err) => {
                          if (err.name === "NotAllowedError") {
                            alert("You must select window to capture.");
                          }
                        })
                      }
                    >
                      <img
                        color="#FFE6EB"
                        width={48}
                        height={48}
                        src={
                          screenEnabled ? screenEnabledIcon : screenDisabledIcon
                        }
                        alt="Screen Share"
                      />
                    </button>
                  )}
                </div>
              ) : null}
              <div className="col-start-2 col-span-4">
                {isDeleting ? (
                  <BeatLoader loading={isDeleting} />
                ) : streaming ? (
                  <>
                  <ColoredButton onClick={handleStopStreaming}>
                    STOP STREAM
                  </ColoredButton>
                  {/* <button>Change-camera</button> */}
                  </>
                ) : (
                  <>
                  <ColoredButton
                    onClick={handleStartStreaming}
                    disabled={!cameraEnabled}
                  >
                    START STREAM
                  </ColoredButton>
                    <ColoredButton onClick={()=>{
               



setcameraConst((pre)=>pre.facingMode==="environment"?{audio: true,
  video: true,
  facingMode: "user"}: {audio: true,
    video: true,
    facingMode: "environment"})
                    }}>Change-camera</ColoredButton>
                    </>
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

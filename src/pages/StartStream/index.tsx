import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { getContract } from "../../connector/useContract";
import { BigNumber } from "ethers";
import { BeatLoader } from "react-spinners";
import { livepeer } from "../../utils/livepeer";
import EventDescription from "../../components/EventDescription";
import { deleteStream, getStreamStatus } from "../../utils/apiFactory";
// import { RotateLoader } from "react-spinners";
const CryptoJS = require("crypto-js");

const CAMERA_CONSTRAINTS = {
  audio: true,
  video: true,
};

export default function StartStream({ metamaskProvider }) {
  // const contract = getContract(metamaskProvider);

  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [streamId, setStreamId] = useState(null);
  const [streamKey, setStreamKey] = useState(null);
  const [connectedToLive, setConnectedToLive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); //delete stream from livepeer so that ended event does not listed from available lists.
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timer = useRef(null);

  const inputStreamRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestAnimationRef = useRef(null);
  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await enableCamera();
      const contract = await getContract(metamaskProvider);
      const event = await contract._events(BigNumber.from(eventId));
      setEvent(event);
      nameRef.current = event._name;
      let streamData = event._streamData;
      streamData = CryptoJS.AES.decrypt(streamData, event._name).toString(
        CryptoJS.enc.Utf8
      );
      const decryptedStreamId = streamData.split("&&")[0];
      const decryptedStreamKey = streamData.split("&&")[1];
      setStreamId(decryptedStreamId);
      setStreamKey(decryptedStreamKey);
    }
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  function getConnected() {
    getStreamStatus(streamId)
      .then((res) => {
        setConnectedToLive(Boolean(Boolean(res.data.isActive)));
      })
      .catch((err) => {});
  }

  const enableCamera = async () => {
    inputStreamRef.current = await window.navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );
    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);

    setCameraEnabled(true);
  };

  const updateCanvas = () => {
    if (
      videoRef.current &&
      (videoRef.current.ended || videoRef.current.paused)
    ) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    ctx.fillStyle = "#FB3C4E";
    ctx.font = "50px Akkurat";
    ctx.fillText(nameRef.current, 10, 50, canvasRef.current.width - 20);

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  };

  function handleStartStreaming() {
    const wsUrl = `${livepeer.webSocketServerURL}/rtmp?key=${streamKey}`;

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.addEventListener("open", function open() {
      setStreaming(true);
      mediaRecorderRef.current.start(300);

      timer.current = window.setInterval(getConnected, 5000);
    });

    wsRef.current.addEventListener("close", () => {
      console.log("websocket closed");
      stopStreaming();
    });

    wsRef.current.addEventListener("error", (err) => {
      console.log("websocket error");
      stopStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(24); // 24 FPS

    const audioStream = new MediaStream();
    const audioTracks = inputStreamRef.current.getAudioTracks();
    audioTracks.forEach(function (track) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: "video/webm",
      // videoBitsPerSecond: 3000000,
    });
    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      wsRef.current.send(e.data);
    });
  }

  function stopStreaming() {
    const recorderState = mediaRecorderRef.current.state.toString();
    if (recorderState !== "inactive") mediaRecorderRef.current.stop();
    window.clearInterval(timer.current);
    // if (mediaRecorderRef.current.state.toString().contains("active"))
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

      <div className="relative bg-event bg-cover bg-center rounded-xl w-2/3 m-auto">
        <div>
          <video
            ref={videoRef}
            muted
            playsInline
            className="rounded-xl w-full h-full"
          />
          <canvas ref={canvasRef} hidden></canvas>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="col-start-3 col-end-4"></div>
          {/* <div className="col-end-7">
            <button>
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
          </div> */}
        </div>
      </div>
      <div className="my-3 m-auto">
        {isDeleting ? (
          <BeatLoader loading={isDeleting} />
        ) : streaming ? (
          <ColoredButton onClick={handleStopStreaming}>
            STOP STREAM
          </ColoredButton>
        ) : (
          <ColoredButton
            onClick={handleStartStreaming}
            disabled={!cameraEnabled}
          >
            START STREAM
          </ColoredButton>
        )}
      </div>
      <EventDescription event={event} stylec="w-3/4 mx-auto" />
    </>
  );
}

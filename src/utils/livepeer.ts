const carrabreApi = "9ab2a15c-f802-4800-855b-18687b4026f1";
// const myApi = "7836fafd-0c7d-4350-89f8-0b3b481aef6d";
const apiKey = carrabreApi;
const streamName = "IMBUE Test Stream";
const webSocketServerURL = "wss://infuluence-proxy.herokuapp.com";
const proxyURL = "https://infuluence-proxy.herokuapp.com/api/stream";
const streamProfiles = [
  {
    name: "720p",
    bitrate: 2000000,
    fps: 30,
    width: 1280,
    height: 720,
  },
  {
    name: "480p",
    bitrate: 1000000,
    fps: 30,
    width: 854,
    height: 480,
  },
  {
    name: "360p",
    bitrate: 500000,
    fps: 30,
    width: 640,
    height: 360,
  },
];

export const livepeer = {
  apiKey,
  proxyURL,
  webSocketServerURL,
  streamName,
  streamProfiles,
};

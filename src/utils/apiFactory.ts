import axios from "axios";
import { livepeer } from "./livepeer";
const apiInstance = axios.create({
  baseURL: livepeer.proxyURL,
  timeout: 10000,
});

const { apiKey } = livepeer;
export const createStream = () => {
  return apiInstance.post(
    "/stream",
    {
      name: "test_stream",
      profiles: livepeer.streamProfiles,
    },
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    }
  );
};

export const deleteStream = (streamId) => {
  return apiInstance.delete(`/${streamId}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });
};

export const getStreamStatus = (streamId) => {
  return apiInstance.get(`/${streamId}`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
  });
};

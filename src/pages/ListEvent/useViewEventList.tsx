import { useState, useEffect } from "react";
import axios from "axios";
import { useProvider } from "../../web3/useProvider";
// axios.defaults.baseURL = 'http://localhost:3001/api/getevents';
import {useEventsStoreContext} from "./../../utils/events.store";

import {apiUrls} from './../../utils/apiUrsl'

const useViewEventList = (): { response: any; error: any; loading1: any } => {

  const {setViewerEventList } = useEventsStoreContext();
  const { getAccounts, isConnected } = useProvider();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading1, setloading] = useState(true);

  const fetchData = (walletAddress) => {
    axios
      .get(`${apiUrls.fetchViewerEvents}/${walletAddress}`)
      .then((res) => {
        setResponse(res.data.data);
        setViewerEventList(res.data.data);
        console.log(response);
        console.log(res.data, "res.data");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    if (isConnected) getAccounts().then((accounts) => fetchData(accounts[0]));
  }, []);
  // custom hook returns value
  return { response, error, loading1 };
};

export { useViewEventList };

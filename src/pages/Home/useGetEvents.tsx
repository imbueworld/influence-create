import { useState, useEffect } from "react";
import axios from "axios";
import { useProvider } from "../../web3/useProvider";
import { useEventsStoreContext } from "./../../utils/events.store";

import { apiUrls } from "./../../utils/apiUrsl";
// axios.defaults.baseURL = 'http://localhost:3001/api/getevents';

const useGetEvents = (): { response: any; error: any; loading1: any } => {
  const { getAccounts, isConnected } = useProvider();
  const { setCreatorEventList } = useEventsStoreContext();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading1, setloading] = useState(true);

  const fetchData = (walletAddress) => {
    axios
      .get(`${apiUrls.fetchCreatorEvents}/${walletAddress}`)
      .then((res) => {
        setResponse(res.data.data);
        setCreatorEventList(res.data.data);
        setloading(false);
      })
      .catch((err) => {
        setError(err);
        setloading(false);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    if (isConnected) getAccounts().then((accounts) => fetchData(accounts[0]));
  }, []);
  return { response, error, loading1 };
};

export { useGetEvents };

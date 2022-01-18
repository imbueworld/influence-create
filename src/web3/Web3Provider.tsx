import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useProvider } from "./useProvider";

export default function Web3Provider(props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setProvider } = useProvider();
  let metamasked: any = localStorage.getItem("usedMetamask");
  useEffect(() => {
    async function fetchProvider() {
      if (metamasked === null) {
        setLoading(false);
        return;
      }
      metamasked = metamasked.startsWith("true");
      if (metamasked) await setProvider(true);
      else setProvider(false);
      setLoading(false);
    }
    fetchProvider();
  }, []);
  if (loading) return <BeatLoader />;
  return props.children;
}

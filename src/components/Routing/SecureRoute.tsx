import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
export default function SecureRoute({
  component: Component,
  metamaskProvider,
}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (metamaskProvider === null) {
      navigate("/");
      return;
    }
    setLoading(true);
    metamaskProvider
      .request({ method: "eth_requestAccounts" })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === 4001) {
          alert("You must connect wallet.");
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="absolute top-1/2 left-1/2">
          <BeatLoader />
        </div>
      ) : (
        <Component metamaskProvider={metamaskProvider} />
      )}
    </>
  );
}

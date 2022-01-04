import React from "react";
import Header from "../../components/Header";

export default function WrongNetwork({ metamaskProvider }) {
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="text-red-600 font-bold">
        You are currently on the wrong netwrok.
        <br />
        Please select correct network.
      </div>
    </>
  );
}

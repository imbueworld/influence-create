import React, { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";
import ColoredButton from "../../components/ColoredButton";
import { livepeer } from "../../utils/livepeer";
import axios from "axios";
import moment from "moment";
import { BeatLoader } from "react-spinners";
// import InputMoment from "react-date-time-picker";
import Select from "react-select";

const CryptoJS = require("crypto-js");
export default function CreateEvent({ metamaskProvider }) {
  //15 min, 30 min, 45 min, 1 hr, 2 hr, 3 hr, 24hr
  const durationData = [
    {
      value: 15,
      text: "15 min",
    },
    {
      value: 30,
      text: "30 min",
    },
    {
      value: 45,
      text: "45 min",
    },
    {
      value: 60,
      text: "1 hr",
    },
    {
      value: 120,
      text: "2 hr",
    },
    {
      value: 1440,
      text: "24 hr",
    },
  ];
  // const contract = getContract(metamaskProvider);
  const navigate = useNavigate();
  const { getContract } = useContract();
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    start_date: moment(Date.now()).format("yyyy-MM-DDTHH:mm"),
    duration: durationData[0],
    price: "0",
  });

  const { name, desc, start_date, price } = formData;
  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const setDuration = (e) => {
    setFormData({ ...formData, ["duration"]: e });
  };
  async function handleCreateEvent(e) {
    e.preventDefault();
    setLoading(true);

    const priceInETH = paid ? price : 0;
    const priceInwei = ethers.utils.parseEther(priceInETH.toString());
    const { apiKey, proxyURL, streamProfiles } = livepeer;
    const authorizationHeader = `Bearer ${apiKey}`;
    const streamName = name + "_" + start_date;

    try {
      const result = await axios.post(
        proxyURL,
        {
          name: streamName,
          profiles: streamProfiles,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // Stream Id needs to be passed as a header
          },
        }
      );
      if (result && result.data) {
        const { id, streamKey, playbackId } = result.data;
        let streamData =
          id + "&&" + streamKey + "&&" + playbackId + "&&" + apiKey;
        streamData = CryptoJS.AES.encrypt(streamData, name).toString();
        const contract = await getContract();
        const pendingAddEvent = await contract.addEvent(
          name,
          BigNumber.from(new Date(start_date).getTime()),
          BigNumber.from(formData.duration.value),
          desc,
          priceInwei,
          streamData
        );
        const res = await pendingAddEvent.wait();
        if (res.status) {
          alert("Event created successfully");
          navigate("/");
        }
      }
    } catch (err) {
      // Handles Invalid Stream Id error
      if ((err.code = 4001)) {
        setLoading(false);
        alert(err.message);
      }
      if (err.response.status === 403) {
        console.log("error 403");
      }
      console.log("Something went wrong");
    }
  }
  const symbol = localStorage.getItem("symbol");
  return (
    <div className="container text-center">
      <Header metamaskProvider={metamaskProvider} />

      <form
        className="grid grid-rows-4 gap-2 font-sans xl:w-1/2 md:p-0 sm:p-10 p-14 items-center text-center m-auto"
        onSubmit={handleCreateEvent}
      >
        <div className="md:text-3xl sm:text-2xl text-xl font-Lulo my-3">
          CREATE EVENT
        </div>
        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="EVENT NAME"
          onChange={onChange}
          required
        />
        <div className="flex">
          <input
            className="flex-auto w-3/4 bg-transparent border-b focus:outline-none border-black text-center mr-4"
            type="datetime-local"
            name="start_date"
            id="date"
            value={formData.start_date}
            placeholder="SELECT DATE/TIME"
            onChange={onChange}
            required
          />
          <Select
            className="flex-auto w-1/4"
            name="duration"
            placeholder="Select duration"
            value={formData.duration}
            options={durationData}
            onChange={setDuration}
            getOptionLabel={(e) => e.text}
          />
        </div>
        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="desc"
          id="desc"
          value={formData.desc}
          placeholder="EVENT DESCRIPTION"
          onChange={onChange}
        />
        <div className="bg-transparent border-b focus:outline-none border-black w-auto">
          <div className="flex justify-center">
            {paid ? (
              <>
                <button
                  type="button"
                  className="px-4 text-zinc-300"
                  onClick={() => setPaid(false)}
                >
                  FREE
                </button>
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setPaid(true)}
                >
                  PAID
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setPaid(false)}
                >
                  FREE
                </button>
                <button
                  type="button"
                  className="px-4 text-zinc-300"
                  onClick={() => setPaid(true)}
                >
                  PAID
                </button>
              </>
            )}
          </div>
        </div>
        {paid ? (
          <input
            className="bg-transparent border-b border-black mt-4 focus:outline-none text-center"
            type="number"
            name="price"
            id="price"
            placeholder={`PRICE (${symbol})`}
            onChange={onChange}
            required={paid}
            step="0.000001"
            min="0"
          />
        ) : null}

        <ColoredButton
          type="submit"
          stylec="my-5 w-1/2 m-auto"
          disabled={loading}
        >
          {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>}
        </ColoredButton>
      </form>
    </div>
  );
}

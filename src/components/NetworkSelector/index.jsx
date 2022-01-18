import React, { useEffect, useState } from "react";
import Select from "react-select";
import { switchNetwork } from "../../utils/addCustomNetwork";
import Optimistic from "./optimistic.svg";
import Harmony from "./harmony.svg";
import { useNavigate } from "react-router-dom";
import { BigNumber } from "ethers";
import { isContractDeployed } from "../../web3/useContract";
import { ethers } from "ethers";
export default function NetworkSelector({ metamaskProvider }) {
  const data = [
    {
      value: "0x45",
      text: "Optimistic-Test",
      icon: <img src={Optimistic} width="45" height="45" alt=""></img>,
    },
    {
      value: "0xa",
      text: "Optimistic",
      icon: <img src={Optimistic} width="45" height="45" alt=""></img>,
    },
    {
      value: "0x6357D2E0",
      text: "Harmony-Test",
      icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    },
    {
      value: "0x63564C40",
      text: "Harmony",
      icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    }, ///Added 01/18/2022
    {
      value: "0x66EEB",
      text: "Arbitrum Testnet",
      icon: <img src={Optimistic} width="45" height="45" alt=""></img>,
    },
    {
      value: "0xA4B1",
      text: "Arbitrum",
      icon: <img src={Optimistic} width="45" height="45" alt=""></img>,
    },
    {
      value: "0x13881",
      text: "Polygon Testnet",
      icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    },
    {
      value: "0x89",
      text: "Polygon",
      icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    },
  ];

  const [selectedOption, setSelectedOption] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!metamaskProvider) return;
    metamaskProvider.on("chainChanged", (_chainId) => setNetwork(_chainId));

    const provider = new ethers.providers.Web3Provider(metamaskProvider, "any");

    provider._networkPromise.then((network) => {
      data.forEach((option) => {
        if (BigNumber.from(network.chainId).eq(BigNumber.from(option.value))) {
          setSelectedOption(option);
          return;
        }
      });
    });
    return function cleanup() {
      metamaskProvider.removeListener("chainChanged", (_chainId) =>
        setNetwork(_chainId)
      );
    };
  }, []);

  const setNetwork = (chainId) => {
    data.forEach((option) => {
      if (BigNumber.from(option.value).eq(BigNumber.from(chainId))) {
        setSelectedOption(option);
        window.location.reload();
      }
    });
  };

  const handleChange = (e) => {
    if (!isContractDeployed(e.value)) {
      alert(
        "The smart contract isn`t deployed now.Using Optimistic network`s contract."
      );
      return;
    }

    switchNetwork(metamaskProvider, e.value)
      .then(() => {
        console.log(window.location.href.endsWith("wrong-network"));
        if (window.location.href.endsWith("wrong-network")) {
          navigate("/");
          return;
        } else if (window.location.href.endsWith("/#/")) {
          window.location.reload();
          return;
        }
        // setSelectedOption(e);
      })
      .catch((err) => {
        if (err.code === 4001) {
          setSelectedOption(null);
          console.log("denied");
        }
      });
  };

  const customSytles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),
    dropdownIndicator: (provided, state) => ({ visibility: "hidden" }),
    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  return (
    <div>
      <Select
        className="text-sm"
        styles={customSytles}
        placeholder="Select Network"
        value={selectedOption}
        options={data}
        onChange={handleChange}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.icon}
            <span className="m-auto">{e.text}</span>
          </div>
        )}
      />
    </div>
  );
}

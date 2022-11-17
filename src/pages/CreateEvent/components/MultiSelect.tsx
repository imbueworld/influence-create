import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { switchNetwork } from "./../../../utils/addCustomNetwork";
import Optimistic from "../../../components/NetworkSelector/optimistic.svg";
import Harmony from "../../../components/NetworkSelector/harmony.svg";
import Polygon from "../../../components/NetworkSelector/polygon.svg";
import Arbitrum_logo from "../../../components/NetworkSelector/Arbitrum_logo.jpeg";
import OptimisticMain from "../../../components/NetworkSelector/optimism.svg";
import { useNavigate } from "react-router-dom";
import { BigNumber } from "ethers";
import { isContractDeployed } from "../../../web3/useContract";
import { ethers } from "ethers";


export default function NetworkSelector({ metamaskProvider,selectedOptions,setSelectedOptions }) {
  const data = [
    // {
    //   value: "0x45",
    //   text: "Optimistic-Test",
    //   icon: <img src={OptimisticMain} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0xa",
    //   text: "Optimistic",
    //   icon: <img src={OptimisticMain} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0x6357D2E0",
    //   text: "Harmony-Test",
    //   icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0x63564C40",
    //   text: "Harmony",
    //   icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    // }, ///Added 01/18/2022
    {
      value: "0x66EEB",
      text: "Arbitrum Testnet",
      icon: <img src={Arbitrum_logo} width="45" height="45" alt=""></img>,
    },
    // {
    //   value: "0xA4B1",
    //   text: "Arbitrum",
    //   icon: <img src={Arbitrum_logo} width="45" height="45" alt=""></img>,
    // },
    {
      value: "0x13881",
      text: "Polygon Testnet",
      icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    },
    // {
    //   value: "0x89",
    //   text: "Polygon",
    //   icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    // },
  ];

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }




  // const handleChange = async (e) => {
  //   if (!isContractDeployed(e.value)) {
  //     alert(
  //       "The smart contract isn`t deployed now.Using Optimistic network`s contract."
  //     );
  //     return;
  //   }
  //   try {
  //     const switchNetworkRespose = await switchNetwork(
  //       metamaskProvider,
  //       e.value
  //     );
  //     console.log(switchNetworkRespose);
  //     // console.log("data_switch",data_switch)
  //     console.log(window.location.href.endsWith("wrong-network"));
  //     if (window.location.href.endsWith("wrong-network")) {
  //       navigate("/");
  //       return;
  //     } else if (window.location.href.endsWith("/#/")) {
  //       window.location.reload();
  //       return;
  //     }
  //     // setSelectedOption(e);
  //   } catch (error) {
  //     if (error.code === 4001) {
  //       setSelectedOptions(null);
  //       console.log("denied");
  //     }
  //   }
  // };
  function handleChange(value, event) {
    if (false) {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (false) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  const customSytles = {
    // menu: (provided, state) => ({
    //   ...provided,
    //   width: state.selectProps.width,
    //   borderBottom: "1px dotted pink",
    //   color: state.selectProps.menuColor,
    //   padding: 20,
    // }),
    // dropdownIndicator: (provided, state) => ({ visibility: "hidden" }),
    // control: (_, { selectProps: { width } }) => ({
    //   width: width,
    // }),
    option: (provided, state) => ({
      ...provided,
    display:"flex",
    gap:"10px"
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  // console.log(selectedOptions)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div  style={{ width:"16rem"}}>
      <ReactMultiSelectCheckboxes
        className="text-sm"
        styles={customSytles}
        placeholderButtonLabel="Select Networks For Events"
        value={selectedOptions}
        options={data}
        setState={setSelectedOptions}
        onChange={handleChange}
        getDropdownButtonLabel={getDropdownButtonLabel}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.icon}
            <span className="m-auto">{e.text}</span>
          </div>
        )}
      />
      </div>
    </div>
  );
}

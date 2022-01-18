import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getNetwork } from "../../utils/addCustomNetwork";
import { useNavigate } from "react-router-dom";
let provider;

export default function Wallet({ metamaskProvider }) {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!metamaskProvider) return;
    metamaskProvider.on("accountsChanged", handleAccountsChanged);
    metamaskProvider.on("chainChanged", (_chainId) =>
      handleChainChanged(_chainId)
    );

    const chainId = parseInt(metamaskProvider.networkVersion, 10);
    if (!isNaN(chainId)) {
      const hexString = "0x" + chainId.toString(16);
      handleChainChanged(hexString);
    }
    provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
    metamaskProvider
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => console.error(err));
  }, []);

  function handleChainChanged(_chainId) {
    const network = getNetwork(_chainId);
    if (network === undefined) {
      navigate("/wrong-network");
      return;
    }
    setSymbol(network.nativeCurrency.symbol);
    localStorage.setItem("symbol", network.nativeCurrency.symbol);
    metamaskProvider
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err) => console.error(err));
  }

  function handleAccountsChanged(accounts) {
    if (accounts[0]) {
      provider
        .getBalance(accounts[0])
        .then((balance) => {
          let balanceInEth = ethers.utils.formatEther(balance);
          balanceInEth = (+balanceInEth).toFixed(4);
          setBalance(balanceInEth);
        })
        .catch((err) => console.error(err));
      setAddress(`${accounts[0].slice(0, 5)}...${accounts[0].slice(-4)}`);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      {address ? (
        <div className="flex items-center justify-center py-1 pl-4 pr-1 text-sm rounded-3xl bg-[#DEFCFC] mx-3">
          <p className="text-black font-bold text-sm mr-2 py-2 break-normal">
            {balance + "" + symbol}
          </p>
          <div className="bg-white rounded-3xl text-black font-light px-4 py-2 mr-0 font-sans">
            {address}
          </div>
        </div>
      ) : null}
    </>
  );
}

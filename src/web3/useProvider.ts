import { isMobile } from "react-device-detect";

import WalletConnectProvider from "@walletconnect/ethereum-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
const testEnv = {
  RPC_URL_1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  RPC_URL_4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
  FORTMATIC_API_KEY: "pk_test_A6260FCBAA2EBDFB",
  MAGIC_API_KEY: "pk_test_398B82F5F0E88874",
  PORTIS_DAPP_ID: "e9be171c-2b7f-4ff0-8db9-327707511ee2",
};

const RPC_URLS: { [chainId: number]: string } = {
  1: testEnv.RPC_URL_1,
  4: testEnv.RPC_URL_4,
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "Pletori $PLE",
  supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 80001],
});
interface EthereumProvider {
  isMetaMask?: boolean;
}
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

let provider: WalletConnectProvider | any;
let isMetamask: boolean;
let account: any;
let isConnected: boolean;
// isMetamask = !isMobile;

export const useProvider = () => {
  isConnected = getConnected();
  async function detectProvider() {
    if (isMetamask) {
      if (typeof window === "undefined") {
        return;
      }
      provider = await detectEthereumProvider();
      localStorage.setItem("usedMetamask", "true");
    } else {
      provider = new WalletConnectProvider({
        rpc: {
          [1]: "https://mainnet.infura.io/v3/ce3c71b85fea4d3db649667cd1fe1c6d",
        },
        qrcodeModalOptions: {
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ],
          desktopLinks: ["encrypted ink"],
        },
      });
      await provider.enable().catch((error: any) => console.log(error));
      localStorage.setItem("usedMetamask", "false");
    }
    return provider;
  }

  async function setProvider(metamask?: boolean) {
    isMetamask = metamask;
    await detectProvider();
    console.log(provider);
  }

  async function connectWallet() {
    if (!provider) return;
    await getAccounts().then((accounts: Array<any>) => {
      account = accounts[0];
      localStorage.setItem("isConnected", "true");
      provider.on("disconnect", () => {
        console.log("dicso");
        localStorage.setItem("isConnected", "false");
        localStorage.setItem("usedMetamask", null);
      });
      provider.on("accountsChanged", () => {});
    });
    console.log(account);
    return account;
  }

  async function getChainId() {
    let chainId = await provider.request({ method: "eth_chainId" });
    chainId = parseInt(chainId, 16);
    chainId = "0x" + chainId.toString(16).toUpperCase();
    return chainId;
  }

  async function getAccounts() {
    return await provider.request({ method: "eth_requestAccounts" });
  }

  function getConnected() {
    if (!localStorage.getItem("isConnected")) return false;
    return localStorage.getItem("isConnected").startsWith("true");
  }

  function getProvider() {
    return isConnected ? provider : null;
  }

  return {
    getProvider,
    setProvider,
    connectWallet,
    getAccounts,
    getChainId,
    isConnected,
  };
};

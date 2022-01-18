/* eslint-disable */
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
// const POLLING_INTERVAL = 12000
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

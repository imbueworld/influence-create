import { BigNumber } from "ethers";

// let provider;
declare let window: any;

const Optimistic_Ethereum_Kovan = {
  chainId: "0x45",
  chainName: "Optimistic Ethereum(Kovan)",
  nativeCurrency: {
    name: "Ether",
    symbol: "KOR",
    decimals: 18,
  },
  rpcUrls: ["https://kovan.optimism.io"],
  blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
};
const Optimistic_Ethereum = {
  chainId: "0xa",
  chainName: "Optimistic Ethereum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.optimism.io"],
  blockExplorerUrls: ["https://optimistic.etherscan.io"],
};
const Harmony_Testnet_Shard_0 = {
  chainId: "0x6357D2E0",
  chainName: "Harmony Testnet Shard 0",
  nativeCurrency: {
    name: "Harmony ONE",
    symbol: "ONE",
    decimals: 18,
  },
  rpcUrls: ["https://api.s0.b.hmny.io"],
  blockExplorerUrls: ["https://cointool.app"],
};
const Harmony_Mainnet_Shard_0 = {
  chainId: "0x63564C40",
  chainName: "Harmony Mainnet Shard 0",
  nativeCurrency: {
    name: "Harmony ONE",
    symbol: "ONE",
    decimals: 18,
  },
  rpcUrls: ["https://api.harmony.one"],
  blockExplorerUrls: ["https://cointool.app"],
};
export const Networks = [
  Optimistic_Ethereum_Kovan,
  Optimistic_Ethereum,
  Harmony_Testnet_Shard_0,
  Harmony_Mainnet_Shard_0,
];

export const getNetwork = (chainId) => {
  let network;
  Networks.forEach((n) => {
    if (BigNumber.from(n.chainId).eq(BigNumber.from(chainId))) {
      network = n;
      // break;
    }
  });
  return network;
};

export async function switchNetwork(metamaskProvider, chainIdToSwith) {
  if (typeof window !== "undefined") {
    let networkToAdd = getNetwork(chainIdToSwith);
    const params = [networkToAdd];
    console.log(params);
    return await metamaskProvider.request({
      method: "wallet_addEthereumChain", //wallet_switchEthereumChain
      params,
    });
    // return result;
  }
}

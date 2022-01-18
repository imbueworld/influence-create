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
  blockExplorerUrls: ["https://explorer.testnet.harmony.one/"],
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
  blockExplorerUrls: ["https://explorer.harmony.one/"],
};
const Arbitrum_Testnet_Rinkeby = {
  chainId: "0x66EEB",
  chainName: "Arbitrum Testnet Rinkeby",
  nativeCurrency: {
    name: "Arbitrum ARETH",
    symbol: "ARETH",
    decimals: 18,
  },
  rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
  blockExplorerUrls: ["https://testnet.arbiscan.io/"],
};
const Arbitrum_Mainnet = {
  chainId: "0xA4B1",
  chainName: "Arbitrum",
  nativeCurrency: {
    name: "Arbitrum ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  blockExplorerUrls: ["https://arbiscan.io/"],
};

const Polygon_Testnet = {
  chainId: "0x13881",
  chainName: "Arbitrum Testnet Rinkeby",
  nativeCurrency: {
    name: "Polygon  MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};
const Polygon_Mainnet = {
  chainId: "0x89",
  chainName: "Matic",
  nativeCurrency: {
    name: "Matic  MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
};
export const Networks = [
  Optimistic_Ethereum_Kovan,
  Optimistic_Ethereum,
  Harmony_Testnet_Shard_0,
  Harmony_Mainnet_Shard_0,
  Arbitrum_Testnet_Rinkeby,
  Arbitrum_Mainnet,
  Polygon_Testnet,
  Polygon_Mainnet,
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

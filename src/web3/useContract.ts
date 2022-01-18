import { BigNumber, ethers } from "ethers";
import { useProvider } from "./useProvider";

const abiEthereum = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "who", type: "address" },
    ],
    name: "eventAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "bool", name: "", type: "bool" }],
    name: "purchaseDone",
    type: "event",
  },
  {
    inputs: [],
    name: "_event_count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "_events",
    outputs: [
      { internalType: "uint256", name: "_index", type: "uint256" },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_start", type: "uint256" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "string", name: "_streamData", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "datetime", type: "uint256" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "string", name: "streamData", type: "string" },
    ],
    name: "addEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "eventIndex", type: "uint256" }],
    name: "addPerson",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "_now", type: "uint256" },
    ],
    name: "getUpcomingEvents",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "_index", type: "uint256" },
          { internalType: "address", name: "_owner", type: "address" },
          { internalType: "string", name: "_name", type: "string" },
          { internalType: "uint256", name: "_start", type: "uint256" },
          { internalType: "uint256", name: "_duration", type: "uint256" },
          { internalType: "string", name: "_description", type: "string" },
          { internalType: "uint256", name: "_price", type: "uint256" },
          { internalType: "string", name: "_streamData", type: "string" },
        ],
        internalType: "struct ImbueToken.EventDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "eventIndex", type: "uint256" }],
    name: "isPurchased",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
const abiHarmony = [
  {
    inputs: [
      {
        indexed: false,
        internalType: "address",
        type: "address",
        name: "who",
      },
    ],
    type: "event",
    anonymous: false,
    name: "eventAdded",
  },
  {
    inputs: [
      {
        name: "",
        internalType: "bool",
        indexed: false,
        type: "bool",
      },
    ],
    anonymous: false,
    type: "event",
    name: "purchaseDone",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    name: "_event_count",
  },
  {
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        name: "_owner",
        internalType: "address",
        type: "address",
      },
      {
        type: "string",
        internalType: "string",
        name: "_name",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        name: "_description",
        type: "string",
        internalType: "string",
      },
      {
        name: "_price",
        internalType: "uint256",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_streamData",
        type: "string",
      },
    ],
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        name: "",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "_events",
  },
  {
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    name: "addEvent",
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        name: "datetime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        type: "uint256",
        internalType: "uint256",
        name: "duration",
      },
      {
        type: "string",
        name: "description",
        internalType: "string",
      },
      {
        type: "uint256",
        internalType: "uint256",
        name: "price",
      },
      {
        type: "string",
        internalType: "string",
        name: "streamData",
      },
    ],
  },
  {
    type: "function",
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          {
            internalType: "uint256",
            type: "uint256",
            name: "_index",
          },
          {
            name: "_owner",
            internalType: "address",
            type: "address",
          },
          {
            type: "string",
            internalType: "string",
            name: "_name",
          },
          {
            name: "_start",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "_duration",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "_description",
            internalType: "string",
            type: "string",
          },
          {
            type: "uint256",
            name: "_price",
            internalType: "uint256",
          },
          {
            name: "_streamData",
            type: "string",
            internalType: "string",
          },
        ],
        internalType: "struct ImbueToken.EventDetail[]",
      },
    ],
    stateMutability: "view",
    inputs: [
      {
        type: "address",
        internalType: "address",
        name: "owner",
      },
      {
        name: "_now",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    name: "getUpcomingEvents",
  },
  {
    type: "function",
    stateMutability: "payable",
    name: "addPerson",
    inputs: [
      {
        name: "eventIndex",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
  },
  {
    name: "isPurchased",
    type: "function",
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
    inputs: [
      {
        type: "uint256",
        name: "eventIndex",
        internalType: "uint256",
      },
    ],
  },
];
const abiEthereumTest = [
  {
    anonymous: false,
    type: "event",
    inputs: [
      {
        indexed: false,
        type: "address",
        name: "who",
        internalType: "address",
      },
    ],
    name: "eventAdded",
  },
  {
    anonymous: false,
    name: "purchaseDone",
    inputs: [
      {
        name: "",
        indexed: false,
        type: "bool",
        internalType: "bool",
      },
    ],
    type: "event",
  },
  {
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    type: "function",
    name: "_event_count",
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_events",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        internalType: "string",
        type: "string",
        name: "_name",
      },
      {
        type: "uint256",
        internalType: "uint256",
        name: "_start",
      },
      {
        name: "_duration",
        type: "uint256",
        internalType: "uint256",
      },
      {
        type: "string",
        internalType: "string",
        name: "_description",
      },
      {
        name: "_price",
        internalType: "uint256",
        type: "uint256",
      },
      {
        internalType: "string",
        type: "string",
        name: "_streamData",
      },
    ],
    stateMutability: "view",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    inputs: [
      {
        internalType: "string",
        type: "string",
        name: "name",
      },
      {
        name: "datetime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "duration",
        internalType: "uint256",
      },
      {
        internalType: "string",
        type: "string",
        name: "description",
      },
      {
        type: "uint256",
        name: "price",
        internalType: "uint256",
      },
      {
        name: "streamData",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    name: "addEvent",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        internalType: "struct ImbueToken.EventDetail[]",
        name: "",
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            name: "_name",
            internalType: "string",
            type: "string",
          },
          {
            name: "_start",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "_duration",
            internalType: "uint256",
            type: "uint256",
          },
          {
            internalType: "string",
            type: "string",
            name: "_description",
          },
          {
            name: "_price",
            type: "uint256",
            internalType: "uint256",
          },
          {
            type: "string",
            name: "_streamData",
            internalType: "string",
          },
        ],
      },
    ],
    name: "getUpcomingEvents",
    type: "function",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_now",
        internalType: "uint256",
        type: "uint256",
      },
    ],
  },
  {
    stateMutability: "payable",
    name: "addPerson",
    type: "function",
    inputs: [
      {
        name: "eventIndex",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    outputs: [],
  },
  {
    name: "isPurchased",
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        type: "uint256",
        name: "eventIndex",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        internalType: "bool",
        type: "bool",
      },
    ],
  },
];
const abiHarmonyTest = [
  {
    type: "event",
    anonymous: false,
    name: "eventAdded",
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
  },
  {
    name: "purchaseDone",
    type: "event",
    inputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
    inputs: [],
    name: "_event_count",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        type: "uint256",
        name: "",
      },
    ],
    name: "_events",
    stateMutability: "view",
    type: "function",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        type: "address",
        internalType: "address",
        name: "_owner",
      },
      {
        internalType: "string",
        type: "string",
        name: "_name",
      },
      {
        name: "_start",
        type: "uint256",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_duration",
        internalType: "uint256",
      },
      {
        name: "_description",
        internalType: "string",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        type: "string",
        name: "_streamData",
        internalType: "string",
      },
    ],
  },
  {
    type: "function",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        type: "uint256",
        name: "datetime",
        internalType: "uint256",
      },
      {
        name: "duration",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "description",
        internalType: "string",
        type: "string",
      },
      {
        name: "price",
        type: "uint256",
        internalType: "uint256",
      },
      {
        type: "string",
        name: "streamData",
        internalType: "string",
      },
    ],
    outputs: [],
    name: "addEvent",
    stateMutability: "nonpayable",
  },
  {
    name: "getUpcomingEvents",
    type: "function",
    outputs: [
      {
        components: [
          {
            name: "_index",
            type: "uint256",
            internalType: "uint256",
          },
          {
            type: "address",
            internalType: "address",
            name: "_owner",
          },
          {
            name: "_name",
            internalType: "string",
            type: "string",
          },
          {
            name: "_start",
            internalType: "uint256",
            type: "uint256",
          },
          {
            type: "uint256",
            name: "_duration",
            internalType: "uint256",
          },
          {
            internalType: "string",
            type: "string",
            name: "_description",
          },
          {
            internalType: "uint256",
            type: "uint256",
            name: "_price",
          },
          {
            type: "string",
            name: "_streamData",
            internalType: "string",
          },
        ],
        type: "tuple[]",
        name: "",
        internalType: "struct ImbueToken.EventDetail[]",
      },
    ],
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        type: "uint256",
        internalType: "uint256",
        name: "_now",
      },
    ],
  },
  {
    name: "addPerson",
    stateMutability: "payable",
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    outputs: [],
    type: "function",
  },
  {
    name: "isPurchased",
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        type: "uint256",
        internalType: "uint256",
        name: "eventIndex",
      },
    ],
    outputs: [
      {
        name: "",
        internalType: "bool",
        type: "bool",
      },
    ],
  },
];
const abiPolygonTest = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "eventAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "purchaseDone",
    type: "event",
  },
  {
    inputs: [],
    name: "_event_count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_events",
    outputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_streamData",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "datetime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "streamData",
        type: "string",
      },
    ],
    name: "addEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_now",
        type: "uint256",
      },
    ],
    name: "getUpcomingEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "_streamData",
            type: "string",
          },
        ],
        internalType: "struct ImbueToken.EventDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventIndex",
        type: "uint256",
      },
    ],
    name: "isPurchased",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const abis = new Map([
  ["0x45", abiEthereumTest],
  ["0xA", abiEthereum],
  ["0x6357D2E0", abiHarmonyTest],
  ["0x63564C40", abiHarmony],
  ["0x13881", abiPolygonTest],
]);

const addressMap = new Map([
  ["0x45", "0x0a02d9710a36e2F905F65F4f122556B70A900FFc"], //Optimistic
  ["0xA", "0xb2d44f91bfba624369940645ef54ef86a1ee90f0"],
  ["0x6357D2E0", "0x188a6d53d2ad50deb9d3fa93edb8feceaf67b2be"], //Harmony
  ["0x63564C40", "0x3829f87b08d6d37b319850fa17b2c081b1b83301"],
  ["0x13881", "0x3db241629639F437Db35550Ff2054695Fd5ec994"], //Polygon
]);

export const isContractDeployed = (chainId) => {
  let contract_address = "0x0";
  const chainIdUpperCase = chainId.toUpperCase().replace("0X", "0x");
  contract_address = addressMap.get(chainIdUpperCase);
  if (contract_address === undefined) contract_address = "0x0";
  return !BigNumber.from(contract_address).isZero();
};

export const useContract = () => {
  const { getProvider, getChainId } = useProvider();
  async function getContract() {
    let contract_address = "0x0";
    const provider = new ethers.providers.Web3Provider(getProvider());
    let chainId = await getChainId();

    chainId = parseInt(chainId, 16);
    if (!isNaN(chainId)) {
      chainId = "0x" + chainId.toString(16).toUpperCase();
      contract_address = addressMap.get(chainId);
      if (contract_address === undefined) return;
    }
    const signer = provider.getSigner();
    const abi = abis.get(chainId);
    return new ethers.Contract(contract_address, abi, signer);
  }
  return { getContract };
};

const SERVICE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_GymName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "_GymLocations",
        type: "string[]",
      },
    ],
    name: "eSetGymAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_GymName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_Genre",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_Discription",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_WebsiteLink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_twitter",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_instagram",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_OtherLink",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_MemberShipPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "_MobileNumber",
        type: "uint128",
      },
    ],
    name: "eSetGymDetails",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_GymName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "_ImageUrl",
        type: "string[]",
      },
    ],
    name: "eSetImageUrl",
    type: "event",
  },
  {
    inputs: [{ internalType: "string", name: "_GymAddress", type: "string" }],
    name: "SetGymAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_GymName", type: "string" },
      { internalType: "string", name: "_Genre", type: "string" },
      { internalType: "string", name: "_Discription", type: "string" },
      { internalType: "string", name: "_WebsiteLink", type: "string" },
      { internalType: "string", name: "_twitter", type: "string" },
      { internalType: "string", name: "_instagram", type: "string" },
      { internalType: "string", name: "_OtherLink", type: "string" },
      {
        internalType: "uint256",
        name: "_MemberShipPrice",
        type: "uint256",
      },
      { internalType: "uint128", name: "_MobileNumber", type: "uint128" },
    ],
    name: "SetGymDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_ImageUrl", type: "string" }],
    name: "SetImageUrl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "ViewDescription",
    outputs: [
      {
        components: [
          { internalType: "string", name: "GymName", type: "string" },
          { internalType: "string", name: "Genre", type: "string" },
          { internalType: "string", name: "Discription", type: "string" },
          { internalType: "string", name: "WebsiteLink", type: "string" },
          { internalType: "string", name: "twitter", type: "string" },
          { internalType: "string", name: "instagram", type: "string" },
          { internalType: "string", name: "otherLink", type: "string" },
          {
            internalType: "uint256",
            name: "MemberShipPrice",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "MobileNumber",
            type: "uint128",
          },
        ],
        internalType: "struct IMBUE_GymProfileSetUp.GymDetailsStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "ViewLocations",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getImageUrl",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
];

const CREATESCHEDULECLASS_ABI = [{ "inputs": [{ "internalType": "string", "name": "_ImageUrl", "type": "string" }, { "internalType": "string", "name": "_ClassName", "type": "string" }, { "internalType": "string", "name": "_Category", "type": "string" }, { "internalType": "string", "name": "_SubCategory", "type": "string" }, { "internalType": "string", "name": "_ClassLevel", "type": "string" }, { "internalType": "string", "name": "_Description", "type": "string" }, { "internalType": "string", "name": "_Location", "type": "string" }, { "internalType": "string", "name": "_DateAndTime", "type": "string" }, { "internalType": "string", "name": "_Duration", "type": "string" }, { "internalType": "string", "name": "_classMode", "type": "string" }, { "internalType": "string", "name": "_ClassType", "type": "string" }], "name": "CreateAndScheduleClasses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getClasses", "outputs": [{ "components": [{ "internalType": "address", "name": "studioWalltetAddress", "type": "address" }, { "internalType": "string", "name": "ImageUrl", "type": "string" }, { "internalType": "string", "name": "ClassName", "type": "string" }, { "internalType": "string", "name": "Category", "type": "string" }, { "internalType": "string", "name": "SubCategory", "type": "string" }, { "internalType": "string", "name": "ClassLevel", "type": "string" }, { "internalType": "string", "name": "Description", "type": "string" }, { "internalType": "string", "name": "Location", "type": "string" }, { "internalType": "string", "name": "Duration", "type": "string" }, { "internalType": "string", "name": "ClassType", "type": "string" }, { "internalType": "string", "name": "DateAndTime", "type": "string" }, { "internalType": "string", "name": "classMode", "type": "string" }], "internalType": "struct CreateScheduleClasses.ClassStruct[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }]

const SERVICE_PROFILE_ADDRESS = "0x798d27A3B566c32Cb553d45E4bd4D526f62FA848";
const CREATESCHEDULECLASS_ADDRESS ="0x601eb3A4e798c3F02e5D8412EFBA5DD733E68c24";

const SERVICE_PROVIDER = {
  SERVICE_PROFILE_ADDRESS: SERVICE_PROFILE_ADDRESS,
  SERVICE_ABI: SERVICE_ABI,
  CREATESCHEDULECLASS_ADDRESS: CREATESCHEDULECLASS_ADDRESS,
  CREATESCHEDULECLASS_ABI: CREATESCHEDULECLASS_ABI,
};

export { SERVICE_PROVIDER };

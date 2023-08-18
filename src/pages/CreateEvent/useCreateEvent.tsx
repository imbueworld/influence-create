import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../web3/useContract";
import { livepeer } from "../../utils/livepeer";
import axios from "axios";
import moment from "moment";
import { switchNetwork } from "../../utils/addCustomNetwork";

const STORAGE_NFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJCRWVCRTE4ZGQ2NUIwQzQyRTcwRDUwMkNhMjU5NzY5ZkZmMmFBMzUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NjkyMjM4NDY1NSwibmFtZSI6ImltYnVlIn0.b_aumE56xOB57HsLjN6VdmEmCjD5_hwqcLOs9T3MXrQ";

const CryptoJS = require("crypto-js");
// import InputMoment from "react-date-time-picker";

const useCreateEvent = ({ metamaskProvider }) => {
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

  const data = [
    // {
    //   value: "0x45",
    //   text: "Optimistic-Test",
    //   // icon: <img src={OptimisticMain} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0xa",
    //   text: "Optimistic",
    //   icon: <img src={OptimisticMain} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0x6357D2E0",
    //   text: "Harmony-Test",
    //   // icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0x63564C40",
    //   text: "Harmony",
    //   icon: <img src={Harmony} width="45" height="45" alt=""></img>,
    // }, ///Added 01/18/2022
    // {
    //   value: "0x66EEB",
    //   text: "Arbitrum Testnet",
    //   // icon: <img src={Arbitrum_logo} width="45" height="45" alt=""></img>,
    // },
    // {
    //   value: "0xA4B1",
    //   text: "Arbitrum",
    //   icon: <img src={Arbitrum_logo} width="45" height="45" alt=""></img>,
    // },
    {
      value: "0x13881",
      text: "Polygon Testnet",
      // icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    },
    // {
    //   value: "0x89",
    //   text: "Polygon",
    //   icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    // },
  ];

  // const contract = getContract(metamaskProvider);
  const navigate = useNavigate();

  const { getContract } = useContract();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentChainId, setCurrentChainId] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setpreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    start_date: moment(Date.now()).format("yyyy-MM-DDTHH:mm"),
    duration: durationData[0],
    price: "0",
  });
  useEffect(() => {
    // console.log("selectedOptions", selectedOptions);
    if (sessionStorage.getItem("eventsDataChainId") !== null) {
      navigate("/create-event-st");
    }
  }, []);

  useEffect(() => {
    if (!metamaskProvider) return;
    const provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
    provider._networkPromise.then((network) => {
      data.forEach((option) => {
        if (BigNumber.from(network.chainId).eq(BigNumber.from(option.value))) {
          setSelectedOptions([option]);
          return;
        }
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      let chainId = await metamaskProvider.request({ method: "eth_chainId" });
      chainId = parseInt(chainId, 16);
      chainId = "0x" + chainId.toString(16).toUpperCase();
      console.log("chainId", chainId);
      setCurrentChainId(chainId);
    })();
  }, []);

  // useEffect(() => {
  //   const fun = async () => {
  //     // console.log(JSON.parse(window.localStorage.getItem("myObject")));

  //     if (sessionStorage.getItem("eventsDataChainId") !== null) {
  //       let storageDataEvents = await JSON.parse(
  //         sessionStorage.getItem("eventsDataChainId")
  //       );
  //       console.log("storageDataEvents", storageDataEvents);
  //       let chainId_n = await metamaskProvider.request({
  //         method: "eth_chainId",
  //       });
  //       chainId_n = parseInt(chainId_n, 16);
  //       chainId_n = "0x" + chainId_n.toString(16).toUpperCase();
  //       const filterChainIdData = await storageDataEvents.eventsData.filter(
  //         (el) => el.chainId == chainId_n
  //       );
  //       console.log(filterChainIdData[0].streamStorageData.name);
  //       const contract = await getContract();
  //       const pendingAddEvent = await contract.addEvent(
  //         filterChainIdData[0].streamStorageData.name,
  //         filterChainIdData[0].streamStorageData.startDate,
  //         filterChainIdData[0].streamStorageData.durationData,
  //         filterChainIdData[0].streamStorageData.description,
  //         filterChainIdData[0].streamStorageData.price,
  //         filterChainIdData[0].streamStorageData.id,
  //         filterChainIdData[0].streamStorageData.url,
  //         chainId_n,
  //         filterChainIdData[0].streamStorageData.streamddata
  //       );
  //       const res = await pendingAddEvent.wait();
  //       if (res.status) {

  //         // navigate("/");
  //         const filterChainsIdData = storageDataEvents.eventsData.filter(
  //           (el) => el.chainId !== chainId_n
  //         );
  //         switchNetwork(metamaskProvider, filterChainsIdData[0].chainId);
  //         if (filterChainsIdData.length != 0) {
  //           window.sessionStorage.setItem(
  //             "eventsDataChainId",
  //             JSON.stringify({ eventsData: filterChainsIdData })
  //           );
  //           // switchNetwork(metamaskProvider, filterChainsIdData[0].chainId);
  //         } else {
  //           window.sessionStorage.removeItem("eventsDataChainId");
  //           navigate("/");
  //         }
  //       }
  //     }

  //     // console.log(JSON.parse(window.localStorage.getItem("myObject")));
  //     // const mydata = JSON.parse(window.localStorage.getItem("myObject"));
  //     // window.localStorage.removeItem("myObject");
  //     // let chainId = await metamaskProvider.request({ method: "eth_chainId" });
  //     // chainId = parseInt(chainId, 16);
  //     // chainId = "0x" + chainId.toString(16).toUpperCase();
  //     // if (mydata.isHave) {
  //     //   const contract = await getContract();
  //     //   const pendingAddEvent = await contract.addEvent(
  //     //     mydata.streamStorageData.name,
  //     //     mydata.streamStorageData.startDate,
  //     //     mydata.streamStorageData.durationData,
  //     //     mydata.streamStorageData.description,
  //     //     mydata.streamStorageData.price,
  //     //     mydata.streamStorageData.id,
  //     //     mydata.streamStorageData.url,
  //     //     chainId,
  //     //     mydata.streamStorageData.streamddata
  //     //   );
  //     //   const res = await pendingAddEvent.wait();

  //     //   navigate("/");
  //     // }
  //   };
  //   fun().then().catch((err)=>{
  //     window.sessionStorage.removeItem("eventsDataChainId");
  //   });
  // }, []);

  const { name, desc, start_date, price } = formData;
  const onChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const setDuration = (e) => {
    setFormData({ ...formData, ["duration"]: e });
  };
  const onFileChange = (event) => {
    console.log("onChange:", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setpreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  async function handleCreateEvent(e) {
    e.preventDefault();
    // console.log("selectedOptions", selectedOptions);
    window.sessionStorage.removeItem("eventsDataChainId");
    setLoading(true);

    // debugger;
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

      let bodyContent = new FormData();
      bodyContent.append("file", selectedFile);
      const resT = await axios.post(
        "https://api.nft.storage/upload",
        bodyContent,
        {
          headers: {
            Authorization: `Bearer ${STORAGE_NFT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(resT);
      console.log(selectedFile);
      if (resT.data.ok === true) {
        console.log(resT.data.value.cid);
        console.log(
          `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`
        );
      }

      if (result && result.data) {
        const { id, streamKey, playbackId } = result.data;
        let streamData =
          id + "&&" + streamKey + "&&" + playbackId + "&&" + apiKey;
        console.log("id=================================", id);

        streamData = CryptoJS.AES.encrypt(streamData, name).toString();
        if (check) {
          const result2 = await axios.patch(
            `${proxyURL}/${id}/record`,
            { record: true },
            {
              headers: {
                "content-type": "application/json",
                authorization: authorizationHeader, // Stream Id needs to be passed as a header
              },
            }
          );
          console.log(result2);
        }

        const contract = await getContract();

        const pendingAddEvent = await contract.addEvent(
          name,
          BigNumber.from(new Date(start_date).getTime()),
          BigNumber.from(formData.duration.value),
          desc,
          priceInwei,
          id,
          `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`,
          currentChainId,
          streamData
        );

        // console.log({
        //   name: name,
        //   startDate: BigNumber.from(new Date(start_date).getTime()),
        //   durationData: BigNumber.from(formData.duration.value),
        //   description: desc,
        //   price: priceInwei,
        //   id: id,
        //   url: `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`,
        //   streamddata: streamData,
        // });

        const res = await pendingAddEvent.wait();
        if (res.status) {
          const filOP = selectedOptions.filter(
            (el) => el.value != currentChainId
          );
          console.log(filOP);
          if (filOP.length > 0 && paid) {
            window.sessionStorage.setItem(
              "eventsDataChainId",
              JSON.stringify({
                eventsData: [
                  ...filOP.map((el) => {
                    return {
                      chainId: el.value,
                      isEventCreated: false,
                      streamStorageData: {
                        name: name,
                        startDate: BigNumber.from(
                          new Date(start_date).getTime()
                        ),
                        durationData: BigNumber.from(formData.duration.value),
                        description: desc,
                        price: priceInwei,
                        id: id,
                        url: `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`,
                        currentChainId: currentChainId,
                        streamddata: streamData,
                      },
                    };
                  }),
                ],
              })
            );

            window.localStorage.setItem(
              "myObject",
              JSON.stringify({
                isHave: true,
                streamStorageData: {
                  name: name,
                  startDate: BigNumber.from(new Date(start_date).getTime()),
                  durationData: BigNumber.from(formData.duration.value),
                  description: desc,
                  price: priceInwei,
                  id: id,
                  url: `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`,
                  currentChainId: currentChainId,
                  streamddata: streamData,
                },
              })
            );
            switchNetwork(metamaskProvider, filOP[0].value);
          } else {
            alert("Event created successfully");
            navigate("/");
          }
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

  return {
    handleCreateEvent,
    formData,
    onChange,
    previewImage,
    setpreviewImage,
    setSelectedFile,
    onFileChange,
    durationData,
    setDuration,
    paid,
    setPaid,
    check,
    setCheck,
    loading,
    selectedOptions,
    setSelectedOptions,
  };
};

export default useCreateEvent;

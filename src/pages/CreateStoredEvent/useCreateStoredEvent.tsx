import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useContract } from "../../web3/useContract";
import { switchNetwork } from "../../utils/addCustomNetwork";

const useCreateStoredEvent = ({ metamaskProvider }) => {
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
    //   // icon: <img src={Arbitrum_logo} width="45" height="45" alt=""></img>,
    // },
    {
      value: "0x13881",
      text: "Polygon Testnet",
      // icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    },
    {
      value: "0x89",
      text: "Polygon",
      // icon: <img src={Polygon} width="45" height="45" alt=""></img>,
    },
  ];

  const navigate = useNavigate();

  const { getContract } = useContract();
  const [CurrentChainIdData, setCurrentChainIdData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventChainId, setEventChainId] = useState(null);

  useEffect(() => {
    const createEvent = async () => {
      try {
        if (!(sessionStorage.getItem("eventsDataChainId") !== null)) {
          navigate("/");
          return;
        }

        if (sessionStorage.getItem("eventsDataChainId") !== null) {
          let storageDataEvents = await JSON.parse(
            sessionStorage.getItem("eventsDataChainId")
          );
          console.log("storageDataEvents", storageDataEvents);
          let chainId_n = await metamaskProvider.request({
            method: "eth_chainId",
          });
          chainId_n = parseInt(chainId_n, 16);
          chainId_n = "0x" + chainId_n.toString(16).toUpperCase();
          const filterChainIdData = await storageDataEvents.eventsData.filter(
            (el) => el.chainId == chainId_n
          );
          setCurrentChainIdData(filterChainIdData[0].streamStorageData);
          console.log(filterChainIdData[0].streamStorageData);
          const contract = await getContract();
          const pendingAddEvent = await contract.addEvent(
            filterChainIdData[0].streamStorageData.name,
            filterChainIdData[0].streamStorageData.startDate,
            filterChainIdData[0].streamStorageData.durationData,
            filterChainIdData[0].streamStorageData.description,
            filterChainIdData[0].streamStorageData.price,
            filterChainIdData[0].streamStorageData.id,
            filterChainIdData[0].streamStorageData.url,
            chainId_n,
            filterChainIdData[0].streamStorageData.streamddata
          );

          setEventChainId(
            data.filter(
              (el) => el.value.toUpperCase() === chainId_n.toUpperCase()
            )[0].text
          );
          const res = await pendingAddEvent.wait();
          console.log(res);
          if (res.status) {
            alert("Event is created successfully");

            const filterChainsIdData = storageDataEvents.eventsData.filter(
              (el) => el.chainId !== chainId_n
            );

            if (filterChainsIdData.length > 0) {
              switchNetwork(metamaskProvider, filterChainsIdData[0].chainId);
              window.sessionStorage.setItem(
                "eventsDataChainId",
                JSON.stringify({ eventsData: filterChainsIdData })
              );
            } else {
              window.sessionStorage.removeItem("eventsDataChainId");
              navigate("/");
            }
          }
        }
      } catch (err) {
        window.sessionStorage.removeItem("eventsDataChainId");
        if ((err.code = 4001)) {
          setLoading(false);
          alert(err.message);
          navigate("/");
          return;
        }
        if (err.response.status === 403) {
          console.log("error 403");
          alert("Something went wrong");
          navigate("/");
          return;
        }
        console.log("Something went wrong");
        alert("Something went wrong");
        navigate("/");
        return;
      }
    };

    (async () => {
      try {
        const event = await createEvent();
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
        window.sessionStorage.removeItem("eventsDataChainId");
        navigate("/");
      }
    })();
  }, []);

  return {
    CurrentChainIdData,
    loading,
  };
};

export default useCreateStoredEvent;

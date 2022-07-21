import { ethers, BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";

export default function PurchesedSubscriptions({ metamaskProvider }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionIndex, setSubscriptionIndex]  = useState("")
  const { getContract } = useContract();
  useEffect(() => {
    (async () => {
      try {
        const contract = await getContract();
        const sub = await contract.getSubscriptions();

        const getPurchesedSubscriptionList = async (sub, narr) => {
          const promises = sub.map(async (one_subscriptions) => {
            const contract = await getContract();
            const sub2 = await contract.isSubscriptionPurchesed(
              one_subscriptions?._index
            );
            console.log(sub2);
            if (sub2) {
              narr.push(one_subscriptions);
            }
            return sub2;
          });
          console.log(promises);
          return Promise.all(promises);
        };
        const narr = [];
        const purchesedSubscriptionLIst = await getPurchesedSubscriptionList(
          sub,
          narr
        );
        console.log(narr);
        console.log("purchesedSubscriptionLIst", purchesedSubscriptionLIst);
        setSubscriptions(narr);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();

    return () => {};
  }, [subscriptionIndex]);

  async function handelCancelSubscription(index) {
    try {
      setSubscriptionIndex(index);
      const contract = await getContract();

    const pendingCancel = await contract.cancelSubscriptions(BigNumber.from(index));
    const res = await pendingCancel.wait();
    if(res.status) {
      alert("Subscription cancelled successfully")
      setSubscriptionIndex("");
    }
 
    } catch (err) {
      if (err.code === 4001) {
        alert("some errro occured.");
        setSubscriptionIndex("");
        //  setLoading(false);
      }
    }
  }
  const symbol = localStorage.getItem("symbol");
  const availableSubscriptions =     subscriptions && subscriptions.length > 0 ? ( subscriptions.map((subscription)=>{
    return (
      <div className="flex gap-8  px-15 mx-10 my-5 ">
      <div className="rounded-lg shadow-lg overflow-hidden mb-4">
        <div className="px-6 py-8 bg-gray-800  sm:pb-6">
          <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
             Subscription Plan
            </span>
          </div>
          <div className="mt-4 flex justify-center text-4xl leading-none font-extrabold text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-400">
              {/* from */}
            </span>
            {subscription?ethers.utils.formatEther(subscription?._price.toString()):null} {symbol}
            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-400">
            </span>
          </div>
        </div>
        <div className="px-6 pt-6 pb-8 bg-gray-800  sm:pt-6">
          <ul>
            <li className="mt-4 flex items-start">
         
              <p className="ml-3 text-base leading-6 text-gray-200">
         <p>Address: </p> <p> {subscription?._owner}</p>
              </p>
            </li>
            <li className="mt-4 flex items-start">
           
              <p className="ml-3 text-base leading-6 text-gray-200">
            Name:   {subscription?._name}
            </p>
            </li>
            <li className="mt-4 flex items-start">
          
              <p className="ml-3 text-base leading-6 text-gray-200">
          Description: {subscription?._description}
              </p>
            </li>
          </ul>
          <div className="mt-6 rounded-md shadow">
          <ColoredButton onClick={()=>handelCancelSubscription(subscription?._index.toString())} style={{width:"55%"}} stylec="mx-4  my-4">
          {subscription?._index.toString() == subscriptionIndex  ? (
            <BeatLoader loading={subscription?._index.toString() == subscriptionIndex } />
          ) : (
            <>Cancel Subscription</>
          )}
      </ColoredButton>
          </div>
        </div>
      </div>
    </div>
    )
  })):(
    <div className="text-2xl mt-3">NO Available Purchesed Subscription...</div>
  );

  return (
    <>
      <div className="container text-center">
        <Header metamaskProvider={metamaskProvider} />{" "}
        {/* <div className="flex justify-end pt-6 pr-6">
        <button
          onClick={handleCreateSubscription}
          type="button"
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Create Subscription
        </button>
      </div> */}
        <div className="md:text-3xl sm:text-2xl text-xl font-Lulo my-3">
          Purchesed Subscribtions List
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {loading ? (
            <BarLoader loading={loading} />
          ) : availableSubscriptions}
        </div>
      </div>
    </>
  );
}

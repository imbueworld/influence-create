import { ethers,BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";

export default function Subscribtions({metamaskProvider}) {
  const [subscriptions , setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionIndex, setSubscriptionIndex]  = useState("")
  const navigate = useNavigate();
const {getContract } = useContract();
useEffect(() => {
  (async ()=>{

    try {
      const contract = await getContract();
      const sub = await contract.getSubscriptions();
      console.log(sub)
      setSubscriptions(sub)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }

  })();

  return () => {
  };
}, [])
  function handleCreateSubscription() {
    navigate("/create-subscription");
  }

 async function  handleSubscribe(index) {
  try {
    setSubscriptionIndex(index);
    const contract = await getContract();
  const sub2 = await contract.isSubscriptionPurchesed(BigNumber.from(index));
  if(sub2) {
    alert("you already have purchesed this subscription");
    setSubscriptionIndex("");
    return;
  }


  const overrides = {
    value: subscriptions[0]?._price.toString(),
    gasLimit: 90000,
  };


  const sub = await contract.subscribe(BigNumber.from(index), overrides);
  setSubscriptionIndex("");
  } catch (err) {
    if (err.code === 4001) {
      alert("User denied purchase.");
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
              {/* /All Time Free */}
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
          <ColoredButton onClick={()=>handleSubscribe(subscription?._index.toString())} style={{width:"55%"}} stylec="mx-4  my-4">
          {subscription?._index.toString() == subscriptionIndex  ? (
            <BeatLoader loading={subscription?._index.toString() == subscriptionIndex } />
          ) : (
            <>SUBSCRIBE</>
          )}
      </ColoredButton>
          </div>
        </div>
      </div>
    </div>
    )
  })):(
    <div className="text-2xl mt-3">NO Available Subscription...</div>
  )
  
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
      <div className="flex justify-end pt-6 pr-6">
      <ColoredButton onClick={handleCreateSubscription} stylec="mx-4 my-4">
        CREATE SUBSCRIPTION
        </ColoredButton>
        </div>
        <div className="flex flex-wrap items-center justify-center">
        {loading ? <BarLoader loading={loading} /> : availableSubscriptions}
   </div>
      </div>
    </>
  );
}

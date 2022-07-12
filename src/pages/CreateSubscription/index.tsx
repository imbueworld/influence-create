import { ethers } from "ethers";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";

export default function CreateSubscription({ metamaskProvider }) {
  const navigate = useNavigate();
  const { getContract } = useContract();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "0",
  });
  const [loading, setLoading] = useState(false);

  // const errorHandler = async (fn) => {
  //   try {
      
  //   } catch (error) {
  //     alert('error')
  //   }
  // }

  async function handleCreateSubscription(e) {
    try {
      const {name,desc,price} = formData;
      e.preventDefault();
      setLoading(true);
      const priceInwei = ethers.utils.parseEther(price.toString());
      const contract  = await getContract();
      const pendingSubscription = await contract.addSubscritpion(
        name,
        desc,
        priceInwei,
      )
      const res = await pendingSubscription.wait();
      console.log('res',res)
      if(res.status) {
        alert('subscription created susscessfully');
        navigate("/")
      }
      setLoading(false);
    } catch (error) {
    //  console.error("err",error.data.message) 

    if(error.code ==-32603) {
      alert(error?.data?.message)
      setLoading(false);
      return;
    }

     
  

     if ((error.code == 4001)) {
      setLoading(false);
      alert(error.message);
      return;
    }
    if (error.response.status === 403) {
      console.log("error 403");
      setLoading(false);
      return;
    }
    console.log("Something went wrong");
    setLoading(false);
    }
  }


  const onChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const symbol = localStorage.getItem("symbol");
  return (
    <div className="container text-center">
      <Header metamaskProvider={metamaskProvider} />{" "}
      <form
        className="grid grid-rows-4 gap-2 font-sans xl:w-1/2 md:p-0 sm:p-10 p-14 items-center text-center m-auto"
        onSubmit={handleCreateSubscription}
      >
        <div className="md:text-3xl sm:text-2xl text-xl font-Lulo my-3">
          CREATE SUBSCRIPTION
        </div>
        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="NAME"
          onChange={onChange}
          required
        />

        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="desc"
          id="desc"
          value={formData.desc}
          placeholder="DESCRIPTION"
          onChange={onChange}
          required
        />

        <input
          className="bg-transparent border-b border-black mt-4 focus:outline-none text-center"
          type="number"
          name="price"
          id="price"
          placeholder={`PRICE (${symbol})`}
          onChange={onChange}
          required={true}
          step="0.000001"
          min="0"
        />

        <ColoredButton
          type="submit"
          stylec="my-5 w-1/2 m-auto cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            <>CREATE SUBSCRIPTION</>
          )}
        </ColoredButton>
      </form>
    </div>
  );
}

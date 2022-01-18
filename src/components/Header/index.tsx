import React from "react";
import { Link } from "react-router-dom";
import Wallet from "../Wallet";
import NetworkSelector from "../NetworkSelector";
export default function Header({ metamaskProvider }) {
  return (
    <div className='grid grid-cols-12 justify-items-center items-center py-20 pb-10'>
      <Link
        className='md:col-start-5 md:col-span-4 col-start-4 col-span-6   md:text-5xl sm:text-3xl text-2xl'
        to='/'>
        I M B U E
      </Link>
      <div className='col-start-5 col-span-4 mt-4 md:col-end-12 md:col-span-2 md:mt-0'>
        <NetworkSelector metamaskProvider={metamaskProvider} />
        <Wallet metamaskProvider={metamaskProvider} />
      </div>
    </div>
  );
}

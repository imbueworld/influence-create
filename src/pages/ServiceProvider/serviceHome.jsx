import React from 'react'
import { Link } from "react-router-dom";
import "./css/ServiceHome.css"


export default function ServiceHome() {
  return (
    <div className='flex flex-col justify-between min-h-[100vh]'>
      <div>
        <div className='grid grid-cols-12 justify-items-center items-center py-20 pb-10'>
          <Link
            className='md:col-start-5 md:col-span-4 col-start-4 col-span-6   md:text-3xl sm:text-3xl text-2xl'
            to='/'>
            I M B U E
          </Link>
        </div>
        <div className='serviceSubTile font-medium'>
          <p>a decentralized, community operated universal membership</p>
        </div>

        <div className='service-wallet-btn flex justify-center items-center	'>
          <button className='not-italic max-w-[100%]	font-normal text-[17px] leading-[3rem] md:py-[3px] sm:py-[3px] py-[3px] md:px-[162px] sm:px-[20px] px-[162px] md:mt-[143px] sm:mt-[143px] mt-[143px]'>Connect Wallet</button>
        </div>
      </div>

      <div className="service-discord inline-block py-10 flex justify-end px-4">
        <img src="/asset/discord.png" alt="discord-icon" />
      </div>

    </div>

  )
}

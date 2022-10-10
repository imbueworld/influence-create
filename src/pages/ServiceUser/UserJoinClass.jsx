import React from 'react'
import { Link } from 'react-router-dom'
import UserHeader from './UserHeader'
import EventImg from "../../assets/image/event.png"

export default function UserJoinClass() {
    return (
        <>
            <div className='flex justify-around items-center md:pt-8 sm:pt-8 pt-8 pl-[400px]'>

                <Link

                    className='md:col-start-5 md:col-span-4 col-start-4 col-span-6   md:text-4xl sm:text-3xl text-2xl '
                    to='/viewclass '>
                    I M B U E
                </Link>

                <div className='col-start-5 col-span-4 mt-4 md:col-end-12 md:col-span-2 md:mt-0 service-wallet-balance'>
                    <div className="flex items-center justify-center py-0 pl-4 pr-0 text-lg lg:md:text-xs sm:text-xs text-xs rounded-3xl bg-[#DEFCFC] mx-3">
                        <p className="text-black font-bold text-xs mr-2 py-2 break-normal">
                            {"233.35 ONE" + ""}
                        </p>
                        <div className="bg-white rounded-3xl text-black font-light px-10 py-3 mr-0 font-sans">
                            {"0x472...7381"}
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex justify-center'>
                <img src={EventImg} alt="eventimg"/>
            </div>
            <div className='flex justify-between items-center px-[200px] py-[20px] text-sm	' >  
            <p className='px-4'>WORKOUT LIVE</p>
            <p className='px-2'>
            workout with me and get all the tips of the tips of the trade.
            </p>
                <p className='px-4'>
                8 am - 9 am July 21 2021
                </p>
            </div>
        </>
    )
}

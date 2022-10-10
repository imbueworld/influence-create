import React from 'react'
import { Link } from 'react-router-dom'
import "./css/serviceIndex.css"

export default function ServiceHeader() {
    return (

        <div className=' service-header justify-items-center items-center md:py-10 sm:py-10 py-10'>
            <Link
                className='md:col-start-5 md:col-span-4 col-start-4 col-span-6   md:text-4xl sm:text-3xl text-2xl '
                to='/'>
                I M B U E
            </Link>
            <div className='col-start-5 col-span-4 mt-4 md:col-end-12 md:col-span-2 md:mt-0 flex w-full justify-end	service-wallet-balance'>
                <div className="flex items-center justify-center py-0 pl-4 pr-0 text-lg lg:md:text-xs sm:text-xs text-xs rounded-3xl bg-[#242429] mx-3">
                    <p className="text-white font-bold text-xs mr-2 py-2 break-normal">
                        {"3.95 ETH" + ""}
                    </p>
                    <div className="bg-[#FFE6EB] rounded-3xl text-black font-light px-10 py-3 mr-0 font-sans">
                        {"0x472...7381"}
                    </div>
                </div>

            </div>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import ColoredButton from '../../components/ColoredButton'

export default function UserHeader({ button, buttonText, buttonclick, Hide }) {
    return (

        <>
            <div className='flex justify-around items-center md:pt-8 sm:pt-8 pt-8'>
                {
                    button &&
                    <div className='flex font-Timmana mb-[50px]'>
                        <button className='not-italic font-normal text-[17px] leading-[2rem] md:py-[4px] sm:py-[4px] py-[4px] md:px-[102px] sm:px-[102px] px-[102px] rounded-3xl bg-[#FFE6EB]' onClick={buttonclick}>{buttonText}</button>
                    </div>
                }
                <Link
                    className='md:col-start-5 md:col-span-4 col-start-4 col-span-6   md:text-4xl sm:text-3xl text-2xl '
                    to="/viewclass">
                    I M B U E
                </Link>
                <div className='col-start-5 col-span-4 mt-4 md:col-end-12 md:col-span-2 md:mt-0 service-wallet-balance'>
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
            <div className='flex justify-center'>
                <p className='font-Timmana'>a decentralized, community operated universal membership</p>
            </div>
            {/* {
                Hide &&
                
                <div className='flex flex-col font-Timmana items-center' style={{ float: "right" }}>
                    <p>You haven’t purchased a membership yet</p>
                    <button className='flex justify-center w-1/3 not-italic font-normal text-[17px] leading-[2rem] md:py-[4px] sm:py-[4px] py-[4px] md:px-[102px] sm:px-[102px] px-[102px] rounded-3xl bg-[#FFE6EB]' >Purchase</button>
                </div>
            } */}
        </>
    )
}

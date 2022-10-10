import React, { useState } from 'react'
import Calendar from 'react-calendar';
import UserHeader from './UserHeader'
import UserSubHeader from './UserSubHeader'
import GymImg from "../../assets/image/gymPicture.png"
import DirImg from "../../assets/image/direction.png"
import WebImg from "../../assets/image/website.png"
import InstaImg from "../../assets/image/instagram.png"
import FacebookImg from "../../assets/image/facebook.png"
import TwitterImg from "../../assets/image/twitter.png" 
import CallImg from "../../assets/image/call.png"
import UserBookClass from './UserBookClass';
export default function UserViewDetails() {
    const [value, onChange] = useState(new Date());

    return (
        <>
            <UserSubHeader />
            <div className='w-full flex gap-20'>
                <div className='flex flex-col items-baseline w-1/2 font-Timmana pl-[5rem]'>
                    <img src={GymImg} alt="gymimg" width={250} height={250} />
                    <div className='leading-[3rem] flex flex-col items-baseline'>
                    <p>9 rounds</p>
                    <p className='text-xs'>kickboxing, cardio</p>
                    <p className='text-xs'>The best kickboxing studio around.</p>
                    </div>
                    <div className='text-base font-light py-4 font-sans'>
                        <span className='flex flex-row gap-4 py-1'><img src={DirImg} width={25}/> <p>611 Emerson St,Palo Alto,CA,94301</p> </span>
                        <span className='flex flex-row gap-4 py-1'><img src={CallImg} width={25} alt="callimg"/><p>+12128047918</p></span>
                        <span className='flex flex-row gap-4 py-1' ><img src={WebImg} width={25} alt="webimg"/> <p>doyourumble.com</p></span>
                        <span className='flex flex-row gap-4 py-1'><img src={InstaImg} width={25} alt="instaimg"/><p>@doyourumble</p></span>
                        <span className='flex flex-row gap-4 py-1'><img src={FacebookImg} width={25} alt="facebookimg"/> <p>DoYouRumble</p></span>
                        <span className='flex flex-row gap-4 py-1'><img src={TwitterImg} width={25} alt="twitterimg"/><p>@doyourumble</p></span>
                    </div>

                </div>
                <div className='w-full w-1/2 '>
                    <div className='calender-main flex pl-4'>
                        <Calendar onChange={onChange} value={value} 	/>

                    </div>
                    {/* <p className='text-center'>
                        <span className='bold'>Selected Date:</span>{' '}
                        {value.toDateString()}
                    </p> */}
                    <UserBookClass/>

                </div>
            </div>

        </>
    )
}

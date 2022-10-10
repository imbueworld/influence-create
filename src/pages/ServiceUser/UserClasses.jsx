import React, { useState } from 'react'
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import "../ServiceProvider/css/Calendar.css"
import UserHeader from './UserHeader'
import UserOnlineList from './UserOnlineList';
import UserShowNft from './UserShowNft';

export default function UserClasses() {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();

    const NavFunction = () => {
   
        navigate("/viewclass");
    }

    return (
        <>
            <UserHeader button={true} Hide={false} buttonText="View Map" buttonclick={()=> {NavFunction()}} />
            <div className='calender-main flex justify-center'>
                <Calendar onChange={onChange} value={value} />

            </div>
            <div className='flex justify-between gap-4 mt-4 w-full'>
                <div className='font-Timmana w-1/2'>
                    <p>in person</p>
                    <UserShowNft />

                </div>
                <div className='font-Timmana w-1/2'>
                    <p>online</p>
                    <UserOnlineList />
                </div>
            </div>
        </>
    )
}

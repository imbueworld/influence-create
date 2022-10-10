import React, { useState } from 'react';
import ServiceHeader from './ServiceHeader'
import Calendar from 'react-calendar';
import "./css/Calendar.css"
import "./css/serviceIndex.css"
import ColoredButton from '../../components/ColoredButton';
import ServiceClassesList from './ServiceClassesList';
import { Link } from 'react-router-dom';


export default function ServiceLocation() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <ServiceHeader />
      <div className=''>
      <div className='calender-main flex justify-center'>
        <Calendar onChange={onChange} value={value} />

      </div>
      <p className='text-center'>
            <span className='bold'>Selected Date:</span>{' '}
           {value.toDateString()}
            </p>
      <div className='flex justify-center mt-10'>

        <h2 className='flex mb-5 font-Timmana'>Classes <span className='ml-5'><Link to="/service-editclass"><img src='/asset/plusIcon.png' /></Link></span></h2>


      </div>
      <div style={{borderBottom:"2px solid black", width: "auto",margin: "0 160px 32px 142px"}}><h1></h1></div>
      <ServiceClassesList />
      <ServiceClassesList />
     
      </div>

      <div className="relative text-sm text-white	inline-block flex justify-end py-10 service-discord1">
        <img src="/asset/discord.png" alt="discord-icon" />
      </div>

    </>
  )
}

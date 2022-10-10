import React from 'react'
import ServiceClassesList from './ServiceClassesList'
import ServiceHeader from './ServiceHeader'
import "./css/serviceIndex.css"
import { Link } from 'react-router-dom'


export default function SerivceList() {
  return (
    <>
    <ServiceHeader/>
    <p className='paraLocation font-Timman text-black'><Link to="/service-main">Locations</Link></p>
    <div className=''>
        <ServiceClassesList/>
        <ServiceClassesList/>
        <ServiceClassesList/>
        <ServiceClassesList/>
    </div>
    <div className="relative text-sm text-white	inline-block flex justify-end py-10 service-discord1">
        <img src="/asset/discord.png" alt="discord-icon" />
      </div>
    </>
  )
}

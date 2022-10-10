import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserHeader from './UserHeader'
import UserMap from './UserMap'
import GreenCheckImg from "../../assets/image/greenCheck.png"
 
export default function ViewClass() {
  const navigate = useNavigate();
  const [member , setMember] = useState(false)

  // const position = [51.505, -0.09]
  // const position1 = [28.704, 77.102]

  const purchageMember = () =>{
    setMember(true)
  }
  const NavFunction = () => {

    navigate("/user-classes");
  }
  return (
    <>
      <UserHeader button={true}
        // Hide={true}
        buttonText="View classes"
        buttonclick={() => { NavFunction() }} />
      <div className="lg:w-100 text-center">

        {/* <h1>Map</h1> */}
        <div className='flex flex-row w-full'>

          <div className='w-[80%] '>
            <UserMap />
          </div>

          {
            member === true ? <div className=''> <p className='flex font-Timmana items-center	 gap-[60px]'>member <img src={GreenCheckImg} alt="tick"/></p></div> :
          <div className='w-[20%]'>
            <div className='flex flex-col font-Timmana items-center'>
              <p>You haven’t purchased a membership yet</p>
              <button className='flex justify-center w-1/3 not-italic font-normal text-[17px] leading-[2rem] md:py-[4px] sm:py-[4px] py-[4px] md:px-[102px] sm:px-[102px] px-[102px] rounded-3xl bg-[#FFE6EB]'onClick={()=>{purchageMember()}} >Purchase</button>
            </div>
          </div>
          }

        </div>
      </div>
    </>
  )
}

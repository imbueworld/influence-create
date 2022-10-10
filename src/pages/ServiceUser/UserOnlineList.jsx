import React from 'react'
import { useNavigate } from "react-router-dom";
import "../ServiceProvider/css/serviceIndex.css"

export default function UserOnlineList() {
    const navigate = useNavigate();

    function handleEdit() {
        navigate(`/user-joinclass`);
    }
    return (
        <>
              <div className='flex justify-between items-center bg-[#242429] rounded-full my-4 px-5 py-2 flex-col md:flex-row'>
                <div className='flex img-details items-center gap-3'>
                    <img src="/asset/dummy.png" width={70} height={70}/>
                    <div className=''>
                        <p className='font-Timmana text-[white] text-xs'>Woking our core, abdominals and quick striking.</p>
                        
                    </div>

                </div>
                <div className=''>
                    <p className='text-[white] text-xs font-Timmana'>10AM-11AM | 1/11/22</p>
                    <p className='text-[white] text-xs font-Timmana'>online</p>
                </div>
                <button className='flex justify-center w-1/3 not-italic font-normal text-[17px] leading-[2rem]  p-0 rounded-3xl bg-[#FFE6EB]' onClick={()=>{handleEdit()}}>Join Class</button>
                {/* <div className='font-Timmana'>
                    <ColoredButton
                        // type="submit"
                        stylec="w-[15rem] m-auto"
                        onClick={handleEdit}
                    >Show Nft</ColoredButton>
                </div> */}

            </div>
        </>
    )
}

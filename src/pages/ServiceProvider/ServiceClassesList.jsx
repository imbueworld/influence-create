import React from 'react'
import { useNavigate } from "react-router-dom";
import ColoredButton from '../../components/ColoredButton'
import "./css/serviceIndex.css"


export default function ServiceClassesList() {
    const navigate = useNavigate();

    function handleEdit() {
        navigate(`/service-editclass`);
    }
    return (
        <>
            <div className='flex justify-between items-center bg-[#242429] rounded-full my-4 px-10 py-2 flex-col md:flex-row'>
                <div className='flex img-details items-center gap-3'>
                    <img src="/asset/dummy.png" />
                    <div>
                        <p className='paraLocation font-Timmana'>9 rounds</p>
                        <p className='paraLocation font-Timmana'>kickboxing, cardio and more</p>
                    </div>

                </div>
                <div className=''>
                    <p className='paraLocation font-Timmana'>10AM-11AM | 1/11/22</p>
                    <p className='paraLocation font-Timmana'>1332 springer road Mountain view california 94040</p>
                </div>
                <div className='font-Timmana'>
                    <ColoredButton
                        // type="submit"
                        stylec="w-[15rem] m-auto"
                        onClick={handleEdit}
                    >edit</ColoredButton>
                </div>

            </div>
        </>
    )
}

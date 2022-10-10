import React from 'react'
import { Link } from 'react-router-dom'
import ColoredButton from '../../components/ColoredButton'
import ServiceHeader from './ServiceHeader'

export default function ServiceMain() {
    return (
        <>
            <ServiceHeader />
            <div className='flex flex-col justify-center paraSize pb-10'>
                <ColoredButton

                    stylec="mt-20 w-1/3 m-auto font-medium"
                //  disabled={loading}
                >
                    <Link to="/service-profile">View description</Link>
                    {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
                </ColoredButton>

                <ColoredButton

                    stylec="mt-10 w-1/3 m-auto font-medium"
                //  disabled={loading}
                >
                   <Link to="/service-list"> View locations</Link>
                    {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
                </ColoredButton>
                <ColoredButton

                    stylec="mt-10 w-1/3 m-auto font-medium"
                //  disabled={loading}
                >
                    <Link to="/service-location">Create & schedule classes </Link>
                    {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
                </ColoredButton>

              <div className='py-8'></div>
                <p  className='font-medium'>You’re eligible for 2,500 imbue tokens for being one of the first 1000 studios ever to create an account with imbue.</p>
                
                <ColoredButton

                    stylec="mt-10 w-1/3 m-auto font-medium"
                //  disabled={loading}
                >
                    Claim airdrop
                    {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
                </ColoredButton>


            </div>
        </>
    )
}

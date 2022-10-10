import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';


export default function UserBookClass() {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <div className='flex justify-between items-center bg-[#242429] rounded-full my-4 px-5 py-2 flex-col md:flex-row w-[94%]'>
                <div className='flex img-details items-center gap-3'>
                    <img src="/asset/dummy.png" width={70} height={70} />
                    <div className=''>
                        <p className='font-Timmana text-[white] text-xs'>Woking our core, abdominals and quick striking.</p>

                    </div>

                </div>
                <div className=''>
                    <p className='text-[white] text-xs font-Timmana'>10AM-11AM | 1/11/22</p>
                    <p className='text-[white] text-xs font-Timmana'>1332 springer road Mountain view california 94040</p>
                </div>
                <button className='flex justify-center w-1/3 not-italic font-Timmana text-[17px] leading-[2rem]  p-1 rounded-3xl bg-[#FFE6EB]' onClick={onOpenModal}>Book Class</button>

                <Modal classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',

                }} open={open} onClose={onCloseModal} center closeIcon={true} >
                    <p className='py-4'>
                    You haven’t purchased a membership yet
                    </p>
                    <button className='flex justify-center w-1/3 not-italic font-Timmana text-[17px] leading-[2rem]  p-1 rounded-3xl bg-[#FFE6EB] text-black mt-8'>Purchase </button>

                </Modal>

            </div>
        </>
    )
}

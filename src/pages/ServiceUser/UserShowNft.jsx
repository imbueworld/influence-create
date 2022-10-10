import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "../ServiceProvider/css/serviceIndex.css";
import QRImage from "../../assets/image/nftimg.png";


export default function UserShowNft() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // function handleEdit() {
    //     navigate(`/service-editclass`);
    // }
    return (
        <>
            <div className='flex justify-between items-center bg-[#242429] rounded-full my-4 px-5 py-2 flex-col md:flex-row'>
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
                <button className='flex justify-center w-1/3 not-italic font-normal text-[17px] leading-[2rem]  p-0 rounded-3xl bg-[#FFE6EB]' onClick={onOpenModal}>Show Nft</button>



                <Modal open={open} onClose={onCloseModal} center closeIcon={true} >
                    {/* <h2>Simple centered modal</h2> */}
                    <img src={QRImage} alt="shownftimg" width={450} height={400}/>
                </Modal>
            </div>

           
        </>
    )
}

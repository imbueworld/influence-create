import React from 'react'
import { useDropzone } from 'react-dropzone';
import ColoredButton from '../../components/ColoredButton';
import ServiceHeader from './ServiceHeader'


export default function ServiceDescription() {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 3

    });
    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            <ServiceHeader />

            <div className='flex flex-col justify-center'>
                <div className='py-8'></div>
                <p className='font-medium text-lg	font-Timmana'>in order to verify your authenicity, we need you to verify a few things for us.</p>
                <div className='py-8'></div>

                <div className='flex flex-col items-center'>
                    <p className='font-Timmana text-lg'>Please submit a form that shows ownership of the studio with the address provided and your id that matches the name on the doucmet.</p>
                    <div {...getRootProps({ className: 'dropzone flex justify-center items-center cursor-pointer sm:w-[33%] md:w-[33%] lg:w-[33%] w-[33%] sm:min-h-[30%] h-[150px] md:min-h-[30%] lg:min-h-[30%] min-h-[30%] rounded-[47px] bg-[#E5E5E5] p-10 my-10' })}>
                        <input {...getInputProps()} />
                        <img src="/asset/camera.png" />

                    </div>
                    {/* <ul>{acceptedFileItems}</ul> */}


                  
                </div>


                <span className=''> <ColoredButton
                        type="submit"
                        stylec="mt-20 w-1/3 m-auto mb-10 font-semibold"
                    //  disabled={loading}
                    >
                        Save
                        {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
                    </ColoredButton>
                    </span>

            </div>

        </>
    )
}

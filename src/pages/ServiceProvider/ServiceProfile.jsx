import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useDropzone } from "react-dropzone";
import ColoredButton from "../../components/ColoredButton";
import ServiceHeader from "./ServiceHeader";
import { SERVICE_PROVIDER } from "../../utils/contract.config";
import "./css/ServiceProfile.css";
import "./css/serviceIndex.css";
// import { NFTStorage, File, Blob } from 'nft.storage'
// import SERVICEPROFILEABI from "./ServiceAbi.json"; 
import axios from "axios";
import { FaCommentsDollar } from "react-icons/fa";

export default function ServiceProfile({ metamaskProvider, accounts }) {
  const [account, setAccount] = useState();
  const [gymName, setGymName] = useState();
  const [genre, setGenre] = useState();
  const [description, setDescription] = useState();
  const [websiteLink, setWebsiteLink] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [otherLink, setOtherLink] = useState();
  const [membershipPrice, setMemberShipPrice] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [address, setAddress] = useState([]);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [firstAddress, setFirstAddress] = useState();
  // const [imageUrl, setImageUrl] = useState();
  const [selectedFile, setSelectedFile] = useState();

  // const serviceProfile = "0x798d27A3B566c32Cb553d45E4bd4D526f62FA848";
  useEffect(() => {
    metamaskProvider
      .request({ method: "eth_accounts" })
      .then((res) => {
        console.log(res);
        setAccount(res);
      })
      .catch((err) => console.error(err));
  }, []);

  // async function onChange(e) {
  //   debugger;
  //   // setLoader(true)
  //   console.log(e);
  //   const file = e.target.files[0];
  //   const { name } = e.target;

  //   try {
  //     let bodyContent = new FormData();
  //     bodyContent.append("file", file);
  //     const resT = await axios.post(
  //       "https://api.nft.storage/upload",
  //       bodyContent,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer ",
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(resT);

  //     let url = `https://ipfs.io/ipfs/${resT.data.value.cid}/${file.name}`;
  //     console.log(url);
  //   } catch (e) {
  //     console.log("Error uploading file: ", e);
  //   }
  // }

  const handleCreateEvent = async (e) => {
    debugger;
    e.preventDefault();

    try {
      // console.log(uploadImages)
      let provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
      const signer = provider.getSigner();
      console.log(signer);
      const Contract = new ethers.Contract(
        SERVICE_PROVIDER.SERVICE_PROFILE_ADDRESS,
        SERVICE_PROVIDER.SERVICE_ABI,
        signer
      );
    
      // console.log(gymName)
      const gymDetails = await Contract.SetGymDetails(
        gymName,
        genre,
        description,
        websiteLink,
        twitter,
        instagram,
        otherLink,
        membershipPrice,
        mobileNumber
      );
      console.log(gymDetails);
      console.log(firstAddress)
      const gymAddress1 = await Contract.SetGymAddress(firstAddress);
      console.log(gymAddress1);
       console.log(address)
      address.map(async(multipleaddress) => {

        console.log(multipleaddress)
      const gymAddress = await Contract.SetGymAddress(multipleaddress.value);
      console.log(gymAddress);
    })
     
      // console.log(imageUrl)

      selectedFile.map(async (file) => {
        let bodyContent = new FormData();
        console.log(file, "dfsh");
        bodyContent.append("file", file);
        const resT = await axios.post(
          "https://api.nft.storage/upload",
          bodyContent,
          {
            headers: {
              Authorization:
                "Bearer ",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(resT);

        let url = `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile.name}`;
        // }
        console.log(url);

        const gymImages = await Contract.SetImageUrl(url);
        console.log(gymImages);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // let $ = require( "jquery" );
  // jQuery(document).ready(function () {
  //     ImgUpload();
  //   });

  //   function ImgUpload() {
  //     let imgWrap = "";
  //     let imgArray = [];

  //     $('.upload__inputfile').each(function () {
  //       $(this).on('change', function (e) {
  //         imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
  //         var maxLength = $(this).attr('data-max_length');

  //         var files = e.target.files;
  //         var filesArr = Array.prototype.slice.call(files);
  //         var iterator = 0;
  //         filesArr.forEach(function (f, index) {

  //           if (!f.type.match('image.*')) {
  //             return;
  //           }

  //           if (imgArray.length > maxLength) {
  //             return false
  //           } else {
  //             var len = 0;
  //             for (var i = 0; i < imgArray.length; i++) {
  //               if (imgArray[i] !== undefined) {
  //                 len++;
  //               }
  //             }
  //             if (len > maxLength) {
  //               return false;
  //             } else {
  //               imgArray.push(f);

  //               var reader = new FileReader();
  //               reader.onload = function (e) {
  //                 var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
  //                 imgWrap.append(html);
  //                 iterator++;
  //               }
  //               reader.readAsDataURL(f);
  //             }
  //           }
  //         });
  //       });
  //     });

  //     $('body').on('click', ".upload__img-close", function (e) {
  //       var file = $(this).parent().data("file");
  //       for (var i = 0; i < imgArray.length; i++) {
  //         if (imgArray[i].name === file) {
  //           imgArray.splice(i, 1);
  //           break;
  //         }
  //       }
  //       $(this).parent().parent().remove();
  //     });
  //   }
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      const lastId = s[s.length - 1].id;
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      //  console.log(newArr)
       setAddress(newArr)
      return newArr;
    });
  };
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 5,
    });
  // useEffect(() => {

  // }, [third])

  const acceptedFileItems = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  useEffect(() => {
    console.log(acceptedFiles);
    if (!acceptedFiles?.length) return;
    let newImage = acceptedFiles;

    setSelectedFile(newImage);
  }, [acceptedFiles]);

  return (
    <>
      <ServiceHeader />
      <div className="container w-full mx-auto px-8">
        {account}
        <form onSubmit={handleCreateEvent}>
          <div className="flex justify-between w-50 mb-10 service-profile">
            <div className="flex flex-col font-sans xl:w-1/2  sm:pr-10 md:pr-10 pr-14 items-center text-center">
              <div
                {...getRootProps({
                  className:
                    "min-h-[100px] dropzone flex justify-center items-center cursor-pointer sm:w-[60%] md:w-[60%] lg:w-[60%] w-[60%]   sm:min-h-[20%] md:min-h-[20%] lg:min-h-[20%] min-h-[20%] rounded-[47px] bg-[#E5E5E5]",
                })}
              >
                <input
                  {...getInputProps()}
                  // onChange = {(e) => console.log(e)}
                />

                <img src="/asset/camera.png" />
              </div>
              <p className="my-4 ">UPLOAD UP TO 5 IMAGES</p>
              <ul>{acceptedFileItems}</ul>

              {/* <aside>
                                <h4>Accepted files</h4>
                                <ul>{acceptedFileItems}</ul>
                                <h4>Rejected files</h4>
                                <ul>{fileRejectionItems}</ul>
                            </aside> */}

              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="GYM NAME"
                onChange={(e) => setGymName(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="GENRE"
                onChange={(e) => setGenre(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className=" w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="DESCRIPTION (30 CHARACTERS)"
                onChange={(e) => setDescription(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setFirstAddress(e.target.value)}
                // value={formData.name}
                placeholder="ADDRESS"

                // onChange={onChange}
                // required
              />

              <p className="my-5">HAVE MULTIPLE LOCATION?</p>

              {/* <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black placeholder:font-semibold pb-4"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setAddress(e.target.value)}
                // value={formData.name}
                placeholder="address 2 "
                // onChange={onChange}
                // required
              /> */}
              <span className="flex justify-center">
                <img
                  onClick={addInput}
                  className=""
                  src="/asset/AddIcon.png"
                  alt="addicon"
                />
              </span>
              {arr.map((item, i) => {
                return (
                  <input
                    className="w-full my-5 bg-transparent border-b  focus:outline-none border-black text-center placeholder-black  pb-4"
                    onChange={handleChange}
                    value={item.value}
                    id={i}
                    type={item.type}
                    placeholder="ADDRESS"
                    // onChange={(e) => setAddress(e.target.value)}
                    size="40"
                  />
                );
              })}
            </div>
            <div className="flex flex-col font-sans xl:w-1/2  sm:pl-10 md:pl-0 pl-14 items-center text-center mt-20">
              <div className="sm:mt-5 md:mt-5 mt-5"></div>
              <p className="text-[#FF1010] w-full my-5">
                lieing about membership price is against the terms of service
                and your studio will be removed from the protocol
              </p>
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="IN STUDIO MEMBERSHIP PRICE"
                onChange={(e) => setMemberShipPrice(e.target.value)}
                // onChange={onChange}
                required
              />

              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="PHONE NUMBER"
                onChange={(e) => setMobileNumber(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="WEBSITE"
                onChange={(e) => setWebsiteLink(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="TWITTER"
                onChange={(e) => setTwitter(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="INSTAGRAM"
                onChange={(e) => setInstagram(e.target.value)}
                // onChange={onChange}
                required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="OTHER LINK"
                onChange={(e) => setOtherLink(e.target.value)}
                // onChange={onChange}
                required
              />
            </div>
          </div>
          <span className="">
            {" "}
            <ColoredButton
              type="SUBMIT"
              stylec="mt-20 w-1/3 m-auto mb-10 font-semibold"
              //  disabled={loading}
            >
              Save
              {/* {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>} */}
            </ColoredButton>
          </span>
        </form>

        <div className="relative text-sm text-white	inline-block flex justify-end py-10 service-discord1">
          <img src="/asset/discord.png" alt="discord-icon" />
        </div>
      </div>
    </>
  );
}

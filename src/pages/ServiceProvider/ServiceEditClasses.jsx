import React, { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { SERVICE_PROVIDER } from "../../utils/contract.config";
import useCreateEvent from "../CreateEvent/useCreateEvent";
import ServiceHeader from "./ServiceHeader";
import MinusIcon from "../../assets/image/minus.png";
import ColoredButton from "../../components/ColoredButton";
import GreenCheckIcon from "../../assets/image/greenCheck.png";
import "./css/ServiceEdit.css";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import { BeatLoader } from "react-spinners";

export default function ServiceEditClasses({ metamaskProvider }) {
  const client = ipfsHttpClient(
    "https://ipfs.infura.io:5001/api/v0/471da85949474db4a917df1ac2365ca0"
  );
  const mondayRef = useRef();
  const tuesdayRef = useRef();
  const wednesdayRef = useRef();
  const thursdayRef = useRef();
  const fridayRef = useRef();
  const saturdayRef = useRef();
  const sundayRef = useRef();

  let [isLoading, setIsLoading] = useState(false)

  const [fileUrl, updateFileUrl] = useState(``);
  const [mondayCheckbox, setMondayCheckbox] = useState(false);
  const [tuesdayCheckbox, setTuesdayCheckbox] = useState(false);
  const [wednesdayCheckbox, setWednesdayCheckbox] = useState(false);
  const [thursdayCheckbox, setThursdayCheckbox] = useState(false);
  const [fridayCheckbox, setFridayCheckbox] = useState(false);
  const [saturdayCheckbox, setSaturdayCheckbox] = useState(false);
  const [sundayCheckbox, setSundayCheckbox] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [className, setClassName] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [classLevel, setClassLevel] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [dateTime, setDateTime] = useState();
  const [selectDuration, setSelectDuration] = useState();
  const [classMode, setClassMode] = useState('');
  // const [oneTime, setOneTime] = useState()
  const [days, setDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const [classType, setClassType] = useState();
  const [weekDetail, setWeekDetail] = useState('');
  const [selectedDaysArray, setSelectedDaysArray] = useState([]);

  const handleChangeDays = () => { };

  // const handleChangeDays = (e) => {
  //   // Destructuring
  //   const { value, checked } = e.target;
  //   const { days } = userinfo;

  //   console.log(`${value} is ${checked}`);

  //   // Case 1 : The user checks the box
  //   if (checked) {
  //     setUserInfo({
  //       days: [...days, value],
  //       response: [...days, value],
  //     });
  //   }

  //   // Case 2  : The user unchecks the box
  //   else {
  //     setUserInfo({
  //       days: days.filter((e) => e !== value),
  //       response: days.filter((e) => e !== value),
  //     });
  //   }
  // };
  const options = [
    { value: "2 weaks", label: "2 weaks" },
    { value: "3 weaks", label: "3 weaks" },
    { value: "4 weaks", label: "4 weaks" },
    { value: "8 weaks", label: "8 weaks" },
    { value: "12 weaks", label: "12 weaks" },
    { value: "36 weaks", label: "36 weaks" },
    { value: "until canceled", label: "until canceled" },
  ];
  const locations = [
    { value: "location 1", label: "location 1" },
    { value: "location 2", label: "location 2" },
    { value: "location 3", label: "location 3" },
    { value: "location 4", label: "location 4" },
  ];
  console.log(location);
  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        display: "flex",
        justifyContent: "start",
        fontSize: "12px",
        overflowY: "hidden !important",
      };
    },
    option: (base, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        color: "white",
        cursor: "pointer",
        backgroundColor: isFocused || isSelected ? "black" : "black",
        // backgroundColor: isSelected ? "black" : "black",
      };
    },
  };

  const option2 = [
    {
      value: "online",
      label: "Online",
    },
    {
      value: "inperson",
      label: "in person",
    },
  ];

  const Days = [
    {
      day: "M",
    },
    {
      day: "T",
    },
    {
      day: "W",
    },
    {
      day: "TH",
    },
    {
      day: "F",
    },
    {
      day: "SA",
    },
    {
      day: "SU",
    },
  ];
  const { formData, onChange, durationData, setDuration } =
    useCreateEvent({ metamaskProvider });
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

  // const handleClick = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setClassDetails(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));

  // }

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };
  //  console.log(selectDuration)
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
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
    console.log(acceptedFiles, "acceptFIle............");
    if (!acceptedFiles?.length) return;
    let newImage = acceptedFiles;

    console.log(newImage, "newImg------------------");
    setSelectedFile(newImage);
  }, [acceptedFiles]);

  function showClass() {
    // setReapting("repeating");
    let colx = document.getElementById("mainRepeatId")
    let coly = document.getElementById("mainOneTimeId")
    var x = document.getElementById("repeatingdays");
    var y = document.getElementById("repeatingweek");
    if (x.style.display && y.style.display === "none") {
      colx.style.backgroundColor = "black";
      colx.style.color = "white";
      coly.style.backgroundColor = "white";
      coly.style.color = "black";
      y.style.display = "flex";
      x.style.display = "flex";
    } else {
      colx.style.backgroundColor = "black";
      colx.style.color = "white";
      coly.style.backgroundColor = "white";
      coly.style.color = "black";
      x.style.display = "flex";
      y.style.display = "flex";
    }
  }
  function hiddenClass() {
    // setOneTime("onedddddtime");
    let colx = document.getElementById("mainRepeatId")

    let coly = document.getElementById("mainOneTimeId")
    var x = document.getElementById("repeatingdays");
    var y = document.getElementById("repeatingweek");
    if (x.style.display && y.style.display === "none") {
      coly.style.backgroundColor = "black";
      coly.style.color = "white";
      colx.style.backgroundColor = "white";
      colx.style.color = "black";
      y.style.display = "none";
      x.style.display = "none";
    } else {
      coly.style.backgroundColor = "black";
      coly.style.color = "white";
      colx.style.backgroundColor = "white";
      colx.style.color = "black";
      x.style.display = "none";
      y.style.display = "none";
    }
  }
  // console.log(oneTime);

  // async function onChangeIPFS(e) {
  //   const file = e.target.files[0]
  //   try {
  //     const added = await client.add(file)
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //     updateFileUrl(url)
  //     console.log(url,"urrlll------------");
  //     console.log(fileUrl,"fileUrl------------------");
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }
  // }
  const imageUpload = () => { };

  const handleCreateEvent = async (e) => {
    // debugger;
    setIsLoading(true)
    e.preventDefault();
    console.log(weekDetail, "weekDetail");
    console.log(selectedDaysArray, "selectedDaysArray");

    // console.log(classType,"CLASSTYOE");


    let dayObj;
    if (classType == "repeating") {
      dayObj = JSON.stringify({
        weekData: weekDetail,
        dayData: selectedDaysArray
      })
    } else {
      dayObj = "oneTime"
    }
    console.log(dayObj, "dayObj-=================");

    try {
      // console.log(uploadImages)
      let provider = new ethers.providers.Web3Provider(metamaskProvider, "any");
      const signer = provider.getSigner();
      console.log(signer);
      const Contract = new ethers.Contract(
        SERVICE_PROVIDER.CREATESCHEDULECLASS_ADDRESS,
        SERVICE_PROVIDER.CREATESCHEDULECLASS_ABI,
        signer
      );

      let bodyContent = new FormData();
      bodyContent.append("file", selectedFile[0]);
      console.log(selectedFile, "dfsh");
      const resT = await axios.post(
        "https://api.nft.storage/upload",
        bodyContent,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdjMDgzYWU3M0U4MTMwNTY5NzdDQ0FCNjg1NUUxZjkzNjg4ZUI1MzMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDUxODU1OTA0OCwibmFtZSI6IklNQlVFIn0.v1ajQ-rjR4clMFCdISZM06Fr7zmab4I_Fj9FjJbCHKc",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(resT);

      let url = `https://ipfs.io/ipfs/${resT.data.value.cid}/${selectedFile[0].name}`;
      // }
      console.log(url, "url--------------");
      console.log("className:", className);
      console.log("category:", category);
      console.log("subCategory:", subCategory);
      console.log("classLevel:", classLevel);
      console.log("description:", description);
      console.log("location:", location);
      console.log("dateTime:", dateTime);
      console.log("selectDuration:", selectDuration);
      console.log("classType:", dayObj);
      console.log("classMode:", classMode);

      const classes = await Contract.CreateAndScheduleClasses(
        url,
        className,
        category,
        subCategory,
        classLevel,
        description,
        location,
        dateTime,
        selectDuration,
        dayObj,
        classMode
      );
      console.log(classes);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)

      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedDaysArray);
  }, [selectedDaysArray]);

  return (
    <>
      <ServiceHeader />

      <div className="flex justify-center mt-10">
        <h2 className="flex mb-5 font-Timmana">
          Classes{" "}
          <span className="ml-5">
            <Link to="/service-location">
              <img src={MinusIcon} alt="minusIcon" />
            </Link>
          </span>
        </h2>
      </div>
      <div
        style={{
          borderBottom: "2px solid black",
          width: "auto",
          margin: "0 160px 32px 142px",
        }}
      >
        <h1></h1>
      </div>

      <div className="container w-full flex justify-center mx-auto px-8">
        <form
          className="w-[60rem]"
          onSubmit={handleCreateEvent}
        // onSubmit={handleCreateEvent}
        >
          <div className="flex justify-between w-{100} gap-20 flex-col md:flex-row">
            <div className="flex flex-col font-sans xl:w-1/2 items-center text-center w-full md:w-1/2">
              <div
                {...getRootProps({
                  className:
                    "dropzone flex justify-center items-center cursor-pointer sm:w-[60%] md:w-[60%] lg:w-[60%] w-[60%]   sm:min-h-[20%] md:min-h-[20%] lg:min-h-[20%] min-h-[100px] rounded-[47px] bg-[#E5E5E5]   picture-upload",
                })}
              >
                <input {...getInputProps()} />
                <img src="/asset/camera.png" />
              </div>
              {/* <p className='my-8 font-semibold'>upload up to 5 images</p> */}
              <ul>{acceptedFileItems}</ul>
              {fileUrl && <img src={fileUrl} width="600px" />}
              {/* placeholder:font-semibold */}
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="CLASS NAME"
                // onChange={handleClick}
                onChange={(e) => setClassName(e.target.value)}

              // required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="CATEGORY"
                // onChange={handleClick}
                onChange={(e) => setCategory(e.target.value)}
              // required
              />
              <input
                className=" w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="SUB-CATEGORY"
                // onChange={handleClick}
                onChange={(e) => setSubCategory(e.target.value)}
              // required
              />
              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="CLASS LEVEL"
                // onChange={handleClick}
                onChange={(e) => setClassLevel(e.target.value)}
              // required
              />

              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                placeholder="DESCRIPTION"
                // onChange={handleClick}
                onChange={(e) => setDescription(e.target.value)}
              // required
              />

              <Select
                className="dropdown-week-sub mt-8"
                name="location"
                placeholder="LOCATION"
                defaultValue={selectedOption}
                styles={customStyles}
                // onChange={handleClick}
                onChange={(e) => setLocation(e.value)}
                options={locations}
              />
            </div>
            <div className="flex flex-col font-sans xl:w-1/2 items-center text-center w-full md:w-1/2">
              <div className=""></div>
              {/* <div className='styled-dropdown'> */}
              <Select
                className="dropdown-sub my-8"
                name="DURATION"
                placeholder="SELECT TYPE"
                defaultValue={selectedOption1}
                // onChange={setSelectedOption1}
                // onChange={handleClick}
                onChange={(e) => setClassMode(e.value)}
                options={option2}
                styles={customStyles}
                getOptionLabel={(e) => (
                  <div
                    className="select-dropdownList text-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      justifyContent: "end",
                    }}
                  >
                    {e.value}
                    {/* {e.icon} */}
                    <span>
                      <img
                        className="w-5 h-5"
                        src={GreenCheckIcon}
                        alt="checked"
                      />
                    </span>
                  </div>
                )}
              />

              <input
                className="w-full my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black  pb-4"
                type="datetime-local"
                name="start_date"
                id="date"
                // value={formData.start_date}
                placeholder="SELECT DATE/TIME"
                // onChange={handleClick}
                onChange={(e) => setDateTime(e.target.value)}
              // required
              />

              <Select
                className="dropdown-sub"
                name="duration"
                placeholder="SELECT DURATION"
                styles={customStyles}
                // value={formData.duration}
                options={durationData}
                // onChange={handleClick}
                onChange={(e) => setSelectDuration(e.value)}
                // onChange={setDuration}
                getOptionLabel={(e) => (
                  <div
                    className="select-dropdownList text-sm"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      justifyContent: "end",
                    }}
                  >
                    {e.text}
                  </div>
                )}
              />
              <span className="w-full flex flex-row my-5 bg-transparent border-b focus:outline-none border-black text-center placeholder-black pb-4 gap-3">
                <button
                  className="edit-btn w-1/2 focus"
                  type="button"
                  value="repeating"
                  id="mainRepeatId"
                  // onChange={(e) => setReapting(e.target.value)}
                  onClick={(e) => `${showClass()} ${setClassType(e.target.value)}`}
                >
                  REPEATING
                </button>

                <button
                  className="edit-btn w-1/2 focus"
                  type="button"
                  value="oneTime"
                  id="mainOneTimeId"
                  // onChange={(e) => setClassType(e.target.value)}
                  onClick={(e) => `${hiddenClass()} , ${setClassType(e.target.value)}`}
                >
                  ONE TIME
                </button>
              </span>
              <div
                className="weakdays-class flex justify-around "
                id="repeatingdays"
              >
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="days"
                  value="Monday"
                  onChange={handleChangeDays}
                  checked={mondayCheckbox}
                  className="checkbox-display"
                  ref={mondayRef}
                />
                <label
                  onClick={() => {
                    mondayRef.current.click();
                    setMondayCheckbox(!mondayCheckbox);
                    if (selectedDaysArray.includes("Monday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Monday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Monday"]);
                    }
                  }}
                  className={mondayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle1"
                >
                  M
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle2"
                  name="days"
                  value="Tuesday"
                  onChange={handleChangeDays}
                  checked={tuesdayCheckbox}
                  className="checkbox-display"
                  ref={tuesdayRef}
                />
                <label
                  onClick={() => {
                    tuesdayRef.current.click();
                    setTuesdayCheckbox(!tuesdayCheckbox);
                    if (selectedDaysArray.includes("Tuesday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Tuesday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Tuesday"]);
                    }
                  }}
                  className={tuesdayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle2"
                >
                  {" "}
                  T
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  name="days"
                  value="Wednesday"
                  onChange={handleChangeDays}
                  checked={wednesdayCheckbox}
                  className="checkbox-display"
                  ref={wednesdayRef}
                />
                <label
                  onClick={() => {
                    wednesdayRef.current.click();
                    setWednesdayCheckbox(!wednesdayCheckbox);
                    if (selectedDaysArray.includes("Wednesday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Wednesday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Wednesday"]);
                    }
                  }}
                  className={wednesdayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle3"
                >
                  {" "}
                  W
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="days"
                  value="Thursday"
                  onChange={handleChangeDays}
                  checked={thursdayCheckbox}
                  className="checkbox-display"
                  ref={thursdayRef}
                />
                <label
                  onClick={() => {
                    thursdayRef.current.click();
                    setThursdayCheckbox(!thursdayCheckbox);
                    if (selectedDaysArray.includes("Thursday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Thursday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Thursday"]);
                    }
                  }}
                  className={thursdayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle1"
                >
                  {" "}
                  TH
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle2"
                  name="days"
                  value="Friday"
                  checked={fridayCheckbox}
                  ref={fridayRef}
                  className="checkbox-display"
                  onChange={handleChangeDays}
                />
                <label
                  onClick={() => {
                    fridayRef.current.click();
                    setFridayCheckbox(!fridayCheckbox);
                    if (selectedDaysArray.includes("Friday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Friday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Friday"]);
                    }
                  }}
                  className={fridayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle2"
                >
                  {" "}
                  F
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  name="days"
                  value="Saturday"
                  checked={saturdayCheckbox}
                  ref={saturdayRef}
                  onChange={handleChangeDays}
                  className="checkbox-display"
                />
                <label
                  onClick={() => {
                    saturdayRef.current.click();
                    setSaturdayCheckbox(!saturdayCheckbox);
                    if (selectedDaysArray.includes("Saturday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Saturday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Saturday"]);
                    }
                  }}
                  className={saturdayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle3"
                >
                  {" "}
                  SA
                </label>
                <br />
                <input
                  type="checkbox"
                  id="vehicle3"
                  name="days"
                  value="Sunday"
                  ref={sundayRef}
                  // name="vehicle3"
                  // value="Boat"
                  onChange={handleChangeDays}
                  checked={sundayCheckbox}
                  className="checkbox-display"
                />
                <label
                  onClick={() => {
                    sundayRef.current.click();
                    setSundayCheckbox(!sundayCheckbox);
                    if (selectedDaysArray.includes("Sunday")) {
                      let filteredArray = selectedDaysArray.filter((day) => {
                        return day !== "Sunday";
                      });
                      console.log(filteredArray);
                      setSelectedDaysArray(filteredArray);
                    } else {
                      setSelectedDaysArray([...selectedDaysArray, "Sunday"]);
                    }
                  }}
                  className={sundayCheckbox ? 'days1' : 'weekdays-button focus1'}
                  for="vehicle3"
                >
                  {" "}
                  SU
                </label>
                <br />
              </div>

              {/* weekdays-button focus1 */}
              <Select
                className="dropdown-week-sub mt-8"
                id="repeatingweek"
                name="weakDuration"
                placeholder=""
                defaultValue={selectedOption}
                styles={customStyles}
                // onChange={handleClick}
                onChange={(e) => setWeekDetail(e.value)}
                options={options}
              />
            </div>
          </div>
          <span className="">
            {" "}
            <ColoredButton
              type="SUBMIT"
              stylec="mt-20 w-1/3 m-auto mb-20 font-semibold"
            // disabled={loading}
            >
              {/* {
                isLoading && <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: 16 }} />
              } */}
              {isLoading ?  <i className="fa fa-circle-o-notch fa-spin" style={{ fontSize: 16 }} /> : <>Save</>}
            </ColoredButton>
          </span>
        </form>
      </div>
    </>
  );
}

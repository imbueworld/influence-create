import Header from "../../components/Header";
import ColoredButton from "../../components/ColoredButton";
import { BeatLoader } from "react-spinners";
import { BarLoader } from "react-spinners";
import Select from "react-select";
import useCreateEvent from './useCreateEvent';
import MultiSelect from "./components/MultiSelect";


export default function CreateEvent({ metamaskProvider }) {
const {
  handleCreateEvent,
  formData,
  onChange,
  previewImage,
  setpreviewImage,
  setSelectedFile,
  onFileChange,
  durationData,
  setDuration,
  paid,
  setPaid,
  check,
  setCheck,
  loading,
  selectedOptions, 
  setSelectedOptions,
} = useCreateEvent({metamaskProvider});

  const symbol = localStorage.getItem("symbol");
  return (
    <div className="container text-center">
      <Header metamaskProvider={metamaskProvider} />

      {/* <NetworkSelector metamaskProvider={metamaskProvider} /> */}
{/* <div><div>{"creating event on polygon testnet" }<br/><BarLoader loading={true}/></div></div> */}
      <form
        className="grid grid-rows-4 gap-2 font-sans xl:w-1/2 md:p-0 sm:p-10 p-14 items-center text-center m-auto"
        onSubmit={handleCreateEvent}
      >
        <div className="md:text-3xl sm:text-2xl text-xl font-Lulo my-3">
          CREATE EVENT
        </div>
     
        <MultiSelect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}  metamaskProvider={metamaskProvider}/>
        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="EVENT NAME"
          onChange={onChange}
          required
        />
       
        {previewImage && (
          <div className="flex items-center justify-center ">
            <img className="max-w-[20%] h-32" src={previewImage} alt="" />
            <button
              className="cursor-pointer ml-3 px-5 py-1 rounded-full bg-[#DEFCFC]"
              onClick={async (event) => {
                event.preventDefault();
                setpreviewImage(null);
                setSelectedFile(null);
              }}
            >
              Reset Image
            </button>
          </div>
        )}
        {!previewImage && (
          <label className=" flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 opacity-50 text-base leading-normal">
              Select a Thumbnail
            </span>
            <input
              type="file"
              required
              onChange={onFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>
        )}
        <div className="flex">
          <input
            className="flex-auto w-3/4 bg-transparent border-b focus:outline-none border-black text-center mr-4"
            type="datetime-local"
            name="start_date"
            id="date"
            value={formData.start_date}
            placeholder="SELECT DATE/TIME"
            onChange={onChange}
            required
          />
          <Select
            className="flex-auto w-1/4"
            name="duration"
            placeholder="Select duration"
            value={formData.duration}
            options={durationData}
            onChange={setDuration}
            getOptionLabel={(e) => e.text}
          />
        </div>

        <input
          className="bg-transparent border-b focus:outline-none border-black text-center"
          type="text"
          name="desc"
          id="desc"
          value={formData.desc}
          placeholder="EVENT DESCRIPTION"
          onChange={onChange}
        />
        <div className="bg-transparent border-b focus:outline-none border-black w-auto">
          <div className="flex justify-center">
            {paid ? (
              <>
                <button
                  type="button"
                  className="px-4 text-zinc-300"
                  onClick={() => setPaid(false)}
                >
                  FREE
                </button>
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setPaid(true)}
                >
                  PAID
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4"
                  onClick={() => setPaid(false)}
                >
                  FREE
                </button>
                <button
                  type="button"
                  className="px-4 text-zinc-300"
                  onClick={() => setPaid(true)}
                >
                  PAID
                </button>
              </>
            )}
          </div>
        </div>
        {paid ? (
          <input
            className="bg-transparent border-b border-black mt-4 focus:outline-none text-center"
            type="number"
            name="price"
            id="price"
            placeholder={`PRICE (${symbol})`}
            onChange={onChange}
            required={paid}
            step="0.000001"
            min="0"
          />
        ) : null}
        <div className="flex justify-center gap-1 align-center">
          <div>Recording</div>
          <div>
            <input
              type="checkbox"
              name="checkbox"
              value={check.toString()}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </div>
        </div>

        <ColoredButton
          type="submit"
          stylec="my-5 w-1/2 m-auto"
          disabled={loading}
        >
          {loading ? <BeatLoader loading={loading} /> : <>CREATE EVENT</>}
        </ColoredButton>
      </form>
    </div>
  );
}

import Header from "../../components/Header";
import ColoredButton from "../../components/ColoredButton";
import { BeatLoader } from "react-spinners";
import { BarLoader } from "react-spinners";
import Select from "react-select";
import useCreateStoredEvent from "./useCreateStoredEvent";

export default function CreateStoredEvent({ metamaskProvider }) {
  const { CurrentChainIdData, loading } = useCreateStoredEvent({
    metamaskProvider,
  });

  return (
    <div className="container text-center">
      <Header metamaskProvider={metamaskProvider} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "21px",
        }}
      >
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
            href="#"
          >
            <img
              className="rounded-t-lg"
              src={CurrentChainIdData?.url}
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Event: {CurrentChainIdData?.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Description: {CurrentChainIdData?.description}
            </p>
            <a
              href="#"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-black bg-[#DEFCFC] rounded-lg"
            >
              Creting Event...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

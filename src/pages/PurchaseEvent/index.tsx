import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import EventDescription from "../../components/EventDescription";
import Header from "../../components/Header";
import { useContract } from "../../web3/useContract";
import { BeatLoader } from "react-spinners";

export default function PurchaseEvent({ metamaskProvider }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { getContract } = useContract();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contract = await getContract();
      const event = await contract._events(BigNumber.from(eventId));
      setEvent(event);
      const purchased = await contract.isPurchased(BigNumber.from(eventId));
      setLoading(false);
      if (purchased) {
        alert("You already purchase this event.");
        navigate(`/join-stream/${eventId}`);
      }
    }
    fetchData().catch((err) => console.error(err));
  }, []);

  function handlePurchaseEvent() {
    setLoading(true);
    if (!metamaskProvider.selectedAddress) {
      alert("connect to wallet");
      navigate("/");
      return;
    }

    const overrides = {
      value: event._price.toString(),
      gasLimit: 90000,
    };

    getContract().then((contract) => {
      contract
        .addPerson(BigNumber.from(eventId), overrides)
        .then((res) => {
          res.wait().then((res) => {
            if (res.status) {
              alert("Purchase event successfully");
              navigate(`/join-stream/${eventId}`);
            }
          });
        })
        .catch((err) => {
          if (err.code === 4001) alert("User denied purchase.");
          setLoading(false);
        });
    });
  }

  return (
    <>
      <Header metamaskProvider={metamaskProvider} />
      <div className="relative bg-event bg-cover rounded-xl w-3/4 pt-[36.25%] m-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="col-start-2 col-span-4">
            <ColoredButton
              stylec="items-center text-center"
              onClick={handlePurchaseEvent}
              disabled={loading}
            >
              {loading ? <BeatLoader loading={loading} /> : <>PURCHASE EVENT</>}
            </ColoredButton>
          </div>
        </div>
      </div>
      <EventDescription event={event} stylec="w-3/4 m-auto" />
    </>
  );
}

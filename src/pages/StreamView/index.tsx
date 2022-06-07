import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../../components/Header";
import { livepeer } from "../../utils/livepeer";
import { useNavigate } from "react-router-dom";

function StreamView({ metamaskProvider }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [url, setUrl] = useState("");
  useEffect(() => {
    requestRecordedUrl();
  }, []);

  async function requestRecordedUrl() {
  
    const { apiKey,proxyURL } = livepeer;
    const authorizationHeader = `Bearer ${apiKey}`;
    try {
      const recordedStramRespose = await axios.get(
        `${proxyURL}/streamurl/${eventId}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );
      console.log(recordedStramRespose.data.downloadUrl);
      setUrl(recordedStramRespose.data.downloadUrl)

      // setEvents(Object.values(recordedStreamList.data));
      // console.log(events);
    } catch (error) {
      // alert(error.message);
      alert("not have recorded url");

      navigate("/list-recorded")
    }
  }
  return (
    <>
      <Header metamaskProvider={metamaskProvider} />

      {url ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video width="320" height="240" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default StreamView;

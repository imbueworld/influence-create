import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
const EventsStoreContext = createContext(null);

const EventsStoreProvider = ({ children }) => {
  const [ceratorEventList, setCreatorEventList] = useState([]);
  const [viewerEventList, setViewerEventList] = useState([]);

  useEffect(() => {}, []);

  return (
    <EventsStoreContext.Provider value={{ ceratorEventList, viewerEventList,setCreatorEventList,setViewerEventList }}>
      {children}
    </EventsStoreContext.Provider>
  );
};

const useEventsStoreContext =()=>{
  return   useContext(EventsStoreContext);
}

export { EventsStoreProvider, useEventsStoreContext };

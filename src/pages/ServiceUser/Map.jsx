import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker, useLeaflet } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider, EsriProvider } from 'leaflet-geosearch';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import icon from "../../assets/image/Marker.png";
import SearchIcon from "../../assets/image/SearchIconn.png";
import L from "leaflet";
import MapClassIcon from '../../assets/image/MapClassIcon.png'
import './CSS/service.css'


const Search = (props) => {
  const map = useMap() // access to leaflet map
  const { provider } = props
  const { latitude, longitude } = props.coords;
  console.log(props.coords);

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
    })

    map.setView([latitude, longitude], map.getZoom());
    map.addControl(searchControl) // this is how you add a control in vanilla leaflet
    return () => map.removeControl(searchControl)
  }, [props])

  return null // don't want anything to show up from this comp
}


export default function Map({ coords, display_name }) {
  const { latitude, longitude } = coords;
  const navigate = useNavigate();

  const provider = new OpenStreetMapProvider()

  const customIcon = new L.Icon({//creating a custom icon to use in Marker
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    debugger
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    //Sets geographical center and zoom for the view of the map
    return null;
  }
  const redirectPage = () =>{
    navigate("/user-viewdetails")
  }

  let locationArray = [
    [28.7041, 77.1025],
    [28.5355, 77.3910],
    [28.4744, 77.5040],
    [28.6692, 77.4538],
    [29.4727, 77.7085]
  ]

  let singleClassView = (rounds, description) => {
    return (
      <div onClick={() => {
        redirectPage()
        console.log("gkjghkjhoh");
      }} style={{ backgroundColor: 'rgba(36, 36, 41, 0.75)' }} className="flex flex-col px-10 py-5 rounded-[47px] gap-3">

        <div className="flex flex-row items-center">
          <img src={MapClassIcon} alt="Icon" className="w-1/2 rounded-[47px] max-w-[76px] max-h-[62px]" />
          <p className="text-center font-Timmana text-white w-1/2 text-lg">{rounds} rounds</p>
        </div>

        <p className="text-center font-Timmana text-white text-base">{description}</p>
      </div>
    )
  }

  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div
        className="mapOverviewClassList flex flex-col gap-2"
        style={{
          position: 'absolute',
          width: 300,
          height: '100%',
          top: 0,
          left: 40,
          zIndex: 10000,
          padding: '10px 0px',
          overflow: 'auto'
        }}
      >
        {singleClassView(9, "kickboxing, cardio and more")}
        {singleClassView(12, "kickboxing, cardio and more")}
        {singleClassView(14, "kickboxing, cardio and more")}
        {singleClassView(14, "kickboxing, cardio and more")}
      </div>
      {/* <div
        className="mapOverviewSearchBar flex flex-row items-center"
        style={{
          position: 'absolute',
          width: 300,
          top: 20,
          right: 30,
          zIndex: 10000,
        }}
      >
        
        <input type="text" />
        <img src={SearchIcon} alt="search" />
      </div> */}
      {
        locationArray.map((value, index) => {
          return (
            <Marker key={index} icon={customIcon} position={value}>
              <Popup>{display_name}</Popup>
            </Marker>
          )
        })
      }

      <Marker icon={customIcon} position={[latitude, longitude]}>
        <Popup>{display_name}</Popup>
      </Marker>


      <Search coords={coords} provider={new OpenStreetMapProvider()} />
      {/* <MapView /> */}
    </MapContainer>
  );
}
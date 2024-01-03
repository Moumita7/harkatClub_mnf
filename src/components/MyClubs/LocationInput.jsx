// import React from "react";


import  { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { config } from '../myServer';

const MapComponent = ({ center }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB1MYsGDfXWvXU_TyghY05_JagCzafnCZ8">
      <GoogleMap mapContainerStyle={{ height: '470px', width: '834px' }} center={center} zoom={13}>
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
};
const LocationInput = () => {
    // document.querySelector(".share-link-container").style.display = "block";


    let [toggleMap,setToggle]=useState(true)
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [searchAddress, setSearchAddress] = useState('');

    let [data,setData]=useState({
      latitude:"",
      longitude:""
    })
  


    // const onSubmit = (e) => {
    //   e.preventDefault();
  
    //   const url = Url+"/memberpage/interestandskillapi";
  
    //   axios.post(url,data,config)
    //   .then(data =>  console.log(data.data, "response send success"))
    //   .catch((err)=>{
    //     console.log("error : ",err)
    //   })
    //     setCreate(false);
    //     setExist(true);
  
    // };
    const closeMyMapp = () => {
      const url = "https://mynextfilm.ai/harkat/update_user_location";
  
      axios.post(url,data,config)
      .then(data =>  console.log(data.data, "response send success"))
      .catch((err)=>{
        console.log("error : ",err)
      })


      document.querySelector(".mymapp").style.display = "none";
      document.querySelector(".dark-background").style.display = "none";
    }

    const handleGetCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setData({
            latitude:latitude,
            longitude:longitude
          })
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }

    document.querySelector(".share-link-container").style.display = "none";
    setToggle(false)

    };
  
    const handleSearchChange = (event) => {
      setSearchAddress(event.target.value);
    };
  
    const handleSearchSubmit = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=AIzaSyB1MYsGDfXWvXU_TyghY05_JagCzafnCZ8`
        );
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCurrentLocation({ lat, lng });

          // setData({
          //   latitude:lat,
          //   longitude:lng
          // })
          // console.log("dataa checkkk",data)
          
        } else {
          console.error('No results found for the entered address.');
        }
      } catch (error) {
        console.error('Error fetching location from address:', error);
      }

      document.querySelector(".share-link-container").style.display = "none";
      setToggle(false)
  
    };


    const handleKeyPress = async(e)=> {
        if (e.key === "Enter") {
            try {
                const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=AIzaSyB1MYsGDfXWvXU_TyghY05_JagCzafnCZ8`
                );
                const data = await response.json();
          
                if (data.results && data.results.length > 0) {
                  const { lat, lng } = data.results[0].geometry.location;
                  setCurrentLocation({ lat, lng });
                  console.log({ lat, lng })
                  setData({
                    latitude:lat,
                    longitude:lng
                  })
                 
                } else {
                  console.error('No results found for the entered address.');
                }
              } catch (error) {
                console.error('Error fetching location from address:', error);
              }
        
              document.querySelector(".share-link-container").style.display = "none";
              setToggle(false)
        }
      }
  
    useEffect(() => {
    //   handleGetCurrentLocation();
    }, []);
    // console.log("dataa checkkk",data)
    return (
        <div className=''>
            {/* <div className="form-container location-input-container">
                <div className="from-content location-input-content">
                    <input type="text" placeholder="Enter your location" />
                    <button>Access my current location</button>
                </div>
            </div> */}
            {toggleMap ? 
                 <div className="form-container location-input-container">
                 <div className="from-content location-input-content">
                     <input type="text" value={searchAddress} onChange={handleSearchChange}    onKeyDown={(e) => handleKeyPress(e)} placeholder="Enter your location" />
                     {/* <button onClick={handleSearchSubmit}>Search</button> */}
                <button onClick={handleGetCurrentLocation}>Access my current location</button>
       {/* <MapComponent center={currentLocation} /> */}
 
                 </div>
             </div>
             :
             <div className='bg-[#D1E6D9] fixed top-[50%] left-[50%]  flex justify-center z-4 mymapp'>
             <div className=' p-5' >
                <input type="text" placeholder='Search Box' />
       <MapComponent center={currentLocation} />
       <div className='flex justify-end'>

       <button className='bg-red-600 py-1 px-4 rounded-md text-white' onClick={closeMyMapp}>Next</button>
       </div>

             </div>
             </div>
            
        }
           
        </div>
    )
}

export default LocationInput;
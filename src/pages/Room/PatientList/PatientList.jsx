import React, { useState,useEffect } from "react";
import "./PatientList.css";
import profile from "../../../assets/img/profile.jpg";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Alert from "../../../components/Alert/Alert";
import getPatients from '../../../Firebase/firebaseControllers/hosPatientList'




const Patient = () => {
  
 

  
  const history = useNavigate();
  const location = useLocation()
  const ID = location.state.id


  const [roomsDataroom, setRoomsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
    };
    fetchData();
  }, []);

  
  const [showRooms, setShowRooms] = useState(true); // state to track which rooms to show

   

    const patientList = roomsDataroom.filter(patient => patient.roomID === ID);
    console.log("patientList".filteredData)
    // const patientList = PatientList.filter(student => student.roomId === ID);
    const deviceRooms = patientList.filter(Device => Device.device !== null )
    const noDeviceRooms = patientList.filter(Device => Device.device === null )
     // search 
  const [query,setQuery] = useState('')
  const filteredData = deviceRooms.filter((item) =>
  item.deviceName.toLowerCase().includes(query.toLowerCase())
);
  

    const handleClick = () => {
      window.history.back()
    }

  


  









  return (
    <div className="Maincontainer">
      <div className="leftBox"><Navbar Alert={<Alert/>}/></div>
      <div className="rightBox">
        <Scrollbars>
          <SubTopbar />
            
          <button className='back-button' onClick={handleClick}>Go Back</button>
          <div>

          <button className="room-btn" onClick={() => setShowRooms(!showRooms)}> {showRooms ? ' without Devices' : 'with Devices'}</button>
          </div>
          <div className="search">
            <input type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)} />
           
          </div>
         


          <div className="profile-flex">



          {/* {showRooms ? (
        <div>
          <h3>Rooms with Devices</h3>
          <ul>
            {deviceRooms.map(room => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Rooms without Devices</h3>
          <ul>
            {noDeviceRooms.map(room => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      )} */}

           
      {showRooms ? (
        <>

     { filteredData.map((data) => {
       return (
         <>
          <div className="profile-container" key={data.id}>
            <div className="profile">
              <img className="img" id="imgid" src={profile} alt="" />
  
              <div>
                <span>{data.fName} {data.lName}</span>
                <span>Patient Id:{data.pID}</span>
              </div>
              <div>
                <span>Temp:{data.temp}</span>
                <span>Devices</span>
              </div>
              <div>
                <span>{data.deviceName}</span>
                <span>{data.deviceID}</span>
              </div>
              <div>
                <button style={{cursor:'pointer'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>Visit patient page </button>
              </div>
            </div>
          </div>
        </>
      )
    })}
        </>

      ):(
        <>

        { noDeviceRooms.map((data) => {
          return (
            <>
              <div className="profile-container" key={data.id}>
                <div className="profile">
                  <img className="img" id="imgid" src={profile} alt="" />
      
                  <div>
                    <span>{data.fName} {data.lName}</span>
                    <span>Patient Id:{data.pID}</span>
                  </div>
                  <div>
                    <span>Temp:{data.latestTemp}</span>
                    <span>Devices</span>
                  </div>
                  <div>
                    <span>{data.deviceName}</span>
                    <span>{data.deviceID}</span>
                  </div>
                  <div>
                    <button style={{cursor:'pointer'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>Visit patient page </button>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        </>


      )}
          
          



          
         
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Patient;

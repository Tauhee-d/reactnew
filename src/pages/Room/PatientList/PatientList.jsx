import React, { useState,useEffect } from "react";
import "./PatientList.css";
import profile from "../../../assets/img/profile.jpg";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Alert from "../../../components/Alert/Alert";
import getPatients from '../../../Firebase/firebaseControllers/hosPatientList'
import { TiArrowLeft } from "react-icons/ti";




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
    // const patientList = roomsDataroom.filter(patient => patient.roomID === ID);
    console.log("patientList".filteredData)
    // const patientList = PatientList.filter(student => student.roomId === ID);
    const deviceRooms = patientList.filter(Device => Device.device !== null )
    const noDeviceRooms = patientList.filter(Device => Device.device === null )
    console.log("vhdsbhbbszhbhs",deviceRooms)
    console.log("noDeviceRooms",noDeviceRooms)
    // search 
//   const [query,setQuery] = useState('')
//   const filteredData = deviceRooms.filter((item) =>
//   item.deviceName.toLowerCase().includes(query.toLowerCase())
// );
  

    const handleClick = () => {
      window.history.back()
    }


  return (
    <div className="Maincontainer">
      <div className="leftBox"><Navbar /></div>
      <div className="rightBox">
        <Scrollbars>
          <SubTopbar />
            
          <div style={{display:'flex'}}>
          <button className='handleBack' onClick={handleClick}> <span> <TiArrowLeft size={22}/> </span> Back</button>

          <button className="room-btn" onClick={() => setShowRooms(!showRooms)}> {showRooms ? ' Without Devices' : 'With Devices'}</button>
          </div>
          {/* <div className="search">
            <input type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)} />
           
          </div> */}
         


          <div className="profile-flex" style={{marginTop:'50px'}}>





           
      {showRooms ? (
        <>

     { deviceRooms.map((data,i) => {
    //  { filteredData.map((data) => {
       return (
         <>
          <div className="profile-container" key={data.id}>
            <div className={`cards ${i % 2 === 0 ? 'even' : 'odd'}`}>
              <img className="img" id="imgid" src={profile} alt="" />
  
              <div>
                <span>{data.fName} {data.lName}</span>
                <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>
                <span>Patient Id: </span>
                <span> {data.pID}</span>

                </div>
              </div>
              <div>
              <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>

                <span>Department: </span>
                <span>{data.department}</span>
                </div>
                <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>

                <span>Device:   </span>
                <span>{data.device}</span>
                </div>
              </div>
            
              <div>
                <button id="pat-btn" style={{cursor:'pointer',border:'none'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>See More </button>
              </div>
            </div>
          </div>
        </>
      )
    })}
        </>

      ):(
        <>

        { noDeviceRooms.map((data,i) => {
          return (
            <>
              <div className="profile-container" key={data.id}>
                <div className={`cards ${i % 2 === 0 ? 'even' : 'odd'}`}
>
                  
                  <img className="img" id="imgid" src={profile} alt="" />
      
                  <div>
                <span>{data.fName} {data.lName}</span>
                <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>
                <span>Patient Id: </span>
                <span> {data.pID}</span>

                </div>
              </div>
              <div>
              <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>

                <span>Department: </span>
                <span>{data.department}</span>
                </div>
                <div style={{display:'flex',marginTop:'10px', justifyContent:'space-between',fontSize:"12px"}}>

                <span>Device:   </span>
                <span>{data.device}</span>
                </div>
              </div>
            
              <div>
                <button id="pat-btn" style={{cursor:'pointer',border:'none'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>See More </button>
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

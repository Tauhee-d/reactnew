import React, { useState, useEffect } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import "./PatientProfile.css";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import Alert from "../../../components/Alert/Alert";

import Avatar from "../../../assets/img/Avatar.jpeg";


import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import getPatients from "../../../Firebase/firebaseControllers/hosPatientList";



const PatientProfile = () => {
  const history = useNavigate();

  const location = useLocation();
  const ID = location.state.id;

  const handleBack = () => {
    window.history.back();
  };
  const handleRoom = () => {
    history("/Room");
  };

  const [roomsDataroom, setRoomsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
    };
    fetchData();
  }, []);
  console.log("object", roomsDataroom);

  const patientList = roomsDataroom.filter((patient) => patient.id === ID);

 
 

  

  
 
  
  function formatTime(epochTime) {
    const date = new Date(epochTime * 1000); // convert epoch time to milliseconds
    const timeString = date.toLocaleTimeString();
    return timeString;
  }

  return (
    <div className="Container">
      <div className="left-profile">
        <Navbar Alert={<Alert />} />
      </div>

      <div className="right-profile">
        <Scrollbars>
          <SubTopbar />
          <button className="back-button" onClick={handleBack}>
            Go Back
          </button>
          <button className="back-room" onClick={handleRoom}>
            Rooms
          </button>

          {/*                 
                {studentList.map(student => (
        <li key={student.id} >
          {student.details}
        </li>
      ))} */}

          {patientList.map((patient) => {
            const time = formatTime(patient.latestTime);
            return (
              <>
             


                <div style={{ padding: "50px"}}>

                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                    <img className="pro-img" src={Avatar} alt="" srcset="" />
                    <span style={{fontSize:'30px',marginLeft:'10px'}}>
                      {patient.fName} {patient.lName}
                    </span>
                    </div>
                    <div>
                        <span>Latset Temperature {patient.latestTemp} C </span>
                        <div><span style={{fontSize:"10px",marginLeft:'100px'}}>-last at {time}</span></div>
                    </div>
                  </div>
                  <hr />
                <div className="pro-container">
                  <div style={{ flex: "2",padding:'15px' }}>
                  <h5 style={{marginTop:'20px',marginBottom:'20px'}}>General Information</h5>
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Date of birth</span><span>{patient.age}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Sex</span><span>{patient.gender}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Status</span><span>{patient.status}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Weight</span><span>{patient.weight}</span> </p>
                  <h5 style={{marginTop:'20px',marginBottom:'20px'}}>Contact Information</h5>
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Phone</span><span>{patient.phone}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Email</span><span>{patient.email}</span> </p>
                  <hr />
                  
                  </div>
                  <div className="vertical-line"></div>

                  <div style={{ flex: "3",padding:'15px' }}>
                  <h5 style={{marginTop:'20px',marginBottom:'20px'}}>Latest Diagnoses</h5>
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Diagnoses</span><span>{patient.diagnoses}</span> </p>
                  
                  <h5 style={{marginTop:'20px',marginBottom:'20px'}}>Doctor Information</h5>
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Doctor Id</span><span>{patient.docID}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Doctor</span><span>{patient.docName}</span> </p>
                  <hr />
                  <p style={{fontSize:'12px',justifyContent:'space-between',display:'flex'}}><span>Department</span><span>{patient.department}</span> </p>
                  <hr />
                  
                  </div>                </div>
                </div>
              </>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default PatientProfile;

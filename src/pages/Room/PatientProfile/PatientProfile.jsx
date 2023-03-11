import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./PatientProfile.css";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import Alert from "../../../components/Alert/Alert";
import { TiArrowLeft } from "react-icons/ti";


import Avatar from "../../../assets/img/Avatar.jpeg";

import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { LineChart,  ResponsiveContainer,  Legend,  Tooltip, Line, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";



import getPatients from "../../../Firebase/firebaseControllers/hosPatientList";
import getReadings from "../../../Firebase/firebaseControllers/Readings";

const PatientProfile = () => {

  
  const history = useNavigate();

  const location = useLocation();
  const ID = location.state.id;
  console.log("first",ID)

  const handleBack = () => {
    window.history.back();
  };
  const handleRoom = () => {
    history("/Room");
  };

  const [roomsDataroom, setRoomsData] = useState([]);
  const [readingsData, setReadingsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      const reading = await getReadings();
      setRoomsData(data);
      setReadingsData(reading);
    };
    fetchData();
  }, []);
  // console.log("object", roomsDataroom);
  
  const patientList = roomsDataroom.filter((patient) => patient.id === ID);
  const patientReadings = readingsData.filter((patient) => patient.id === ID);
  console.log("timeline", readingsData);
  
  function formatTime(epochTime) {
    const date = new Date(epochTime * 1000); // convert epoch time to milliseconds
    const timeString = date.toLocaleTimeString();
    return timeString;

    
  }

  
  const Data = [
    { time: "12:00", temp: "120" },
    { time: "01:00", temp: "130" },
    { time: "02:00", temp: "120" },
    { time: "03:00", temp: "150" },
    { time: "04:00", temp: "120" },
    { time: "05:00", temp: "170" },
    { time: "06:00", temp: "140" },


]
const ModerateTemperature = Data.map((data, i) => {
  return (
    <>
      <TableRow key={i} className='table' style={{ cursor: "pointer" }}>
        <TableCell style={{ fontSize: "12px" }}>
          {data.time}
        </TableCell>

        <TableCell style={{ fontSize: "12px" }}>{data.temp}</TableCell>
      </TableRow>
    </>
  );
});
const Header = () => {
  return (
      <thead>
     
      </thead>
  )
}
const Row = (props) => {
  const { time, temp } = props
  return (
      <tr>
          <td>{time}</td>
          <td>{temp}</td>

      </tr>
  )
}
const Table = (props) => {
  const { data } = props

  return (
      <table className="centered"  id='Table'>
          <tbody>
              <Header />
              {data.map(row =>
                  <Row time={row.time} temp={row.temp} />
                  
              )}
          </tbody>
      </table>
  )
}

  return (
    <>
    <div className="Container">
      <div className="left-profile">
        <Navbar />
      </div>

      <div className="right-profile">
        <Scrollbars>
          <SubTopbar />

          <button className="back-button1" onClick={handleBack}>
            {" "}
            <span>
              {" "}
              <TiArrowLeft size={25} />{" "}
            </span>{" "}
            Back
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
                <div style={{ padding: "50px", marginTop: "50px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <img className="pro-img" src={Avatar} alt="" srcset="" />
                      <span style={{ fontSize: "30px", marginLeft: "10px" }}>
                        {patient.fName} {patient.lName}
                      </span>
                    </div>
                    <div>
                      <span>Latset Temperature {patient.latestTemp} C </span>
                      <div>
                        <span style={{ fontSize: "10px", marginLeft: "100px" }}>
                          -last at {time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="pro-container">
                    <div style={{ flex: "2", padding: "15px" }}>
                      <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        General Information
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Date of birth</span>
                        <span>{patient.age}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Sex</span>
                        <span>{patient.gender}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Status</span>
                        <span>{patient.status}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Weight</span>
                        <span>{patient.weight}</span>{" "}
                      </p>
                      <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        Contact Information
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Phone</span>
                        <span>{patient.phone}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Email</span>
                        <span>{patient.email}</span>{" "}
                      </p>
                      <hr />
                    </div>
                    <div className="vertical-line"></div>

                    <div style={{ flex: "3", padding: "15px" }}>
                      <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        Latest Diagnoses
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Diagnoses</span>
                        <span>{patient.diagnoses}</span>{" "}
                      </p>

                      <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        Doctor Information
                      </h5>
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Doctor Id</span>
                        <span>{patient.docID}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Doctor</span>
                        <span>{patient.docName}</span>{" "}
                      </p>
                      <hr />
                      <p
                        style={{
                          fontSize: "12px",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <span>Department</span>
                        <span>{patient.department}</span>{" "}
                      </p>
                      <hr />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
    <div className="Container2" style={{display:'flex'}}>
      <div className="left-container" style={{flex:'1',padding:'20px'}}>
      <h5 style={{ margin: "50px"}}>Readings </h5>      
           <ResponsiveContainer width={"100%"} height={"60%"} aspect={3} className="graph">
           <LineChart data={Data}>
             <Line dataKey="temp" stroke="red" />
             <Legend />
             <XAxis dataKey="time" interval={"preserveStartEnd"} />
             <YAxis dataKey="temp" interval={"preserveStartEnd"} />
             <Tooltip />
           </LineChart>
         </ResponsiveContainer>
        
        </div>
        {/* <div className="vertical-line"></div> */}

      <div className="right-container" style={{flex:'1',marginLeft:'150px'}}>

      <h5 style={{ margin: "50px"}}>Readings Table</h5>      

     <Scrollbars>
                    <TableRow  >
                      <TableCell style={{marginLeft:'300px', width:'300px'}}>Time</TableCell>
                      <TableCell>Temp</TableCell>
                      {/* <TableCell>Temp</TableCell> */}
                    </TableRow>

                    <TableBody>

                      {ModerateTemperature}
                    </TableBody>
                </Scrollbars>
    

      </div>
    </div>
        </Scrollbars>
      </div>
    </div>
    </>
  );
};

export default PatientProfile;

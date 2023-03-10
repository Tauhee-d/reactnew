import React, { useState, useEffect } from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import "./PatientProfile.css";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import Alert from "../../../components/Alert/Alert";

import Avatar from "../../../assets/img/Avatar.jpeg";
import { GrAlarm, GrDocumentPdf, GrMailOption } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { FormControl, MenuItem, Select } from "@mui/material";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

import getPatients from "../../../Firebase/firebaseControllers/hosPatientList";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { RecentPatientData } from "../../DashboardDoc/DahboardDoc";

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

  const [currentValue, setCurrentValue] = useState(1);
  const [curentValue, setCurentValue] = useState(11);
  const Data = [
    { time: "12:00", temp: "120" },
    { time: "01:00", temp: "130" },
    { time: "02:00", temp: "120" },
    { time: "03:00", temp: "150" },
    { time: "04:00", temp: "120" },
    { time: "05:00", temp: "170" },
    { time: "06:00", temp: "140" },
  ];

  const NormalTable = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Temp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.temp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const Header = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell style={{ width: "450px" }}>Time</TableCell>
          <TableCell style={{ width: "50px" }}>Temp</TableCell>
        </TableRow>
      </TableHead>
    );
  };
  const Row = (props) => {
    {
      patientList.map((tempReadings) => {
        const { time, temp } = props;
        return (
          <tr>
            {/* <TableCell style={{width:'400px'}}>{time}</TableCell>
                        <TableCell >{temp}</TableCell> */}
            <TableCell style={{ width: "400px" }}>
              {tempReadings.time}
            </TableCell>
            <TableCell>{tempReadings.temp}</TableCell>
          </tr>
        );
      });
    }
  };
  const Tablew = (props) => {
    const { data } = props;

    return (
      <table className="centered" id="Table">
        <tbody>
          <Header />
          {data.map((row) => (
            <Row time={row.time} temp={row.temp} />
          ))}
        </tbody>
      </table>
    );
  };
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

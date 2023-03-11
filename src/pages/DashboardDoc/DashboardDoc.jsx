import React, { useState, useEffect } from "react";
import {
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import { TiGroupOutline } from "react-icons/ti";

import Navbar from "../../components/Navbar/Navbar";
import SubTopbar from "../../components/SubTopbar/SubTopbar";
import "./DashboardDoc.css";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import getPatients from "../../Firebase/firebaseControllers/hosPatientList";

const DashboardDoc = () => {
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");
  const date = new Date();
  const hours = date.getHours();

  useEffect(() => {
    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const currentDate = new Date();

  const Name = sessionStorage.getItem("name");

  const [roomsDataroom, setRoomsData] = useState([]);

  const highTemperature = roomsDataroom.filter((item) => item.latestTemp >= 95);
  const moderateTemperature = roomsDataroom.filter(
    (item) => item.latestTemp < 95
  );

  const sortedData = roomsDataroom.sort(
    (a, b) => new Date(b.addedon * 1000) - new Date(a.addedon * 1000)
  );
  const recentData = sortedData.slice(0, 6);

  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
    };
    fetchData();
  }, []);

  const [data, setData] = useState([
    {
      gender: "Male",
      count: roomsDataroom.filter((patient) => patient.gender === "male")
        .length,
    },
    {
      gender: "Female",
      count: roomsDataroom.filter((patient) => patient.gender === "female")
        .length,
    },
    {
      date: "date",
      count: roomsDataroom.filter((patient) => patient.addedon === "date")
        .length,
    },
  ]);


 


  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, []);

  const t1 = roomsDataroom.map((data, i) => {
    const handleAddPatient = () => {
      navigate("/PatientProfile", { state: { id: data.id } });
     
    };

    return (
      <>
        <TableRow
          key={i}
          onClick={handleAddPatient}
          style={{ cursor: "pointer" }}
          className='table'
        >
          <TableCell style={{ fontSize: "12px" }}>{data.id}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.department}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.gender}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.status}</TableCell>
        </TableRow>
      </>
    );
  });
  const t2 = recentData.map((data, i) => {
    return (
      <>
        <TableRow key={i} className='table' style={{ cursor: "pointer" }}>
          <TableCell style={{ fontSize: "12px" }}>{data.id}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.phone}</TableCell>
        </TableRow>
      </>
    );
  });
  const HigherTemperature = highTemperature.map((data, i) => {
    return (
      <>
        <TableRow key={i} className='table' style={{ cursor: "pointer" }}>
          <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell>

          <TableCell style={{ padding: "2px", fontSize: "12px" }}>
            {" "}
            <div
              style={{
                backgroundColor: "rgb(231, 106, 129)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {data.latestTemp}
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  });
  const ModerateTemperature = moderateTemperature.map((data, i) => {
    return (
      <>
        <TableRow key={i} className='table' style={{ cursor: "pointer" }}>
          <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell>

          <TableCell style={{ fontSize: "12px" }}>{data.latestTemp}</TableCell>
        </TableRow>
      </>
    );
  });


  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear(); // Get the current year
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // Create a Date object for the first day of the current month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); // Create a Date object for the last day of the current month
  
  const patientsAddedThisMonth = roomsDataroom.filter(patient => {
    const date = new Date(patient.addedOn * 1000); // Convert epoch time to Date object
    return date >= firstDayOfMonth && date <= lastDayOfMonth; // Filter by date range
  });

const count = patientsAddedThisMonth.length;

const totalPatientCount = roomsDataroom.length;

// Patient filter according to their gender 
const filterGender = "male";
const filteredPatients = roomsDataroom.filter(patient => patient.gender === filterGender);
const malecount = filteredPatients.length;

const filterFemale = "female";
const filtered = roomsDataroom.filter(patient => patient.gender === filterFemale);
const femalecount = filtered.length;


  return (
    <div className="MedDashboard">
      <div className="Med-left">
        <Navbar />
      </div>
      <div className="Med-right">
        <SubTopbar />

        <div style={{ margin: "20px" }}>
          <h3>
            {greeting} Dr.{Name}
          </h3>
          <div style={{ fontSize: "10px" }}>
            <span>{currentDate.toDateString()}</span>
            <span style={{ marginLeft: "100px" }}>
              {" "}
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="Container">
          <div className="Container-left">
            <div className="con-one">
             
              <div className="statistics">
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
                      <span style={{fontWeight:'bold'}}>Patients</span>
                      <span>This month</span>
                    </div>
                    <div>
                      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                          <span style={{fontSize:"40px"}}>{count}</span>
                          <span>New Patients</span>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                      <span style={{fontSize:"40px"}}>{totalPatientCount}</span>
                          <span>Old Patients</span>
                      </div>
                    </div>
               
              </div>
              <div className="statistics1">
                <div style={{marginTop:'20px'}}>
                <span style={{fontWeight:'bold'}}>Gender</span>
                  </div>
                  <div className="gender"  style={{display:'flex',height:'200px',flexDirection:'column'}}>
                    <div>

                  <span style={{marginLeft:'15px'}}>  <TiGroupOutline size={60} /> </span>
                  <div>

                  <span>Total Patient</span>
                    <span style={{marginLeft:'10px'}} >{totalPatientCount}</span>
                  </div>
                    </div>
                  <div>
                    
                    <div style={{display:'flex',justifyContent:'space-between',width:'150px'}}>
                      <div>Women:{femalecount}</div>
                      <div>Men:{malecount}</div>
                    </div>
                  </div>

                  </div>
              

               
              </div>
              <div className="notification">
              <span style={{fontWeight:'bold'}}>Notification</span>

                <Scrollbars>
                  <Table>
                    <TableRow >
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Phone</TableCell>
                    </TableRow>

                    <TableBody>
                      {/* <Scrollbars> */}

                      {t2}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
            <div className="con-two">
              <div className="rec-patient">
              <span style={{fontWeight:'bold'}}>Recent Patient</span>
                <Scrollbars>
                  <Table>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Patient</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>

                    <TableBody>
                      {/* <Scrollbars> */}

                      {t1}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
          </div>
          <div className="Container-right">
            <div className="alerts">
              <div className="high-temparature">
                <span style={{fontWeight:'bold',fontSize:'14px'}}>High Temperature Alerts</span>

                <Scrollbars>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableCell>PatientName</TableCell>

                        <TableCell>Alert</TableCell>
                      </TableRow>
                    </thead>
                    <TableBody>{HigherTemperature}</TableBody>
                  </Table>
                </Scrollbars>
              </div>
              <div className="low-temparature">
                <span style={{fontWeight:'bold',fontSize:'14px'}}>Moderate and low fever Alerts</span>

                <Scrollbars>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableCell>PatientName</TableCell>

                        <TableCell>Alert</TableCell>
                      </TableRow>
                    </thead>
                    <TableBody>{ModerateTemperature}</TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDoc;

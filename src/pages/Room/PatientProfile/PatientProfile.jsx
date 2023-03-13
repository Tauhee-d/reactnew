import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./PatientProfile.css";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { TiArrowLeft } from "react-icons/ti";
import Avatar from "../../../assets/img/Avatar.jpeg";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AiFillMessage,AiOutlineMessage } from 'react-icons/ai';
import {db} from '../../../Firebase/firebase'
import firebase from 'firebase/app';



import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

import getPatients from "../../../Firebase/firebaseControllers/hosPatientList";
import getReadings from "../../../Firebase/firebaseControllers/Readings";
import getTimeline from "../../../Firebase/firebaseControllers/Timeline";
import getMessage from "../../../Firebase/firebaseControllers/Message";

const PatientProfile = () => {
  const history = useNavigate();

  const location = useLocation();
  const ID = location.state.id;
  console.log("first", ID);

  const handleBack = () => {
    window.history.back();
  };
  const handleRoom = () => {
    history("/Room");
  };

  const [roomsDataroom, setRoomsData] = useState([]);
  const [readingsData, setReadingsData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      const reading = await getReadings();
      const timeline = await getTimeline();
      const msg = await getMessage();
      setRoomsData(data);
      setReadingsData(reading);
      setTimelineData(timeline);
      setMessage(msg);
    };
    fetchData();
  }, []);
  // console.log("object", roomsDataroom);

  const Message = message.filter((patient) => patient.formData.patientID === ID);
  const patientList = roomsDataroom.filter((patient) => patient.id === ID);
  const pID = patientList.map((patient) => patient.id);
  const patientTimeline = timelineData.filter(
    (patient) => patient.patientID === pID
  ); //device id
  const deviceID = patientTimeline.map((timeline) => timeline.deviceID);

  const patientReadings = readingsData.filter(
    (patient) => patient.id === deviceID
  ); //id
  const deviceID1 = readingsData.map((timeline) => timeline.id);
  // console.log("id1", message);
  // console.log("id2", Message);
  // console.log("timeline",patientList);
  // console.log("readings", readingsData);
  // console.log("object",deviceID);
  // console.log("patientList",deviceID1);
  // console.log("patientList1",patientList);

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
  ];
  const ModerateTemperature = Data.map((data, i) => {
    return (
      <>
        <TableRow key={i} className="table" style={{ cursor: "pointer" }}>
          <TableCell style={{ fontSize: "12px" }}>{data.time}</TableCell>

          <TableCell style={{ fontSize: "12px" }}>{data.temp}</TableCell>
        </TableRow>
      </>
    );
  });


  //Message view

  const msgView = Message.map((data)=> {
    return (
      <>
      <p>{data.formData.description}</p>
      </>
    )
  })




  //Message form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpen1, setIsFormOpen1] = useState(false);
  const [formData, setFormData] = useState({
    title: "",attender: "",attenderID: "",patientID:'',description:''
  });
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const toggleForm1 = () => {
    setIsFormOpen1(!isFormOpen1);
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormOpen(false);
    db.collection('messages').add({
      // title,attender,attenderID,patientI,description,
      formData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log('Message successfully sent to Firestore!');
    })
    .catch((error) => {
      console.error('Error sending message to Firestore: ', error);
    });
    setFormData('')
  
  };

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
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <img
                          className="pro-img"
                          src={Avatar}
                          alt=""
                          srcset=""
                        />
                        <span style={{ fontSize: "30px", marginLeft: "10px" }}>
                          {patient.fName} {patient.lName}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "300px",
                        }}
                      >
                        <div className="msg-btn">
                          <div>
                            <p onClick={toggleForm1}>View message <AiOutlineMessage/></p>
                            {isFormOpen1 && (
                              <div className="msg-container1">
                                <div>
                                  {msgView}
                                </div>
                              </div>
                            )}
                          </div>
                          
                        </div>
                        <div className="msg-btn">
                          <div>
                            <p onClick={toggleForm}>message <AiOutlineMessage/></p>
                            {isFormOpen && (
                              <div className="msg-container">
                                <div>
                                  <form
                                    onSubmit={handleSubmit}
                                    className="msg-form"
                                  >
                                    <span style={{fontWeight:'bold'}}>Message <AiFillMessage/> </span>
                                    <label className="label">
                                      Title*
                                    </label>
                                      <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                       className='form-input'
                                      
                                      />
                                      <div style={{ display:'flex', justifyContent:"space-between"}}>
                                      <div style={{display:'flex',flexDirection:'column'}}>

                                    <label className="label">
                                      Attender*
                                    </label>
                                      <input
                                        type="text"
                                        name="attender"
                                        value={formData.attender}
                                        onChange={handleChange}
                                        className='form-input'
                                        style={{width:'270px'}}
                                      />
                                      </div>
                                      <div style={{display:'flex',flexDirection:'column'}}>

                                    <label className="label">
                                      AttenderID*
                                    </label>
                                      <input
                                        type="text"
                                        name="attenderID"
                                        value={formData.attenderID}
                                        onChange={handleChange}
                                        className='form-input'
                                        style={{width:'270px'}}

                                      />
                                      </div>
                                      </div>
                                      <label className="label">
                                      PatientID*
                                    </label>
                                      <input
                                        type="text"
                                        name="patientID"
                                        value={formData.patientID}
                                        onChange={handleChange}
                                        className='form-input'
                                        // style={{width:'270px'}}

                                      />
                                    <label className="label">
                                      Description*
                                    </label>
                                      <textarea
                                        name="description"
                                        rows='4'
                                        value={formData.description}
                                        onChange={handleChange}
                                        className='form-input'
                                      />
                                    <button className="form-btn" type="submit">Submit</button>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                        <div>
                          <span>
                            Latset Temperature {patient.latestTemp} C{" "}
                          </span>
                          <div>
                            <span
                              style={{ fontSize: "10px", marginLeft: "100px" }}
                            >
                              -last at {time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                          <span>Patient ID</span>
                          <span>{patient.id}</span>{" "}
                        </p>
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
                        
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
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
                        <div style={{border:'0.1px solid rgba(235, 230, 230, 0.592)',marginTop:'10px',marginBottom:'10px'}}></div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="Container2" style={{ display: "flex" }}>
              <div
                className="left-container"
                style={{ flex: "1", padding: "20px" }}
              >
                <h5 style={{ margin: "50px" }}>Readings </h5>
                <ResponsiveContainer
                  width={"100%"}
                  height={"60%"}
                  aspect={3}
                  className="graph"
                >
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

              <div
                className="right-container"
                style={{ flex: "1", marginLeft: "150px" }}
              >
                <h5 style={{ margin: "50px" }}>Readings Table</h5>

                <Scrollbars>
                  <TableRow>
                    <TableCell style={{ marginLeft: "300px", width: "300px" }}>
                      Time
                    </TableCell>
                    <TableCell>Temp</TableCell>
                    {/* <TableCell>Temp</TableCell> */}
                  </TableRow>

                  <TableBody>{ModerateTemperature}</TableBody>
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

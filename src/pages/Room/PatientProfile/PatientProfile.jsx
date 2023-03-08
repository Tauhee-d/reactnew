import React,{useState,useEffect} from 'react'
import Scrollbars from 'react-custom-scrollbars'
import './PatientProfile.css'
import SubTopbar  from '../../../components/SubTopbar/SubTopbar'
import Alert from "../../../components/Alert/Alert";

import Avatar from '../../../assets/img/Avatar.jpeg'
import { GrAlarm,GrDocumentPdf,GrMailOption } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { FormControl, MenuItem, Select } from '@mui/material';
import { LineChart,  ResponsiveContainer,  Legend,  Tooltip, Line, XAxis, YAxis } from "recharts";

import {useLocation} from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

import getPatients from '../../../Firebase/firebaseControllers/hosPatientList'
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';


import { RecentPatientData } from '../../DashboardDoc/DahboardDoc';


const PatientProfile = () => {
    
    const history = useNavigate()

    const location = useLocation()
  const ID = location.state.id

  const handleBack = () => {
    window.history.back()
  }
  const handleRoom = () => {
    history('/Room')
  }


  




  const [roomsDataroom, setRoomsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
    };
    fetchData();
  }, []);
  console.log("object",roomsDataroom);
  
  
  




//   const patientList = apiData.filter(student => student.id === ID);
  const patientList = roomsDataroom.filter(patient => patient.id === ID ) 
//   const Display = { patientList === null ?  (singlePatient): null }
//   const patientList = patientProfile.filter(student => student.id === ID);
//   const studentList = studentDetails.filter(student => student.id === ID);

   
    
    const [currentValue, setCurrentValue] = useState(1)
    const [curentValue, setCurentValue] = useState(11)
    const Data = [
        { time: "12:00", temp: "120" },
        { time: "01:00", temp: "130" },
        { time: "02:00", temp: "120" },
        { time: "03:00", temp: "150" },
        { time: "04:00", temp: "120" },
        { time: "05:00", temp: "170" },
        { time: "06:00", temp: "140" },
    
    
    ]


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
           <TableCell style={{width:'450px'}}>Time</TableCell>
           <TableCell style={{width:'50px'}}>Temp</TableCell>
            </TableRow>
            </TableHead>
        )
    }
    const Row = (props) => {
            {patientList.map(tempReadings => {

                const { time, temp } = props
                return (
                    <tr>
                        {/* <TableCell style={{width:'400px'}}>{time}</TableCell>
                        <TableCell >{temp}</TableCell> */}
                        <TableCell style={{width:'400px'}}>{tempReadings.time}</TableCell>
                        <TableCell >{tempReadings.temp}</TableCell>
            
                    </tr>
                )
            })}

    }
    const Tablew = (props) => {
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
    function formatTime(epochTime) {
        const date = new Date(epochTime * 1000); // convert epoch time to milliseconds
const timeString = date.toLocaleTimeString();
return timeString
       
      }
    
  return (
   

    <div className='Container'>
        <div className="left-profile"><Navbar Alert={<Alert/>}/></div>
       
        <div className="right-profile">
            <Scrollbars>
                <SubTopbar/>
                <button className='back-button' onClick={handleBack}>Go Back</button>
                <button className='back-room' onClick={handleRoom}>Rooms</button>
               

{/*                 
                {studentList.map(student => (
        <li key={student.id} >
          {student.details}
        </li>
      ))} */}

                {patientList.map(patient => {
                    const time = formatTime(patient.latestTime)
                    return(
<>
                <div className="Profile">
                    <div className="profile-left">
                        <div className='left-1block'>

                        <div>
                            <img className='img-1' src={Avatar} alt="" srcset="" />
                        </div>
                        <div >
                            <span>{patient.fName} {patient.lName}</span>
                            <span>PatientID:{patient.pID}</span>
                            <span>Phone:{patient.phone}</span>
                            <span>Email - {patient.email}</span>
                        </div>
                        </div>

                        <div className="left-2block">
                            <div>
                                <span>Current Temperature:-</span>
                            </div>
                            <div>
                                <span>{patient.latestTemp} C</span>
                                <span>-last  at {time}</span>
                            </div>
                        </div>
                        <div className="left-3block">
                            <div>
                                <span><GrAlarm size={'1.2rem'}/></span>
                                <span>Alerts</span>
                            </div>
                            <span>High temperature</span>
                        </div>
                        <div className="left-4block">
                            <div>
                                <span>Diagnosis</span>
                                <span><GrDocumentPdf size={'1.2rem'}/></span>
                            </div>
                            <div>
                                <span>1. Plumonary anueyrism</span>
                                <span>2. Activity in Sinoi-artrial-node</span>
                            </div>
                        </div>

                        
                    </div>
                    <div className="profile-right">
                        <div className='right-1block'>

                        <div className='profile-rightspan'>
                            <span className='span1'>Age:-  {patient.age}</span>
                            <span>Height:-  5.5ft</span>
                        </div>
                        <div className='profile-rightspan'>
                            <span className='span1'>Gender:- {patient.gender}</span>
                            <span>Weight:- {patient.weight}</span>
                        </div>

                        </div>
                        <div className='right-2block'>
                            <div>
                            <span>Guardian Details</span>
                            <span><FiEdit size={'1.2rem'} /></span>

                            </div>
                            <span>Guardian name:- James Richard</span>
                            <span>Phone - 63473643733</span>
                            <span>Email - fdhd@gmail.com</span>
                        </div>
                        <div className="right-3block">
                            <span>Doctor Details</span>
                            <div>
                                <span>Attending Physician:-</span>
                                <span>
                                {patient.docName}
                                {/* <FormControl>
                                 <Select labelId="demo-simple-select-label" value={currentValue} style={{width: 300,height:35}}
                                     onChange={(e) => {console.log("Current Value", e.target.value)
                                     setCurrentValue(e.target.value)}}>
                                     <MenuItem value={1}>Dr.Mac</MenuItem>
                                     <MenuItem value={2}>Dr.Zab</MenuItem>
                                     <MenuItem value={3}>Dr.Max</MenuItem>
                                 </Select>
                                </FormControl> */}
                                </span>
                            </div>
                            <div>
                                <span>Department:-</span>
                                <span>
                                {patient.department}
                                {/* <FormControl>
                                 <Select labelId="demo-simple-select-label" value={curentValue} style={{width: 300,height:35}}
                                     onChange={(e) => {console.log("Current Value", e.target.value)
                                     setCurentValue(e.target.value)}}>
                                     <MenuItem value={11}>Cardiology</MenuItem>
                                     <MenuItem value={12}>Pediatrist</MenuItem>
                                     <MenuItem value={13}>Dermologist</MenuItem>
                                 </Select>
                                </FormControl> */}
                                </span>
                                <span style={{ height: "200px" }} ><  GrMailOption size={'1.2rem'} /></span>
                            </div>
                        </div>
                        <div className="right-4block">
                            <div>
                                <span>Medication</span>
                                <span><GrDocumentPdf size={'1.2rem'}/></span>
                                <span><GrAlarm size={'1.2rem'}/></span>
                            </div>
                            <div>
                                <span>Name</span>
                                <span>Dosage</span>
                                <span>Time</span>
                            </div>
                            <div>
                                <span>1.Medicine 1</span>
                                <span>2.Medicine 2</span>
                                <span>3.Medicine 3</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="profile-2block">
                        <div style={{width:'50%'}}>
                        Graph
            <ResponsiveContainer width={"100%"}  aspect={3} className="graph">
            <LineChart data={patientList}>
              <Line dataKey="temp" stroke="red" />
              <Legend />
              <XAxis dataKey="time" interval={"preserveStartEnd"} />
              <YAxis dataKey="temp" interval={"preserveStartEnd"} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>

                        </div>
                        <div style={{width:'50%'}} >
                        Table
                        <TableContainer >
                        <Table>

                        <Tablew  data={Data} />
                        </Table>

                        </TableContainer>
                        {/* <NormalTable/> */}

                        </div>
                    </div>
                    </>
                    )
                })}

                   
            

            </Scrollbars>
        </div>
    </div>
  
  )
}

export default PatientProfile
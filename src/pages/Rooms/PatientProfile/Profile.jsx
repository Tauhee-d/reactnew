import React,{useState} from 'react'
import Scrollbars from 'react-custom-scrollbars'
import './Profile.css'
import Avatar from '../../../assets/img/Avatar.jpeg'
import { GrAlarm,GrDocumentPdf,GrMailOption } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { FormControl, MenuItem, Select } from '@mui/material';
import { LineChart,  ResponsiveContainer,  Legend,  Tooltip, Line, XAxis, YAxis } from "recharts";


const Profile = () => {
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
        console.log(data);
        return (
            <table className="centered"  id='Table'>
                <tbody>
                    <Header />
                    {data.map(row =>
                        <Row time={row.time} temp={row.temp} />
                        // <Row userId={row.userId} />
                    )}
                </tbody>
            </table>
        )
    }
    
  return (
   

    <div className='Container'>
       
        <div className="right-profile">
            <Scrollbars>

                <div className="Profile">
                    <div className="profile-left">
                        <div className='left-1block'>

                        <div>
                            <img className='img-1' src={Avatar} alt="" srcset="" />
                        </div>
                        <div >
                            <span>Sarah jones</span>
                            <span>Patient Id - 17382392</span>
                            <span>Phone - 093858376346</span>
                            <span>Email - sarah@gmail.com</span>
                        </div>
                        </div>

                        <div className="left-2block">
                            <div>
                                <span>Current Temperature:-</span>
                            </div>
                            <div>
                                <span>101 F</span>
                                <span>-last  at 13.20</span>
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
                            <span className='span1'>Age:-  32years</span>
                            <span>Height:- 5.5ft</span>
                        </div>
                        <div className='profile-rightspan'>
                            <span className='span1'>Gender:- Female</span>
                            <span>Weight:- 68kg</span>
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
                                <FormControl>
                                 <Select labelId="demo-simple-select-label" value={currentValue} style={{width: 300,height:35}}
                                     onChange={(e) => {console.log("Current Value", e.target.value)
                                     setCurrentValue(e.target.value)}}>
                                     <MenuItem value={1}>Dr.Mac</MenuItem>
                                     <MenuItem value={2}>Dr.Zab</MenuItem>
                                     <MenuItem value={3}>Dr.Max</MenuItem>
                                 </Select>
                                </FormControl>
                                </span>
                            </div>
                            <div>
                                <span>Department:-</span>
                                <span>
                                <FormControl>
                                 <Select labelId="demo-simple-select-label" value={curentValue} style={{width: 300,height:35}}
                                     onChange={(e) => {console.log("Current Value", e.target.value)
                                     setCurentValue(e.target.value)}}>
                                     <MenuItem value={11}>Cardiology</MenuItem>
                                     <MenuItem value={12}>Pediatrist</MenuItem>
                                     <MenuItem value={13}>Dermologist</MenuItem>
                                 </Select>
                                </FormControl>
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
            <LineChart data={Data}>
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
                        <Table  data={Data} />

                        </div>
                    </div>
                    {/* <div className="profile-3block">
                        <div className="block3-left">
                            Sleep Analysis Graph
                        </div>
                        <div className="block3-right">
                            Some other vitals
                        </div>
                    </div> */}
            

            </Scrollbars>
        </div>
    </div>
  
  )
}

export default Profile

import React,{useState,useEffect,useContext} from 'react'
import { LineChart, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Line } from 'recharts';
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import "./DashboardDoc.css";
import {Table,TableBody,TableCell,TableRow} from '@mui/material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from "react-router-dom";
import UserRoleContext from '../../components/ContextApi/UserRoleContext';
import getPatients from '../../Firebase/firebaseControllers/hosPatientList'


const DashboardDoc = () => {





  const navigate = useNavigate();

  
    const [greeting, setGreeting] = useState('');
    const date = new Date();
    const hours = date.getHours();
    
    useEffect(() => {
  
      if (hours >= 5 && hours < 12) {
        setGreeting('Good Morning');
      } else if (hours >= 12 && hours < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
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
    // sessionStorage.setItem('name',userRole.lastName);
    


  const [roomsDataroom, setRoomsData] = useState([]);

  const highTemperature = roomsDataroom.filter(item => item.latestTemp >= 95);
  console.log("roomsDataroom",highTemperature);
  const moderateTemperature = roomsDataroom.filter(item => item.latestTemp < 95);


  const sortedData = roomsDataroom.sort((a, b) => new Date(b.addedon * 1000) - new Date(a.addedon * 1000));
  const recentData = sortedData.slice(0, 6);

  
  console.log("recentData",recentData);



  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
      console.log("first",data)
    };
    fetchData();
  }, []);
  
  
  
  const [data, setData] = useState([
    { gender: 'Male', count: roomsDataroom.filter(patient => patient.gender === 'male').length },
    { gender: 'Female', count: roomsDataroom.filter(patient => patient.gender === 'female').length },
    { date: 'date', count: roomsDataroom.filter(patient => patient.addedon === 'date').length },
  ]);

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, []);
  
  
  const t1 = roomsDataroom.map((data,i)=>{
    
    const handleAddPatient = () => {
      navigate('/PatientProfile',{state:{id:data.id}})
      // navigate(`/recentpatient/${data.id}`)
    };
    
   
    return(
      <>
         
           <TableRow key={i} onClick={handleAddPatient} style={{cursor:'pointer'}} >
           <TableCell style={{fontSize:'12px'}}>{data.id}</TableCell>
           <TableCell style={{fontSize:'12px'}}>{data.fName} {data.lName}</TableCell>
           <TableCell style={{fontSize:'12px'}}>{data.department}</TableCell>
           <TableCell style={{fontSize:'12px'}}>{data.gender}</TableCell>
           <TableCell style={{fontSize:'12px'}}>{data.status}</TableCell>
          </TableRow>
          
           {/* <TableRow >
           <TableCell><Link style={{ textDecoration: 'none' }}  exact to={`/recentpatient/${data.id}`} key={data.id} >{data.id}</Link></TableCell>
           <TableCell><Link style={{ textDecoration: 'none' }} exact to={`/recentpatient/${data.id}`} key={data.id} >{data.name}</Link></TableCell>
           <TableCell><Link style={{ textDecoration: 'none' }} exact to={`/recentpatient/${data.id}`} key={data.id} >{data.disease}</Link></TableCell>
          
          </TableRow> */}
         
      </>
    )
  })
  const t2 = recentData.map((data,i)=>{
   
    return(
      <>
           <TableRow key={i} style={{cursor:'pointer'}}>
            <TableCell style={{fontSize:'12px'}}>{data.id}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{data.fName} {data.lName}</TableCell>
            <TableCell style={{fontSize:'12px'}}>{data.phone}</TableCell>
          </TableRow>
      </>
    )
  })
  const HigherTemperature = highTemperature.map((data,i)=>{
   
    return(
      <>
           <TableRow key={i} style={{cursor:'pointer'}}>
            <TableCell style={{fontSize:'12px'}}>{data.fName} {data.lName}</TableCell>
        
            <TableCell style={{padding:'2px',fontSize:"12px"}} > <div style={{backgroundColor:'#ff4d4d',color:'white',textAlign:'center',padding:'2px',borderRadius:'4px',fontSize:'12px'}}>{data.latestTemp}</div></TableCell>
         
          </TableRow>
      </>
    )
  })
  const ModerateTemperature = moderateTemperature.map((data,i)=>{
   
    return(
      <>
           <TableRow key={i} style={{cursor:'pointer'}}>
            <TableCell style={{fontSize:'12px'}}>{data.fName} {data.lName}</TableCell>
           
            <TableCell style={{fontSize:'12px'}}>{data.latestTemp}</TableCell>
      
          </TableRow>
      </>
    )
  })
 

  return (
    <div className="MedDashboard">
      <div className="Med-left">
        <Navbar />
      </div>
      <div className="Med-right">
        <SubTopbar />
        {/* <Scrollbars> */}
        <div style={{margin:'20px'}}>

          <h3>{greeting} Dr.{Name}</h3>
          <div style={{fontSize:"10px"}}>
            <span>{currentDate.toDateString()}</span>
            <span style={{marginLeft:'100px'}}> {currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
          
        <div className="Container">



          {/* <p>{date}</p> */}
          {/* <p>{hours}</p> */}
          <div className="Container-left">
            <div className="con-one">
              <div className="notification">
                notification
               
                    <Scrollbars >
                <Table >
             
             <TableRow>
                 <TableCell >ID</TableCell>
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
              <div className="statistics">
                <span style={{margin:'15px'}}>statistics</span> 
              
              
              <LineChart
      width={350}
      height={250}
      data={graphData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="male" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="female" stroke="#82ca9d" activeDot={{ r: 8 }} />
    </LineChart>

              
              
              
              </div>
            </div>
            <div className="con-two">
              <div className="rec-patient">recent patient
              <Scrollbars >
                <Table >
             
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
            
               
               <p style={{color:'grey'}}>High Temperature Alerts</p>
               <Scrollbars >
              <Table>
              <thead>
                <TableRow>
                    <TableCell>PatientName</TableCell>
                  
                    <TableCell>Alert</TableCell>
                  
                </TableRow>
              </thead>
              <TableBody>
              {HigherTemperature}
              </TableBody>
              </Table>
      </Scrollbars>
            </div>
            <div className="low-temparature">
                <p style={{color:'grey'}}> Moderate and low fever Alerts</p>
                <Scrollbars>
              <Table>
              <thead>
                <TableRow>
                    <TableCell>PatientName</TableCell>
                    {/* <TableCell>TestName</TableCell> */}
                    {/* <TableCell>Temperature</TableCell> */}
                    <TableCell>Alert</TableCell>
                    {/* <TableCell>Time</TableCell> */}
                    {/* <TableCell>Viewed Status</TableCell> */}
                </TableRow>
              </thead>
              <TableBody>
              {ModerateTemperature}
              </TableBody>
              </Table>
                </Scrollbars>
            </div>
        



             
          </div>
          </div>
        </div>
        {/* </Scrollbars> */}
      </div>
    </div>
  );
};

export default DashboardDoc;

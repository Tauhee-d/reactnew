import React,{useState} from 'react'
import './DashboardDoc.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import {RecentPatientData,RecentNotifications,RecentAlerts,RecentMessages} from './DahboardDoc'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

// import { useHistory } from 'react-router-dom';

// material ui table 
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
// import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import SingleRecPatient from './SingleRecPatient'
import Scrollbars from 'react-custom-scrollbars'
const highTemperature = RecentAlerts.filter(item => item.temperature >= 36);
const moderateTemperature = RecentAlerts.filter(item => item.temperature < 36);



const DashboardDoc = () => {
  const [hide , setHide] = useState(true)
  
  const navigate = useNavigate();
  
  
  
  
  
  
  const t1 = RecentPatientData.map(data=>{
    
    const handleAddPatient = () => {
      navigate(`/recentpatient/${data.id}`)
    };
    
   
    return(
      <>
         
           <TableRow onClick={handleAddPatient} style={{cursor:'pointer'}} >
           <TableCell>{data.id}</TableCell>
           <TableCell>{data.name}</TableCell>
           <TableCell>{data.disease}</TableCell>
          </TableRow>
          
           {/* <TableRow >
           <TableCell><Link style={{ textDecoration: 'none' }}  exact to={`/recentpatient/${data.id}`} key={data.id} >{data.id}</Link></TableCell>
           <TableCell><Link style={{ textDecoration: 'none' }} exact to={`/recentpatient/${data.id}`} key={data.id} >{data.name}</Link></TableCell>
           <TableCell><Link style={{ textDecoration: 'none' }} exact to={`/recentpatient/${data.id}`} key={data.id} >{data.disease}</Link></TableCell>
          
          </TableRow> */}
         
      </>
    )
  })
  const t2 = RecentNotifications.map((data,i)=>{
   
    return(
      <>
           <tr key={i} style={{cursor:'pointer'}}>
            <td>{data.id}</td>
            <td>{data.patient}</td>
            <td>{data.messsage}</td>
          </tr>
      </>
    )
  })
  const HigherTemperature = highTemperature.map((data,i)=>{
   
    return(
      <>
           <tr key={i} style={{cursor:'pointer'}}>
            <td>{data.patientName}</td>
        
            <td style={{padding:'2px'}} > <div style={{backgroundColor:'#ff4d4d',color:'white',textAlign:'center',padding:'2px',borderRadius:'4px'}}>{data.alert}</div></td>
         
          </tr>
      </>
    )
  })
  const ModerateTemperature = moderateTemperature.map((data,i)=>{
   
    return(
      <>
           <tr key={i} style={{cursor:'pointer'}}>
            <td>{data.patientName}</td>
           
            <td>{data.alert}</td>
      
          </tr>
      </>
    )
  })
  const t4 = RecentMessages.map((data,i)=>{
   
    return(
      <>
           <tr key={i}>
            <td>{data.id}</td>
            <td>{data.messsage}</td>
            
          </tr>
      </>
    )
  })
 
  return (
    <div className='DashboardDoc'>
        <div className="doc-left"><Navbar/></div>
        <div className="doc-right">
           <SubTopbar />
          <Scrollbars>
          Doctor Dashboard
        <div className='container-1'>
          
        <div className="recent-notification">
              <p style={{color:'grey'}}>Recent notification</p>

              <Table style={{backgroundColor:'white'}}>
             
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Patient</TableCell>
                    <TableCell>Message</TableCell>
                </TableRow>
             
              <TableBody>
              {t2}
              </TableBody>
              </Table>
          </div>

        <div className="recent-messages">
              <p style={{color:'grey'}}>Recent messages</p>

              <Table>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Message</TableCell>
                </TableRow>
             
              <TableBody>
              {t4}
              </TableBody>
              </Table>
          </div>
         
        </div>  
      
     
        <div className="container-2">
        <div className="recent-patient">
         
         
         <p style={{color:'grey'}}> Recently added patient</p>

         <Table>
       
           <TableRow>
               <TableCell>ID</TableCell>
               <TableCell>Name</TableCell>
               <TableCell>Disease</TableCell>
           </TableRow>
       
         <TableBody>
         {t1}
         </TableBody>
         </Table>
     </div>
     <div className="recent-alerts">
      <p style={{color:'grey'}}>High Temperature and Disease Alerts</p>
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
              <p style={{color:'grey'}}> Moderate and low fever Alerts</p>
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
          </div>
        </div>
       
       
        </Scrollbars>
        </div>
    </div>
  )
}

export default DashboardDoc
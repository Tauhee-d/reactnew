import React from 'react'
import './DashboardDoc.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import {RecentPatient,RecentNotifications,RecentAlerts,RecentMessages} from './DahboardDoc'

const DashboardDoc = () => {

  const t1 = RecentPatient.map((data,i)=>{
   
    return(
      <>
           <tr key={i}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.disease}</td>
          </tr>
      </>
    )
  })
  const t2 = RecentNotifications.map((data,i)=>{
   
    return(
      <>
           <tr key={i}>
            <td>{data.id}</td>
            <td>{data.patient}</td>
            <td>{data.messsage}</td>
          </tr>
      </>
    )
  })
  const t3 = RecentAlerts.map((data,i)=>{
   
    return(
      <>
           <tr key={i}>
            <td>{data.id}</td>
            <td>{data.patientName}</td>
            <td>{data.temperature}</td>
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
          <SubTopbar/>
          Doctor Dashboard
        <div className='container-1'>  
          <div className="recent-patient">
              Recently added patient
              <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Disease</th>
                </tr>
              </thead>
              <tbody>
              {t1}
              </tbody>
              </table>
          </div>
          <div className="recent-notification">
              Recent notification
              <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Message</th>
                </tr>
              </thead>
              <tbody>
              {t2}
              </tbody>
              </table>
          </div>
        </div>  
        <div className='container-2'>  
          <div className="recent-alerts">
            Recent alerts
              <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
              {t3}
              </tbody>
              </table>
          </div>
          <div className="recent-messages">
              Recent messages
              <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Message</th>
                </tr>
              </thead>
              <tbody>
              {t4}
              </tbody>
              </table>
          </div>
        </div>  
        </div>
    </div>
  )
}

export default DashboardDoc
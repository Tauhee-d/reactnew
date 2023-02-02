import React from 'react'
import './DashboardDoc.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'

const DashboardDoc = () => {

  const Table = () => {
    return(
      <>
            <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Disease</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>01</td>
            <td>Eclair</td>
            <td>Diabetes</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Varun</td>
            <td>Cholestrol</td>
          </tr>
          <tr>
            <td>03</td>
            <td>Zab</td>
            <td>Kidney stone</td>
          </tr>
         
        </tbody>
      </table>

      </>
    )
  }
  return (
    <div className='DashboardDoc'>
        <div className="doc-left"><Navbar/></div>
        <div className="doc-right">
          <SubTopbar/>
          Doctor Dashboard
          <div className="recent-patient">
              Recently added patient
              <Table/>
          </div>
        </div>
    </div>
  )
}

export default DashboardDoc
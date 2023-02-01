import React from 'react'
import './DashboardDoc.css'
import Navbar from '../../components/Navbar/Navbar'

const DashboardDoc = () => {
  return (
    <div className='DashboardDoc'>
        <div className="doc-left"><Navbar/></div>
        <div className="doc-right">Doctor Dashboard</div>
    </div>
  )
}

export default DashboardDoc
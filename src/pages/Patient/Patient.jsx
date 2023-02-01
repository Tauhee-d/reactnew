import React from 'react'
import './Patient.css'
import Navbar from '../../components/Navbar/Navbar'

const Patient = () => {
  return (
    <div className="Patient">
        <div className="patient-left"><Navbar/></div>
        <div className="patient-right">Patient Page</div>
    </div>
  )
}

export default Patient
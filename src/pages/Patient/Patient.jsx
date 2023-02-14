import React from 'react'
import './Patient.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'

const Patient = () => {
  return (
    <div className="Patient">
        <div className="patient-left"><Navbar/></div>
        <div className="patient-right">
          <SubTopbar/>
          Patient Page
          </div>
    </div>
  )
}

export default Patient
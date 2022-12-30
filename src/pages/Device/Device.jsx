import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Topbar from '../../components/Topbar/Topbar'
import './Device.css'

const Device = () => {
    return (
        <>
<div className="Maincontainer" >
    <div className="leftBox">

    <Navbar/>
    </div>
    <div className="rightBox">
    <Topbar/>
   <div className="content">
    <h3>Devices</h3>
   </div>
      </div>
      </div>
    </>
    )
}

export default Device
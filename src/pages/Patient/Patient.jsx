import React from 'react'
import './Patient.css'
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import profile from '../../assets/img/profile.jpg'
import { roomData } from './Room1Data';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';



const Patient = () => {
    const roomProfile = roomData.map((data,i)=> {
        return(
            <>
             <div className="profile-container">
             <Link style={{textDecoration:'none'}} exact to="/profile">

            <img className='img' src={profile} alt="" />
            <div className="profile">
                <div>
                <span>
                   {data.name}
                </span>
                <span>
                    Patient Id:{data.patientId}
                </span>
                </div>
                <div>
                    <span>
                        Temp:{data.temp}
                    </span>
                    <span>
                        Devices
                    </span>
                    <span>
                        {data.device}   {data.deviceId}
                    </span>
                </div>
                <div>
                    <span>
                        Add Note
                        <input style={{height:'15px',width:"100px"}}></input>
                    </span>
                    <button>Visit patient page </button>
                </div>
            </div>
            </Link>
            </div>
            </>
        )
    })
  return (
        <div className="Maincontainer">
            <div className="leftBox">
            <Navbar/>

            </div>
            <div className="rightBox">
            <Scrollbars>

            {/* <Topbar/>  */}
            <SubTopbar/>
            {/* <div className="profile-container">
            <img src={profile} alt="" />
            <div className="profile">
                <div>
                <span>
                   Harshal Jones 
                </span>
                <span>
                    Patient Id:23546217
                </span>
                </div>
                <div>
                    <span>
                        Temp:98.6F
                    </span>
                    <span>
                        Devices
                    </span>
                    <span>
                        NV core   5657ghv6567
                    </span>
                </div>
                <div>
                    <span>
                        Add Note
                        <input style={{height:'15px',width:"100px"}}></input>
                    </span>
                    <button>Visit patient page </button>
                </div>
            </div>
            </div> */}
            <div className="profile-flex">

            {roomProfile}
            </div>
            </Scrollbars>
            


            </div>
        </div>
    )
}

export default Patient
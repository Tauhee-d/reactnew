import React from 'react'
import './Patient.css'
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import profile from '../../assets/img/profile.jpg'
// import { roomData1 } from './Room1Data';
import { roomData} from '../Rooms/RoomData'
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';



const Patient = () => {
    // const roomProfile = roomData.map((data,i)=> {
    //     return(
    //         <div key={i}>
    //             {/* <span>{data.device}</span> */}
    //             {data.patients.map((detail,index)=> {
    //                 return(
    //                     <div key={index}> 
    //                         <span>{detail.name}</span>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // })
    const roomProfile = roomData.map((data,i)=> {
        return(
            <>
             <div className="profile-container" key={i}>

            <img className='img' src={profile} alt="" />
        
        {data.patients.map((details)=>{
            return(
            <div className="profile" >
                
                <div>
                <span>
                   {details.name}
                </span>
                <span>
                    Patient Id:{details.deviceId}
                </span>
                </div>
                <div>
                    <span>
                        Temp:{details.temp}
                    </span>
                    <span>
                        Devices
                    </span>
                    <span>
                        {details.device}  {details.deviceId}
                    </span>
                </div>
                <div>
                   
                <Link style={{textDecoration:'none'}} exact to="/profile">
                 <button>Visit patient page </button>
                </Link>
                </div>
            </div>

            )
        })}

                     
                    
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
                {/* {roomData.map((data,i)=> {
                    return(
                        <div key={i}>
                            <span>{data.id}</span>
                            {data.patients.map((details,index)=>{
                                return(
                                    <div key={index}>
                                        <span>{details.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })} */}

            {roomProfile}
            </div>
            </Scrollbars>
            


            </div>
        </div>
    )
}

export default Patient
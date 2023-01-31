import React from 'react'
import './Patient.css'
import profile from '../../../assets/img/profile.jpg'
import { roomData1 } from './Room1Data';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';



const Patient = () => {
    
    const roomProfile = roomData1.map((data,i)=> {
        return(
            <>
             <div className="profile-container" key={i}>

        
      
                <div className="profile" >
                <img className='img' id='imgid' src={profile} alt="" />
                
                <div>
                <span>
                   {data.name}
                </span>
                <span>
                    Patient Id:{data.deviceId}
                </span>
                </div>
                <div>
                    <span>
                        Temp:{data.temp}
                    </span>
                    <span>
                        Devices
                    </span>
                    
                </div>
                <div>
                <span>
                        {data.device} 
                    </span>
                    <span>
                          {data.deviceId}
                    </span>
                </div>
                <div>
                   
                {/* <Link style={{textDecoration:'none'}} exact to="/profile"> */}
                 <button>Visit patient page </button>
                {/* </Link> */}
                </div>
            </div>

          

                     
                    
            </div>
            </>
        )
    })

  return (
        
        <div className="Maincontainer">
           
            <div className="rightBox">
            <Scrollbars>

            
            <div className="profile-flex">
              

            {roomProfile}
            </div>
            </Scrollbars>
            


            </div>
        </div>
       
    )
}

export default Patient
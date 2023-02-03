import React from 'react'
import './Patient.css'
import profile from '../../../assets/img/profile.jpg'
import { roomData1 } from './Room1Data';
import SubTopbar  from '../../../components/SubTopbar/SubTopbar'
import { Scrollbars } from 'react-custom-scrollbars';
import { Link,useHistory } from 'react-router-dom';



const Patient = ({state}) => {
    const history = useHistory()

    const handleClick = () => {
        state(3)
    }
    const backButton = () => {
        state(1)
    }

    
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
                 <button onClick={handleClick}>Visit patient page </button>
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
             <SubTopbar/>   

            {/* <button onClick={() => history.goBack}>Go Back</button> */}
            <button className='back-button' onClick={backButton}>Go Back</button>
     

            <div className="profile-flex">
              {roomProfile}
            </div>
            </Scrollbars>
            


            </div>
        </div>
       
    )
}

export default Patient
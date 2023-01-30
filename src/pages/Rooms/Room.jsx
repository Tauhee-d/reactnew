import './room.css'
import { BsFillPersonFill } from 'react-icons/bs';
import { TbDeviceLaptop } from 'react-icons/tb';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import { Scrollbars } from 'react-custom-scrollbars';
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import {roomData} from './RoomData'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import profile from '../../assets/img/profile.jpg'



const Rooms = () => {

    const [selectedRoom, setSelectedRoom] = useState(null)
    const [show, setShow] = useState(true);

   
 

const Room = roomData.map((data)=> {
  const handleOnClick = () => {
    setSelectedRoom(data)
    setShow(!show)
  }
    return(
      <>

{show && 
<div>
          
          
        <div key={data._id} className='room-card' onClick={handleOnClick} 
        style={{ cursor:'pointer'}} > 

        <Card variant='outlined' style={{margin:'30px'}} className='card-style'>
         <React.Fragment>
          <CardContent>
            <Typography fontSize={'20px'} textAlign={'center'} color="text.secondary" backgroundColor={' #007bff'} padding={'8px'}  gutterBottom>
              {data._id}
            </Typography>

            <Typography variant="p" sx={{ mt: 2 }} component="div">
              Patients <span style={{marginLeft:'130px'}}>{data.patient}</span>
            </Typography>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              Devices 
            </Typography>
            <Typography variant="body2">
              <span style={{marginLeft:'10px'}}>{data.device}</span>   <span style={{marginLeft:'50px'}}>{data.activecount}</span> <span style={{color:'green', marginLeft:'50px'}}>{data.activestatus}</span>
             
            </Typography>
            <Typography variant="body2">
              <span style={{marginLeft:'10px'}}>{data.device}</span>   <span style={{marginLeft:'50px'}}>{data.deactivecount}</span> <span style={{color:'red', marginLeft:'50px'}}>{data.deactivestatus}</span>
             
            </Typography>
          </CardContent>
         
        </React.Fragment>
        </Card>
           
        </div>
          </div>
          }

      
        {selectedRoom && (
          <div className='patient-details'>
            {data.patients.map((details)=>{
              return(
                <div key={details.id} >
                  <img id='profile-img' src={profile} alt="" width={'80px'} height={'80px'} />
                  <span>{details.name}</span>
                  <span>Patient Id:{details.patientId}</span>
                  <span>Temp:{details.temp}</span>
                  <span>Devices</span>
                  <div>
                  <span>{details.device}</span>
                  <span>{details.deviceId}</span>
                  </div>
                  <Link className='profile-btn' style={{textDecoration:'none'}} exact to="/profile">
                 <button >Visit patient page </button>
                </Link>
                </div>
              )
            })}
          </div>
        )}

      </>
        
    )
})
console.log(roomData);



    return (

        <>
        <div className="Maincontainer">
            <div className="leftBox">
                <Navbar/>
            </div>
            <div className="rightBox">
            <Scrollbars>

               <SubTopbar/>

               <div id='Rooms'>
             
               {Room}
               </div>
              
            
        
            </Scrollbars>

            </div>

            </div>
        </>

    );
}

export default Rooms;












import './room.css'
import Navbar from '../../../components/Navbar/Navbar';
import { Scrollbars } from 'react-custom-scrollbars';
import SubTopbar from '../../../components/SubTopbar/SubTopbar'
import {roomData} from './RoomData'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import Patient from '../Patient/Patient';
import Profile from '../PatientProfile/Profile';



const Rooms = ({state}) => {

  // const [state, setState] = useState(1);

  // const handleClick1 = () => {
  //   setState(2);
  // };

  // const handleClick2 = () => {
  //   setState(3);
  // };

   const handleClick = () => {
    state(2)
   }
 

const Room = roomData.map((data)=> {
  
    return(
      <>


<div>
          
          
        <div key={data.id} className='room-card' style={{ cursor:'pointer'}} onClick={handleClick} > 

        <Card variant='outlined' style={{margin:'30px'}} className='card-style'>
         <React.Fragment>
          <CardContent>
            <Typography fontSize={'20px'} textAlign={'center'} color="text.secondary" backgroundColor={' #007bff'} padding={'8px'}  gutterBottom>
              {data.id}
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
          

      
        
         

      </>
        
    )
})
console.log(roomData);



    return (

        <>
        <div className="rooms">
           
            <div className="rightRoom">
            <Scrollbars>

               <SubTopbar/>

               {/* <div >
             {state === 1 && (
             <div id='Rooms-flex' onClick={handleClick1}>{Room}</div>
               )}
               
               </div>
               {state ===2 && (
                <div onClick={handleClick2}><Patient/>
                </div>
               )}
              {state === 3 && (
                <div><Profile/></div>
              )} */}
              {Room}
            
        
            </Scrollbars>

            </div>

            </div>
        </>

    );
}

export default Rooms;












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



const Rooms = () => {

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
      const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      );



const Room = roomData.map((data,i)=> {
    return(
        <div key={i} className='room-card' > 
                <Link style={{textDecoration:'none'}} exact to="/patient">

        <Card variant='outlined' style={{margin:'30px'}} className='card-style'>
         <React.Fragment>
          <CardContent>
            <Typography fontSize={'20px'} textAlign={'center'} color="text.secondary" backgroundColor={' #007bff'} padding={'8px'}  gutterBottom>
              {data.title}
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
        </Link>
            {/* <div className="Rooms" >
                <div className="container" >
                    <div className="row row-cols-3" >
                        <div className="col" >
                            <div className="roomsContent">
                                <nav><h3 className='titlep'>{data.title}</h3></nav>
                                <div className="patients">
                                    <div className="totalPatients">
                                        <div className="tph">
                                            <h6 >Patients</h6>
                                            <span className='tp'>{data.patient}</span>
                                        </div>
                                        <div className="apd">
                                            <div className="AddPatients">
                                                <a href="/" className='ap'><BsFillPersonFill />  Add Patients</a>
                                            </div>

                                            <div className="AddDevices">
                                                <a href="/" className="ad"><TbDeviceLaptop />  Add Devices</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="Devices">
                                    <h6>Devices</h6>
                                    <div className="DeviceContent">
                                        <span className='dc'><h6>{data.device}</h6>
                                            <span className='count'>{data.count}</span>
                                            <span className="status">{data.status}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                       

                    </div>

                </div>
            </div> */}
       
        </div>
    )
})
console.log(roomData);



    return (

        <>
        <div className="Maincontainer">
            {/* <div className="leftBox"> */}
                {/* <Navbar/> */}
            {/* </div> */}
            {/* <div className="rightBox"> */}
            {/* <Scrollbars> */}

               {/* <SubTopbar/> */}

               <div id='Rooms'>
               {/* <Box sx={{ minWidth: 275 }}> */}
      {/* <Card variant="outlined">{Room}</Card> */}
    {/* </Box> */}
               {Room}
               </div>
              
            
        
            {/* </Scrollbars> */}

            {/* </div> */}

            </div>
        </>

    );
}

export default Rooms;












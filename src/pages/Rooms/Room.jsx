import './room.css'
import { BsFillPersonFill } from 'react-icons/bs';
import { TbDeviceLaptop } from 'react-icons/tb';
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import { Scrollbars } from 'react-custom-scrollbars';
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import {roomData} from './RoomData'

const Rooms = () => {

const Room = roomData.map((data,i)=> {
    return(
        <div key={i} > 
            <div className="Rooms" >
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
            </div>
       
        </div>
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

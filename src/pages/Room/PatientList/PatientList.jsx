import React, { useState } from "react";
import "./PatientList.css";
import profile from "../../../assets/img/profile.jpg";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate,useLocation } from "react-router-dom";
import { students,PatientList } from "../RoomData";
import Navbar from "../../../components/Navbar/Navbar";


const Patient = () => {
  
 

  
  const history = useNavigate();
  const location = useLocation()
  const ID = location.state.id
    const patientList = PatientList.filter(student => student.roomId === ID);
    // const studentList = students.filter(student => student.roomId === ID);


     // search 
  const [query,setQuery] = useState('')
  const filteredData = patientList.filter((item) =>
  item.device.toLowerCase().includes(query.toLowerCase())
);
  

    const handleClick = () => {
      window.history.back()
    }

  const roomProfile = students.map((data, i) => {
    return (
      <>
        <div className="profile-container" key={i}>
          <div className="profile">
            <img className="img" id="imgid" src={profile} alt="" />

            <div>
              <span>{data.name}</span>
              <span>Patient Id:{data.deviceId}</span>
            </div>
            <div>
              <span>Temp:{data.temp}</span>
              <span>Devices</span>
            </div>
            <div>
              <span>{data.device}</span>
              <span>{data.deviceId}</span>
            </div>
            <div>
              {/* <button onClick={handleClick}>Visit patient page </button> */}
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="Maincontainer">
      <div className="leftBox"><Navbar/></div>
      <div className="rightBox">
        <Scrollbars>
          <SubTopbar />
            
          <button className='back-button' onClick={handleClick}>Go Back</button>
          <div className="search">
            <input type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)} />
           
          </div>
         


          <div className="profile-flex">
            {/* {roomProfile} */}
            {/* {studentList.map(student => (  
        <li key={student.id} onClick={() => history('/PatientProfile',{state:{id:student.id}})}>
          {student.name}
        </li>
      ))} */}
      
          
              { filteredData.map((data) => {
    return (
      <>
        <div className="profile-container" key={data.id}>
          <div className="profile">
            <img className="img" id="imgid" src={profile} alt="" />

            <div>
              <span>{data.name}</span>
              <span>Patient Id:{data.deviceId}</span>
            </div>
            <div>
              <span>Temp:{data.temp}</span>
              <span>Devices</span>
            </div>
            <div>
              <span>{data.device}</span>
              <span>{data.deviceId}</span>
            </div>
            <div>
              <button style={{cursor:'pointer'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>Visit patient page </button>
            </div>
          </div>
        </div>
      </>
    )
  })}



          
            {/* <div className="profile-container" >

        
      
              
 <div className="profile-container" >

        
      
 <div className="profile" >
 <img className='img' id='imgid' src={profile} alt="" />
 
 <div>
 <span>
    {currentItem.name}
 </span>
 <span>
     Patient Id:{currentItem.deviceId}
 </span>
 </div>
 <div>
     <span>
         Temp:{currentItem.temp}
     </span>
     <span>
         Devices
     </span>
     
 </div>
 <div>
 <span>
         {currentItem.device} 
     </span>
     <span>
           {currentItem.deviceId}
     </span>
 </div>
 <div>
    
  <button onClick={handleClick}>Visit patient page </button>
 </div>
</div>



      
     
</div>




     
    
</div> */}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Patient;

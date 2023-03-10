import React from "react";
import "./Patient.css";
import profile from "../../../assets/img/profile.jpg";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { Scrollbars } from 'react-custom-scrollbars-2';
// import { useParams } from "react-router-dom";
import { PatientList } from "../Room/RoomData";

const Patient = ({ state, id }) => {
//   const { folderid } = useParams();
//   console.log("patienturlid", folderid);
//   const currentItem = RoomData1.filter((item) => item.roomId === folderid)[0];

  // const selectedData = roomData1.find((item) => item.id === idd);

  // console.log("selectedIdidddd",idd);

  const handleClick = () => {
    state(3);
  };
  const backButton = () => {
    state(1);
  };

  const roomProfile = PatientList.map((data, i) => {
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
              {/* <Link style={{textDecoration:'none'}} exact to="/profile"> */}
              <button onClick={handleClick}>Visit patient page </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="Maincontainer">
      <div className="rightBox">
        <Scrollbars>
          <SubTopbar />

          {/* <button onClick={() => history.goBack}>Go Back</button> */}
          <button className="back-button" onClick={backButton}>
            Go Back
          </button>

          <div className="profile-flex">
            {roomProfile}
            {/* <div>Selected item id: {id}</div> */}
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

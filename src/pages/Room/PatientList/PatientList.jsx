import React, { useState,useEffect } from "react";
import "./PatientList.css";
import profile from "../../../assets/img/profile.jpg";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate,useLocation } from "react-router-dom";
import { students,PatientList } from "../RoomData";
import Navbar from "../../../components/Navbar/Navbar";
import Alert from "../../../components/Alert/Alert";
import {db} from '../../../firebase'




const Patient = () => {
  
 

  
  const history = useNavigate();
  const location = useLocation()
  const ID = location.state.id
  const firebaseData = db.collection('patients').get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const r = doc.data()
      
      console.log(doc.id, ' => ', doc.data());
    });
  })
  .catch(error => {
    console.log('Error getting documents: ', error);
  });


  
  
    const [documents, setDocuments] = useState([]);
  
    useEffect(() => {
      db.collection('patients').onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(data);
        // console.log("object",documents);
      });
    }, []);

    const patientList = documents.filter(patient => patient.roomID === ID);
    // const patientList = PatientList.filter(student => student.roomId === ID);


     // search 
  const [query,setQuery] = useState('')
  const filteredData = patientList.filter((item) =>
  item.deviceName.toLowerCase().includes(query.toLowerCase())
);
  

    const handleClick = () => {
      window.history.back()
    }

  


  









  return (
    <div className="Maincontainer">
      <div className="leftBox"><Navbar Alert={<Alert/>}/></div>
      <div className="rightBox">
        <Scrollbars>
          <SubTopbar />
            
          <button className='back-button' onClick={handleClick}>Go Back</button>
          <div className="search">
            <input type="text" placeholder="search" value={query} onChange={e => setQuery(e.target.value)} />
           
          </div>
         


          <div className="profile-flex">
           
      
          
              {/* { patientList.map((data) => { */}
               { filteredData.map((data) => {
    return (
      <>
        <div className="profile-container" key={data.id}>
          <div className="profile">
            <img className="img" id="imgid" src={profile} alt="" />

            <div>
              <span>{data.fName} {data.lName}</span>
              <span>Patient Id:{data.pID}</span>
            </div>
            <div>
              <span>Temp:{data.temp}</span>
              <span>Devices</span>
            </div>
            <div>
              <span>{data.deviceName}</span>
              <span>{data.deviceID}</span>
            </div>
            <div>
              <button style={{cursor:'pointer'}} onClick={() => history('/PatientProfile',{state:{id:data.id}})}>Visit patient page </button>
            </div>
          </div>
        </div>
      </>
    )
  })}



          
         
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Patient;

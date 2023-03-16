import React,{useEffect,useState,useContext} from 'react'
import './Attachments'
import Navbar from '../../../components/Navbar/Navbar'
import SubTopbar from '../../../components/SubTopbar/SubTopbar'
import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";


const Attachments = ( ) => {
    // const { ID } = props;
   const ID =  sessionStorage.getItem('id')
console.log("object1111111",ID)

const [patientData, setPatientData] = useState(null);
useEffect(() => {
  const fetchPatientData = async () => {
    const patientRef = firebase.firestore().collection("patients").doc(ID);
    const patientData = await patientRef.get();
    setPatientData(patientData.data());
  };
  fetchPatientData();
}, [ID]);
  
   

    return (
    <div style={{display:'flex'}}>
        <div style={{flex:1}} className="Attach-left"><Navbar/></div>
        <div style={{flex:7}} className="Attach-right"><SubTopbar/>
        
<div style={{width:'850px',}}>


        {patientData && patientData.images && patientData.images.map((image) => (
                                    <img key={image.id} width={300} height={200} src={image.url} alt="patient image" />
                                  ))}
</div>


        </div>
    </div>
  )
}

export default Attachments
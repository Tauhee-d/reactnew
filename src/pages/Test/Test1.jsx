import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import './Test1.css'
import { useLocation ,useHistory,useParams} from 'react-router-dom';
import { TestData1 } from './TestData';


const Test1 = () => {
    // const [id, setId] = useState(null);
    const navigate = useHistory()
    // const handleClick = (id) => {
    //   setId(id);
    //   console.log("first",setId)
    //   navigate.push(`/test2?id=${id}`)
    // }

    const { roomId } = useParams();
    const patientList = TestData1.filter(patient => patient.roomId === parseInt(roomId, 10));



  //   const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const Id = query.get('id');
  // const currentItem = TestData1.filter(item => item.roomId === Id)[0];
 
  return (
    <div className='test1-container'>
         <div className='test1-left'><Navbar/></div>
        <div className='test1-right'>
            <SubTopbar/>
            <div>

             {/* <div key={currentItem.id} onClick={()=> handleClick(currentItem.id)}>Selected item ID: {currentItem.name}</div> */}
             <ul>
      {patientList.map(patient => (
        <li key={patient.id} onClick={() => navigate.push(`/test2/${patient.id}`)}>
          {patient.name}
        </li>
      ))}
    </ul>
            </div>
            

        </div>
    </div>
  )
}

export default Test1
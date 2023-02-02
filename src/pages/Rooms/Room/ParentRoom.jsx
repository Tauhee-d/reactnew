import React,{useState} from 'react'
import Rooms from './Room'
import Profile from '../PatientProfile/Profile'
import Patient from '../Patient/Patient'
import './ParentRoom.css'
import Navbar from '../../../components/Navbar/Navbar'

const ParentRoom = () => {
    // const [state , setState] = useState(1)
    // const handleClick1 = () => {
    //     setState(2)
    // }
    // const handleClick2 = () => {
    //     setState(3)
    // }
    const [page , setPage] =useState(1)
  return (
    <div className='parentRoom'>
            <div className="left-parent">
                <Navbar/>
            </div>
            <div className="right-parent">
                {/* {state === 1 && (
                    <div onClick={handleClick1}><Rooms/></div>
                )}
                {state === 2 && (
                    <div onClick={handleClick2}><Patient/></div>
                )}
                {state === 3 && (
                    <div ><Profile/></div>
                )} */}
                {page === 1?<Rooms state={setPage}/>:page ===2?<Patient state={setPage}/>:<Profile state={setPage}/>}
            </div>
    </div>
  )
}

export default ParentRoom
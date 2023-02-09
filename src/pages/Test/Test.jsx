import React from 'react'
import './Test.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import { TestData } from './TestData'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
const Test = () => {
  // const [id, setId] = useState(null);

  const navigate = useHistory()
  // const handleClick = (id) => {
  //   setId(id);
  //   navigate.push(`/test1?id=${id}`)
  // }
  return (
    <div className='test-container'>
        
        <div className='test-left'><Navbar/></div>
        <div className='test-right'>
            <SubTopbar/>
            <ul >
      {TestData.map(room => (
        <li key={room.id} onClick={() => navigate.push(`/test1/${room.id}`)}>
          {room.room}
        </li>
      ))}
    </ul>

        </div>
    </div>
  )
}

export default Test
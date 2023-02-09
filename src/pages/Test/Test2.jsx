import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import './Test2.css'
import { useLocation } from 'react-router-dom';
import { TestData2 } from './TestData';


const Test2 = () => {
    const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  const currentItem = TestData2.filter(item => item.patient === id)[0];
 
  return (
    <div className='test2-container'>
         <div className='test2-left'><Navbar/></div>
        <div className='test2-right'>
            <SubTopbar/>
             <div key={currentItem.id}>Selected item ID: {currentItem.name}</div>
            

        </div>
    </div>
  )
}

export default Test2
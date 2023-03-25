import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Nurse.css'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import getUsers from '../../Firebase/firebaseControllers/Users'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { db } from '../../Firebase/firebase'
import firebase from 'firebase/app';
import NurseList from './NurseList'

const Nurse = () => {

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers()
            setUsers(data)
        }
        fetchData()
    }, [])

    const [users, setUsers] = useState([])


    


    
      
          
     
        const [editItem, setEditItem] = useState(null);




        const [edit,setEdit]= useState(false) 
   

    

    return (
        <div className='Nurse-Container'>
            <div className="Nurse-left">
                <Navbar />
            </div>
            <div className="Nurse-right">
                <SubTopbar />
                <NurseList/>
              
            </div>
        </div>
    )
}

export default Nurse

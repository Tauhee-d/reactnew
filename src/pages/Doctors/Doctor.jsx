import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Doctor.css'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import getUsers from '../../Firebase/firebaseControllers/Users'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { db } from '../../Firebase/firebase'
import firebase from 'firebase/app';
import EditDoc from './EditDoc'
import DocList from './DocList'

const Doctor = () => {

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers()
            setUsers(data)
        }
        fetchData()
    }, [])

    const [users, setUsers] = useState([])


    


    // const deleteUser = async (ID) => {
    //     await firebase.firestore().collection("users").doc(ID).delete();
    //     console.log("Patient data deleted successfully!");
    //   };
      
          
     
        const [editItem, setEditItem] = useState(null);




        const [edit,setEdit]= useState(false) 
   

   

    return (
        <div className='Doc-Container'>
            <div className="Doc-left">
                <Navbar />
            </div>
            <div className="Doc-right">
                <SubTopbar />
                <DocList/>
                {/* <Table>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Delete</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                    <TableBody>
                        {docList}
                    </TableBody>
                </Table> */}
            </div>
        </div>
    )
}

export default Doctor

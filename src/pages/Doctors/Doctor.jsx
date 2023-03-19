import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Doctor.css'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import getUsers from '../../Firebase/firebaseControllers/Users'
import { useState,useEffect } from 'react'
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";

const Doctor = () => {

    const [users,setUsers]=useState('')
    useEffect(() => {
     const fetchData = async () => {
        const data = await getUsers()
        setUsers(data)
     }
     fetchData()
    }, [])
    console.log("first",users)

   
    const docList = users.map((data,i)=> {
        return (
            <>
            <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.firstName}{data.lastName}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.role}</TableCell>
            </TableRow>
            </>
        )
    })
    
   
    
  return (
    <div className='Doc-Container'>
        <div className="Doc-left">
            <Navbar/>
        </div>
        <div className="Doc-right">
            <SubTopbar/>
                 <Table>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                    <TableBody>
                        {docList}
                    </TableBody>
                 </Table>
             
           


        </div>
    </div>
  )
}

export default Doctor
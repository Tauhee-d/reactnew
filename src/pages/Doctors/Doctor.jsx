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
          const data = await getUsers();
          setUsers(data);
        };
        fetchData();
      }, []);
      console.log("object",users)


    const data = users.map((data => {
        return(
            <>
            <TableCell>{data.id}</TableCell>
                        <TableCell>{data.firstName}{data.lastName}</TableCell>
            </>
        )
    }))
    
  return (
    <div className='Doc-Container'>
        <div className="Doc-left">
            <Navbar/>
        </div>
        <div className="Doc-right">
            <SubTopbar/>
            <div>

           {users.map((data => {
            return(
                <>
                <Table>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Doctor</TableCell>
                    </TableRow>
                    <TableBody>
                        {/* <TableCell>{data.id}</TableCell>
                        <TableCell>{data.firstName}{data.lastName}</TableCell> */}
                        {data}
                    </TableBody>
                </Table>
                {/* <p>{data.id}</p> */}
                </>
            )
           }))}

            </div>


        </div>
    </div>
  )
}

export default Doctor
import { IconButton, Typography,Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/system/Unstable_Grid/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useState } from 'react';
import { db } from '../../Firebase/firebase';
import firebase from '@firebase/app';
import getUsers from '../../Firebase/firebaseControllers/Users';
import Swal from 'sweetalert2'
 


const AddDoc = ({closeEvent}) => {
    const [id,setId] = useState('')
    const [hospitalId,setHospitalId] = useState('')
    const [lastName,setLastName] = useState('')
    const [firstName,setFirstName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    const [rows, setRows] =useState([]);




    const createUser = async(event) => {
        event.preventDefault();
    
        if (
           
          !email ||
          !id ||
          !lastName ||
          !firstName ||
          !role ||
          !hospitalId
        ) {
          console.log("Please fill in all fields.");
          return;
        }
        db.collection("users")
          .add({
            email,id,lastName,firstName,role,hospitalId,
            addedOn: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            closeEvent()
            Swal.fire("Added Sucessfully!")
            getUsers()
           
          })
          .catch((error) => {
            console.error("Error sending message to Firestore: ", error);
          });
      };



  return (
    <div>
      <Box sx={{m:2}}/>
      <Typography>
        Add Doctor
      </Typography>
      <IconButton style={{position:'absolute',top:'0',right:'0'}} onClick={closeEvent}>
        <CloseIcon/>
      </IconButton>
      <Box height={20}/>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField id="outlined-basic" label="id" variant="outlined" size='small' sx={{minWidth:'100%'}} value={id} onChange={(e) => setId(e.target.value)} />
        </Grid>
      <Grid item xs={6}>
        <TextField id="outlined-basic" label="hospitalId" variant="outlined" size='small' sx={{minWidth:'100%'}} value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} />
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" label="firstName" variant="outlined" size='small' sx={{minWidth:'100%'}} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </Grid>
        <Grid item xs={6}>
        <TextField id="outlined-basic" label="lastName" variant="outlined" size='small' sx={{minWidth:'100%'}} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="email" variant="outlined" size='small' sx={{minWidth:'100%'}} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="role" variant="outlined" size='small' sx={{minWidth:'100%'}} value={role} onChange={(e) => setRole(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
            <Typography>
                <Button onClick={createUser}>Submit</Button>
            </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddDoc

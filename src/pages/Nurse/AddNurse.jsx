import { IconButton, Typography,Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/system/Unstable_Grid/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useState } from 'react';
import { db } from '../../Firebase/firebase';
import firebase from '@firebase/app';
import { auth } from '../../Firebase/firebase';
import getUsers from '../../Firebase/firebaseControllers/Users';
import Swal from 'sweetalert2'
 


const AddNurse = ({closeEvent}) => {
 


    const [rows, setRows] =useState([]);




    
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);

      
        const createUser = async (e) => {
          e.preventDefault();

          if (!email || !password || !firstName || !lastName) {
            setError('Please fill in all required fields');
            return;
          }

          try {
            // const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // await firebase.firestore().collection('users').doc(user.uid).set({ firstName,lastName,email, role: 'nurse',hospitalID:'123456',id:user.uid });
            // console.log('nurse created successfully');
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
              const userData = {
                firstName,
                lastName,
                email,
                role: 'nurse',
                hospitalID: '123456',
                userID: user.uid // add user ID field
              };
              await firebase.firestore().collection('users').doc(user.uid).set(userData);
              console.log('nurse created successfully');
            console.log("first",user)
            closeEvent()
            Swal.fire("Added Sucessfully!")
          
            const data = await getUsers()
            setRows(data)
          } catch (error) {
            console.error('Error creating user', error);
          }
        };
      



    


  return (
    <div>
      <Box sx={{m:2}}/>
      <Typography>
        Add Nurse
      </Typography>
      <IconButton style={{position:'absolute',top:'0',right:'0'}} onClick={closeEvent}>
        <CloseIcon/>
      </IconButton>
      <Box height={20}/>
      <Grid container spacing={2}>
          <Grid item xs={6}>
        <TextField id="outlined-basic" label="firstName" variant="outlined" size='small' sx={{minWidth:'100%'}} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Grid>
          <Grid item xs={6}>
        <TextField id="outlined-basic" label="lastName" variant="outlined" size='small' sx={{minWidth:'100%'}} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Grid>
          <Grid item xs={12}>
        <TextField id="outlined-basic" label="email" variant="outlined" size='small' sx={{minWidth:'100%'}} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
        <TextField id="outlined-basic" label="password" variant="outlined" size='small' sx={{minWidth:'100%'}} value={password} onChange={(e) => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
            <Typography>
                <Button onClick={createUser}>Submit</Button>
                {error && <p style={{color:'red'}} >{error}</p>}

            </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddNurse

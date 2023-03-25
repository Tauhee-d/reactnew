import React, { useState,useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import Navbar from '../Navbar/Navbar'
import SubTopbar from '../SubTopbar/SubTopbar'
import firebase from 'firebase';
import { TextField, Button,Modal, makeStyles,Box,Typography } from '@material-ui/core';
import Swal from "sweetalert2";
import { db } from '../../Firebase/firebase';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      margin: theme.spacing(2),
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Profile = () => {

  const [userId, setUserId] = useState(" ");


    // profile image

    const handleProfilePictureChange = (event) => {
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`users/${userId}/profilePicture.jpg`);
    
      storageRef.put(file).then(() => {
        console.log('Image uploaded successfully');
        storageRef.getDownloadURL().then((url) => {
          console.log('Download URL:', url);
          // save the URL in Firestore for the user
          db.collection('users').doc(userId).update({ profilePicture: url }).then(() => {
            console.log('Profile picture URL saved in Firestore');
          }).catch((error) => {
            console.error('Error saving profile picture URL in Firestore', error);
          });
        }).catch((error) => {
          console.error('Error getting download URL', error);
        });
      }).catch((error) => {
        console.error('Error uploading image', error);
      });
    };

    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
      db.collection('users').doc(userId).onSnapshot((doc) => {
        const data = doc.data();
        if (data && data.profilePicture) {
          setProfilePicture(data.profilePicture);
        }
      });
    }, [userId]);
    











    
    // const UserID = sessionStorage.getItem("userID");
    // const Name = sessionStorage.getItem("name");


    // edit form
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };

   
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [pEmail, setPEmail] = useState('');
    const [qualification, setQualification] = useState('');

  
    const Name = sessionStorage.getItem("name");
    useEffect(() => {
      
      const userId1 = sessionStorage.getItem("userID");
        setUserId(userId1);
      }, []);
    console.log("fyvhvhhg",userId)
    useEffect(() => {
      if (userId) {
        // Fetch the user's existing age and address data when the user ID is available
        const firestore = firebase.firestore();
        const userDocRef = firestore.collection('users').doc(userId);
        userDocRef.get().then((doc) => {
          const userData = doc.data();
          setAge(userData.age || '');
          setGender(userData.gender || '');
          setSpeciality(userData.speciality || '');
          setAddress(userData.address || '');
          setPhone(userData.phone || '');
          setPEmail(userData.pEmail || '');
          setQualification(userData.qualification || '');
        });
      }
    }, [userId]);
      // edit form
      const handleAgeChange = (event) => {
        setAge(event.target.value);
      };
      const handleGenderChange = (event) => {
        setGender(event.target.value);
      };
      const handleSpecialityChange = (event) => {
        setSpeciality(event.target.value);
      };      
      const handleAddressChange = (event) => {
        setAddress(event.target.value);
      };
      const handlePhoneChange = (event) => {
        setPhone(event.target.value);
      };
      const handlePEmailChange = (event) => {
        setPEmail(event.target.value);
      };
      const handleQualificationChange = (event) => {
        setQualification(event.target.value);
      };
     
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (userId) {
          // Update the user's age and address data in Firestore
          const firestore = firebase.firestore();
          const userDocRef = firestore.collection('users').doc(userId);
          userDocRef.set({
            age,
            gender,
            speciality,
            address,
            phone,
            pEmail,
            qualification,

          }, { merge: true });
            Swal.fire("Uploaded Sucessfully!");
           handleClose(true)
        }
      };

  
  



  
  
  
  return (
    <div style={{display:'flex'}}>
    <div style={{flex:1.5}}>
      <Navbar />
    </div>
    <div style={{flex:8}}>
      <SubTopbar />
      <div style={{padding:'10px'}}>
        <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
            <div style={{display:'flex'}}>
        <div>
          
          <Avatar src={profilePicture}  style={{marginLeft:'23px'}} />
          <input
            accept="image/*"
            type="file"
            id="profile-picture-input"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
          <label htmlFor="profile-picture-input">
            <IconButton component="span">
              {/* <PhotoCamera  /> */}
              <span style={{fontSize:'10px', fontWeight:'bold'}}>Edit Profile</span>
            </IconButton>
          </label>

            </div>
            <div style={{fontSize:'30px'}}>Dr.{Name}</div>
            </div>
            <div>
                
                <span className="add-btn" onClick={handleOpen}>
                Edit Info
                  </span>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                   
                
                  <form onSubmit={handleSubmit} className={classes.root}>
                 
                    <TextField label="Age" name="age" value={age} onChange={handleAgeChange} fullWidth />
                    <TextField label="Gender" name="gender" value={gender} onChange={handleGenderChange} fullWidth />
                    <TextField label="Speciality" name="speciality" value={speciality} onChange={handleSpecialityChange} fullWidth />
                    <TextField label="Address" name="address" value={address} onChange={handleAddressChange} fullWidth />
                    <TextField label="Phone" name="phone" value={phone} onChange={handlePhoneChange} fullWidth />
                    <TextField label="Personal Email" name="pEmail" value={pEmail} onChange={handlePEmailChange} fullWidth />
                    <TextField label="Qualification" name="qualification" value={qualification} onChange={handleQualificationChange} fullWidth />
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </form>
                  </Box>
                </Modal>

            </div>
        </div>
        <hr/>
            <div style={{display:'flex'}}>
            <div style={{flex:'1'}}>
          
               
                <div key={pEmail}>
                  <span style={{fontWeight:"bold"}}>General Information</span>
                
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Age</p><p style={{fontSize:'14px'}}>{age}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Gender</p><p style={{fontSize:'14px'}}>{gender}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Speciality</p><p style={{fontSize:'14px'}}>{speciality}</p>
                  </div>
                  <span style={{fontWeight:"bold"}}>Contact Information</span>

                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Address</p><p style={{fontSize:'14px'}}>{address}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Phone</p><p style={{fontSize:'14px'}}>{phone}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Personal Email</p><p style={{fontSize:'14px'}}>{pEmail}</p>
                  </div>
                
                </div>
              
       
                
            </div>
            <div className="vertical-line"></div>

            <div style={{flex:'1'}}>
              <div style={{marginLeft:'10px'}}>

              <span style={{fontWeight:"bold"}}>Additional Information</span>
              </div>

            </div>
            </div>
      </div>
    </div>
  </div>
  )
}

export default Profile






















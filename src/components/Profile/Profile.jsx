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

    // profile image
    const [profilePicture, setProfilePicture] = useState('');

    const handleProfilePictureChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
  
      reader.readAsDataURL(file);
    };

    const UserID = sessionStorage.getItem("userID");
    const Name = sessionStorage.getItem("name");


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

    const [profile, setProfile] = useState({
      age: '',gender:'',pEmail:'',phone:'',speciality:'', address: '', qualification: '' });
  
    useEffect(() => {
      const fetchProfile = async () => {
        const profileRef = firebase.firestore().collection('profiles').doc(UserID);
        const profileDoc = await profileRef.get();
        if (profileDoc.exists) {
          setProfile(profileDoc.data());
        }
      };
  
      fetchProfile();
    }, [UserID]);
  
    const handleChange = (e) => {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const profileRef = firebase.firestore().collection('profiles').doc(UserID);
  //   await profileRef.set(profile, { merge: true });
  //   alert('Profile updated successfully!');
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Upload the profile picture to Firebase Storage
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${UserID}/profilePicture`);
    await fileRef.putString(profilePicture, 'data_url');
  
    // Update the profile data in Firestore
    const profileRef = firebase.firestore().collection('profiles').doc(UserID);
    await profileRef.set({
      ...profile,
      profilePicture: await fileRef.getDownloadURL(), // Add the download URL of the uploaded image to Firestore
    }, { merge: true });
  
    Swal.fire("Uploaded Sucessfully!");
    handleClose(true)
  };



  // fetching profile data from firestore
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = firebase.firestore().collection("profiles");
    collectionRef.get().then((querySnapshot) => {
      const newData = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const item = {
          image: docData.image,
          age: docData.age,
          gender: docData.gender,
          pEmail: docData.pEmail,
          phone: docData.phone,
          speciality: docData.speciality,
          address: docData.address,
          qualification: docData.qualification,
        };
        newData.push(item);
      });
      setData(newData);
    });
  }, []);
  
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
                    <TextField label="Age" name="age" value={profile.age} onChange={handleChange} fullWidth />
                    <TextField label="Gender" name="gender" value={profile.gender} onChange={handleChange} fullWidth />
                    <TextField label="Speciality" name="speciality" value={profile.speciality} onChange={handleChange} fullWidth />
                    <TextField label="Address" name="address" value={profile.address} onChange={handleChange} fullWidth />
                    <TextField label="Phone" name="phone" value={profile.phone} onChange={handleChange} fullWidth />
                    <TextField label="Personal Email" name="pEmail" value={profile.pEmail} onChange={handleChange} fullWidth />
                    <TextField label="Qualification" name="qualification" value={profile.qualification} onChange={handleChange} fullWidth />
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
            {data.map((row) => {
              return (
                <div key={row.pEmail}>
                  <span style={{fontWeight:"bold"}}>General Information</span>
                  {/* <div style={{diaplay:'flex',justifyContent:'space-between'}}> */}
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Age</p><p style={{fontSize:'14px'}}>{row.age}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Gender</p><p style={{fontSize:'14px'}}>{row.gender}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Speciality</p><p style={{fontSize:'14px'}}>{row.speciality}</p>
                  </div>
                  <span style={{fontWeight:"bold"}}>Contact Information</span>

                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Address</p><p style={{fontSize:'14px'}}>{row.address}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Phone</p><p style={{fontSize:'14px'}}>{row.phone}</p>
                  </div>
                  <div style={{display:'flex',justifyContent:"space-between", margin:'5px'}}>
                    <p style={{fontSize:'14px'}}>Personal Email</p><p style={{fontSize:'14px'}}>{row.pEmail}</p>
                  </div>
                
                </div>
              );
            })}
                
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

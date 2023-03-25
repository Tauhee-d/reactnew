import React, { useEffect, useState, useContext } from "react";
import "./Attachments.css";
import Navbar from "../../../components/Navbar/Navbar";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";
import Scrollbars from "react-custom-scrollbars-2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {  Modal,TextField,Box,Button, CardActionArea, CardActions } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const Attachments = () => {
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PatID = sessionStorage.getItem("PatID");
  console.log("patID", PatID);
  const ID = sessionStorage.getItem("id");
  console.log("object1111111", ID);

  
  
  const AttachCancel = () => {
    window.history.back();
  };

  const [patientId, setPatientId] = useState(ID);
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // const handlePatientIdChange = (event) => {
  //   setPatientId(event.target.value);
  // };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageFileChange = (event) => {
    setImageFiles([...imageFiles, event.target.files[0]]); // add the new file to the existing files array
  };

  const handleUpload = (event) => {
    event.preventDefault();
    imageFiles.forEach((file) => handleImageUpload(patientId, title, file)); // upload each file with patientId and title
    Swal.fire("Uploaded Sucessfully!");
    setTitle("");
    handleClose()

    // patientData()
  };

  const handleImageUpload = async (patientId, title, imageFile) => {
    const storageRef = firebase.storage().ref();
    const imageId = Date.now(); // generate a unique ID for the uploaded file
    const fileExtension = imageFile.name.split(".").pop();
    const filePath = `images/${patientId}/${patientId}/${imageId}.${fileExtension}`; // set the storage path for the file
    // const filePath = `images/${patientId}/${patientId}/${imageId}.${fileExtension}`; // set the storage path for the file
    const imageRef = storageRef.child(filePath);
    await imageRef.put(imageFile);

    const downloadURL = await imageRef.getDownloadURL();

    const firestoreRef = firebase.firestore().collection("patients");
    const patientRef = firestoreRef.doc(patientId);
    const patientData = await patientRef.get();
    let images = [];
    if (patientData.exists) {
      images = patientData.data().images || []; // get the existing files for the patient, if any
    }
    images.push({ id: imageId, title: title, url: downloadURL }); // add the new file to the patient's files with title
    await patientRef.set({ images }, { merge: true }); // update the patient's document with the new file
    patientData(images)
  };

  // fetching details from firestore

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientRef = firebase.firestore().collection("patients").doc(ID);
      const patientData = await patientRef.get();
      console.log("firstee", patientData.data());
      setPatientData(patientData.data());
    };
    fetchPatientData();
  }, [ID]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    // setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  //   // delete option

  // const deletePatientData = async (ID, imageID) => {
  //   await firebase
  //     .firestore()
  //     .collection("patients")
  //     .doc(ID)
  //     .delete({
  //       images: firebase.firestore.FieldValue.arrayRemove(imageID),
  //     });
  //   console.log("Image deleted successfully!");
  //   console.log("deltedddd", imageID);
  //   console.log("deltedddd1", ID);
  // };
  const deletePatientData = async (ID, imageID) => {
    const patientRef = firebase.firestore().collection("patients").doc(ID);
    await patientRef.update({
      images: firebase.firestore.FieldValue.arrayRemove(imageID),
    });
    console.log("Image deleted successfully!");
    console.log("deleted", imageID);
    console.log("deleted1", ID);
   
  };
  
  const getUploadedFiles = async () => {
    const firestoreRef = firebase.firestore().collection("patients");
    const patientRef = firestoreRef.doc(ID);
    const patientData = await patientRef.get();
    if (patientData.exists) {
      const files = patientData.data().files || []; // get the existing files for the patient, if any

      return files;
    } else {
      return [];
    }
  };
  const DATA = getUploadedFiles(ID);
  console.log("11111", getUploadedFiles);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }} className="Attach-left">
        <Navbar />
      </div>
      <div style={{ flex: 7 }} className="Attach-right">
        <SubTopbar />
        <Scrollbars>
          <div style={{ padding: "20px" }}>
            <div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span className="add-btn" onClick={handleOpen}>
                    Add <GrAttachment />
                  </span>
                  <span className="Attach-cancel" onClick={AttachCancel}>
                    <MdOutlineCancel size={25} />
                  </span>
                </div>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        Attachments{" "}
                      </span>
                      <span
                        style={{ fontWeight: "bold" }}
                        onClick={handleClose}
                      >
                        {" "}
                        <MdOutlineCancel />{" "}
                      </span>
                    </div>
                    <form
                      style={{ backgroundColor: "white" }}
                      onSubmit={handleUpload}
                    >
                      <TextField
                        style={{ margin: "5px" }}
                        id="outlined-basic"
                        size="small"
                        sx={{ minWidth: "100%" }}
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                      />
                      <input type="file" onChange={handleImageFileChange} />
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button style={{ margin: "10px" }} type="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            </div>

            <div className="gallery">
              {patientData?.images?.map((image) => (
                <div style={{ height: "400px" }}>
                  <Card sx={{ maxWidth: 345 }}>
                    {image.type === "pdf" ? (
                      <embed
                        src={image.url}
                        width="100%"
                        height="100%"
                        type="application/pdf"
                      />
                    ) : (
                    
                      <CardMedia
                        component="img"
                        height="140"
                        image={image.url}
                        alt="green iguana"
                        onClick={() => handleImageClick(image)}
                      />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "320px",
                      }}
                    >
                    
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          Title: {image.title}
                        </Typography>
                        <CardActions>
                          <Button
                            onClick={() => deletePatientData(ID, image.url)}
                            size="small"
                            color="primary"
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </CardContent>
                    </div>
                  </Card>
                </div>
                
              ))}
  

            <Modal open={!!selectedImage} onClose={handleCloseModal}>
  <div onClick={handleCloseModal}>
    {selectedImage && (
      <div style={{ 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        }}>
        {selectedImage.url.includes('.pdf') ? (
          <embed 
            src={selectedImage.url}
            type="application/pdf"
            width="750px"
            height="750px"
          />
        ) : (
          <img 
            src={selectedImage.url} 
            style={{
              width: 1100,
            }} 
            alt={selectedImage.title} 
          />
        )}
      </div>
    )}
  </div>
</Modal>


            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Attachments;

import React, { useEffect, useState, useContext } from "react";
import "./Attachments.css";
import Navbar from "../../../components/Navbar/Navbar";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "react-modal";
import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";
import Scrollbars from "react-custom-scrollbars-2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Attachments = () => {
  const [isFormOpen2, setIsFormOpen2] = useState(false);
  const handleCancel2 = () => {
    setIsFormOpen2(false);
  };
  const toggleForm2 = () => {
    setIsFormOpen2(!isFormOpen2);
  };
  const AttachCancel = () => {
    window.history.back();
  };

  const [patientId, setPatientId] = useState("");
      const [title, setTitle] = useState("");
      const [imageFiles, setImageFiles] = useState([]);
      
      const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
      };
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
      
      const handleImageFileChange = (event) => {
        setImageFiles([...imageFiles, event.target.files[0]]); // add the new file to the existing files array
      };
      
     
      const handleUpload = (event) => {
        event.preventDefault();
        imageFiles.forEach((file) => handleImageUpload(patientId, title, file)); // upload each file with patientId and title
        setIsFormOpen2(false);
        setPatientId('')
        setTitle('')

        // patientData()
        
      };


      const handleImageUpload = async (patientId, title, imageFile) => {
        const storageRef = firebase.storage().ref();
        const imageId = Date.now(); // generate a unique ID for the uploaded file
        const fileExtension = imageFile.name.split('.').pop();
        const filePath = `images/${patientId}/${patientId}/${imageId}.${fileExtension}`; // set the storage path for the file
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
      };

  // fetching details from firestore

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const ID = sessionStorage.getItem("id");
  console.log("object1111111", ID);

  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientRef = firebase.firestore().collection("patients").doc(ID);
      const patientData = await patientRef.get();
      console.log("first", patientData.data());
      setPatientData(patientData.data());
    };
    fetchPatientData();
  }, [ID]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  //   // delete option

  const deletePatientData = async (ID, imageID) => {
    await firebase
      .firestore()
      .collection("patients")
      .doc(ID)
      .update({
        images: firebase.firestore.FieldValue.arrayRemove(imageID),
      });
    console.log("Image deleted successfully!");
    console.log("deltedddd", imageID);
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
  console.log("first", getUploadedFiles);

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
                  <span className="add-btn" onClick={toggleForm2}>
                    Add <GrAttachment />
                  </span>
                  <span className="Attach-cancel" onClick={AttachCancel}>
                    <MdOutlineCancel size={25} />
                  </span>
                </div>

                {isFormOpen2 && (
                  <div className="msg-container1">
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Attachments </span>
                        <span
                          style={{ fontWeight: "bold" }}
                          onClick={handleCancel2}
                        >
                          {" "}
                          <MdOutlineCancel />{" "}
                        </span>
                      </div>

                      <form onSubmit={handleUpload}>
                                      <label>
                                        Patient ID:
                                        <input type="text" value={patientId} onChange={handlePatientIdChange} />
                                      </label>
                                      <br />
                                      <label>
                                        Title:
                                        <input type="text" value={title} onChange={handleTitleChange} />
                                      </label>
                                      <br />
                                      <label>
                                        Images:
                                        <input type="file" onChange={handleImageFileChange} multiple />
                                      </label>
                                      <br />
                                      <button type="submit">Upload</button>
                                    </form>
                    </div>
                  </div>
                )}
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
                    // <img
                    //   className="single-img"
                    //   key={image.id}
                    //   width={320}
                    //   height={250}
                    //   src={image.url}
                    //   alt="patient image"
                    //   onClick={() => handleImageClick(image)}
                    // />
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
                    {/* <p>Title:{image.title}</p>
                    <button
                      className="dlt-btn"
                      onClick={() => deletePatientData(ID, image.id)}
                    >
                      Delete
                    </button> */}
                     <CardContent>
          <Typography gutterBottom variant="h6" component="div">
                Title: {image.title}
          </Typography>
          <CardActions>
        <Button  onClick={() => deletePatientData(ID, image.id)} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
        </CardContent>
                  </div>
                  </Card>
                </div>
              ))}






      {/* <CardActionArea>
       
       
      </CardActionArea> */}
     
   














              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  style={{
                    width: "1300px",
                    height: "620px",
                    objectFit: "contain",
                  }}
                />
              </Modal>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Attachments;







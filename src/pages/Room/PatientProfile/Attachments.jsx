import React, { useEffect, useState, useContext } from "react";
import "./Attachments.css";
import Navbar from "../../../components/Navbar/Navbar";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "react-modal";
import axios from 'axios';




import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";
import Scrollbars from "react-custom-scrollbars-2";

const Attachments = () => {

    const [isFormOpen2, setIsFormOpen2] = useState(false);
    const handleCancel2 = () => {
        setIsFormOpen2(false);
      };
    const toggleForm2 = () => {
        setIsFormOpen2(!isFormOpen2); 
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
      };
      
      
      const handleImageUpload = async (patientId, title, imageFile) => {
        const storageRef = firebase.storage().ref();
        const imageId = Date.now(); // generate a unique ID for the uploaded image
        const imageRef = storageRef.child(`images/${patientId}/${imageId}`);
        await imageRef.put(imageFile);
      
        const downloadURL = await imageRef.getDownloadURL();
      
        const firestoreRef = firebase.firestore().collection("patients");
        const patientRef = firestoreRef.doc(patientId);
        const patientData = await patientRef.get();
        let images = [];
        if (patientData.exists) {
          images = patientData.data().images || []; // get the existing images for the patient, if any
        }
        images.push({ id: imageId, title: title, url: downloadURL }); // add the new image to the patient's images with title
        await patientRef.set({ images }, { merge: true }); // update the patient's document with the new image
      };




      // {patientData &&
      //   patientData.images &&
      //   patientData.images.map((image) => (

         
      // const [patientID, setPatientID] = useState('');
      // const [title, setTitle] = useState('');
      // const [file, setFile] = useState(null);
      // const [filename, setFilename] = useState('');
    
      // const handleSubmit = async (e) => {
      //   e.preventDefault();
    
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   formData.append('patientID', patientID);
      //   formData.append('title', title);
    
      //   try {
      //     const res = await axios.post('http://localhost:5000/upload', formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     });
      //     setFilename(res.data.filename);
      //     console.log('File uploaded successfull');
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
    
    
    


      // const [files, setFiles] = useState([]);

      // useEffect(() => {
      //   const getFiles = async () => {
      //     try {
      //       const res = await axios.get('http://localhost:5000/files');
      //       setFiles(res.data);
      //     } catch (err) {
      //       console.error(err);
      //     }
      //   };
      //   getFiles();
      // }, []);
      // console.log("first11",files)


    
      

















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
      console.log("first",patientData.data())
      setPatientData(patientData.data());
    };
    fetchPatientData();
  }, [ID]);




  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };



//   // delete option

  const deletePatientData = async (ID) => {
    await firebase.firestore().collection("patients").doc(ID).delete();
    console.log("Patient data deleted successfully!");
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
    const DATA = getUploadedFiles(ID)
    console.log("first",getUploadedFiles)




  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }} className="Attach-left">
        <Navbar />
      </div>
      <div style={{ flex: 7 }} className="Attach-right">
        <SubTopbar />
        <Scrollbars>

        <div style={{padding:'20px'}} >
        <div>
                          <div>
                            <span className="add-btn" onClick={toggleForm2}>
                             Add <GrAttachment />
                            </span>

                            {isFormOpen2 && (
                              <div className="msg-container1">
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      Attachments{" "}
                                    </span>
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

{/* <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Patient ID" value={patientID} onChange={(e) => setPatientID(e.target.value)} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form> */}






                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                          <div className="gallery">
          {patientData &&
            patientData.images &&
            patientData.images.map((image) => (
              
                  <div style={{height:'400px'}} >

                  <img
                    className="single-img"
                    key={image.id}
                    width={320}
                    height={250}
                    src={image.url}
                    alt="patient image"
                    onClick={() => handleImageClick(image)}

                  />
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                  <p>Title:{image.title}</p>
                  <button className="dlt-btn" onClick={() => deletePatientData(ID)}>Delete</button>


                  </div>
                  </div>
              
            ))}

                  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <img src={selectedImage.src} alt={selectedImage.alt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </Modal>

        </div>

{/* {files.map((file) => (
        <div key={file._id}>
          <h3>{file.title}</h3>
          {file.fileType === 'application/pdf' ? (
            <embed src={`http://localhost:5000/upload${file.url}`} type="application/pdf" width="100%" height="600px" />
          ) : (
            <img src={`http://localhost:5000/upload${file.url}`} alt={file.title} />
          )}
        </div>
      ))} */}

      </div>
      </Scrollbars>
    </div>
    </div>
  );
};

export default Attachments;

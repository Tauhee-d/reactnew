import React, { useEffect, useState, useContext } from "react";
import "./Attachments.css";
import Navbar from "../../../components/Navbar/Navbar";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";


import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";

const Attachments = () => {

    const [isFormOpen2, setIsFormOpen2] = useState(false);
    const handleCancel2 = () => {
        setIsFormOpen2(false);
      };
    const toggleForm2 = () => {
        setIsFormOpen2(!isFormOpen2);
        // setIsFormOpen(false);
        // setIsFormOpen1(false);
      };
    const [patientId, setPatientId] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    
    const handlePatientIdChange = (event) => {
      setPatientId(event.target.value);
    };
    
    const handleImageFileChange = (event) => {
      setImageFiles([...imageFiles, event.target.files[0]]); // add the new file to the existing files array
    };
    
    const handleUpload = (event) => {
      event.preventDefault();
      imageFiles.forEach((file) => handleImageUpload(patientId, file)); // upload each file
    };
    
    const handleImageUpload = async (patientId, imageFile) => {
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
      images.push({ id: imageId, url: downloadURL }); // add the new image to the patient's images
      await patientRef.set({ images }, { merge: true }); // update the patient's document with the new image
    };





























  
  const ID = sessionStorage.getItem("id");
  console.log("object1111111", ID);

  const [patientData, setPatientData] = useState(null);
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientRef = firebase.firestore().collection("patients").doc(ID);
      const patientData = await patientRef.get();
      setPatientData(patientData.data());
    };
    fetchPatientData();
  }, [ID]);
  // const getUploadedFiles = async () => {
  //     const firestoreRef = firebase.firestore().collection("patients");
  //     const patientRef = firestoreRef.doc(ID);
  //     const patientData = await patientRef.get();
  //     if (patientData.exists) {
  //       const files = patientData.data().files || []; // get the existing files for the patient, if any
  //       return files;

  //     } else {
  //       return [];
  //     }

  //   };
  //   const DATA = getUploadedFiles(ID)
  //   console.log("first",getUploadedFiles)

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }} className="Attach-left">
        <Navbar />
      </div>
      <div style={{ flex: 7 }} className="Attach-right">
        <SubTopbar />

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
          {patientData &&
            patientData.images &&
            patientData.images.map((image) => (
              <img
                className="single-img"
                key={image.id}
                width={320}
                height={250}
                src={image.url}
                alt="patient image"
              />
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Attachments;

import React,{useEffect,useState,useContext} from 'react'
import { Scrollbars } from "react-custom-scrollbars-2";
import "./PatientProfile.css";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { TiArrowLeft } from "react-icons/ti";
import Avatar from "../../../assets/img/Avatar.jpeg";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AiFillMessage, AiOutlineMessage } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { db } from "../../../Firebase/firebase";
import firebase from "firebase/app";
import { storage } from "../../../Firebase/firebase";



import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { TableBody, TableCell, TableRow } from "@mui/material";
import getPatients from "../../../Firebase/firebaseControllers/hosPatientList";
import getReadings from "../../../Firebase/firebaseControllers/Readings";
import getTimeline from "../../../Firebase/firebaseControllers/Timeline";
import getMessage from "../../../Firebase/firebaseControllers/Message";
import Attachments from './Attachments';
// import getImages from "../../../Firebase/firebaseControllers/Images";

const PatientProfile = () => {
  const history = useNavigate();


  const location = useLocation();
  const ID = location.state.id;
  const [refID,setRefID] = useState(ID)
  console.log("first", ID);

  const handleBack = () => {
    window.history.back();
  };
  const handleRoom = () => {
    history("/Room");
  };

  const [roomsDataroom, setRoomsData] = useState([]);
  const [readingsData, setReadingsData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [message, setMessage] = useState([]);
  // const [imageUrl, setImageUrl] = useState('');

  // const [img, setImg] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      const reading = await getReadings();
      const timeline = await getTimeline();
      const msg = await getMessage();
      // const images = await getImages();
      setRoomsData(data);
      setReadingsData(reading);
      setTimelineData(timeline);
      setMessage(msg);
      // setImg(images);
    };
    fetchData();
  }, []);
  
  // const Images = img.filter(
  //   (patient) => patient.pid === ID
  //   );
    // console.log("img", ID);
    // console.log("Message", Images);
  const Message = message.filter(
    (patient) => patient.formData.patientID === ID
  );
  const patientList = roomsDataroom.filter((patient) => patient.id === ID);
  const pID = patientList.map((patient) => patient.id);
  const patientTimeline = timelineData.filter(
    (patient) => patient.patientID === pID
  ); //device id
  const deviceID = patientTimeline.map((timeline) => timeline.deviceID);

  const patientReadings = readingsData.filter(
    (patient) => patient.id === deviceID
  ); //id
  const deviceID1 = readingsData.map((timeline) => timeline.id);
  // console.log("id1", message);
  // console.log("id2", Message);

  function formatTime(epochTime) {
    const date = new Date(epochTime * 1000); // convert epoch time to milliseconds
    const timeString = date.toLocaleTimeString();
    return timeString;
  }

  const Data = [
    { time: "12:00", temp: "120" },
    { time: "01:00", temp: "130" },
    { time: "02:00", temp: "120" },
    { time: "03:00", temp: "150" },
    { time: "04:00", temp: "120" },
    { time: "05:00", temp: "170" },
    { time: "06:00", temp: "140" },
  ];
  const ModerateTemperature = Data.map((data, i) => {
    return (
      <>
        <TableRow key={i} className="table" style={{ cursor: "pointer" }}>
          <TableCell style={{ fontSize: "12px" }}>{data.time}</TableCell>

          <TableCell style={{ fontSize: "12px" }}>{data.temp}</TableCell>
        </TableRow>
      </>
    );
  });

  //Message view

  const msgView = Message.map((data) => {
    return (
      <>
        <p>{data.formData.description}</p>
      </>
    );
  });

// Attachments

  // const imgUrl = Images.map((item) => {
  //   return (
  //     <>
  //       <p>{item.data}</p>
  //     </>
  //   );
  // });

  //Message form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpen1, setIsFormOpen1] = useState(false);
  const [isFormOpen2, setIsFormOpen2] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    attender: "",
    attenderID: "",
    patientID: "",
    description: "",
  });
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setIsFormOpen1(false);
    setIsFormOpen2(false);
  };
  const toggleForm1 = () => {
    setIsFormOpen1(!isFormOpen1);
    setIsFormOpen(false);
    setIsFormOpen2(false);
  };
  const toggleForm2 = () => {
    setIsFormOpen2(!isFormOpen2);
    setIsFormOpen(false);
    setIsFormOpen1(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    setIsFormOpen(false);
    setError("");
    setFormData("");
  };
  const handleCancel1 = () => {
    setIsFormOpen1(false);
  };
  const handleCancel2 = () => {
    setIsFormOpen2(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.attender ||
      !formData.attenderID ||
      !formData.description ||
      !formData.patientID
    ) {
      setError("Please fill in all fields.");
      return;
    }
    db.collection("messages")
      .add({
        formData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setError("");
        setFormData("");
        setIsFormOpen(false);
        console.log("Message successfully sent to Firestore!");
      })
      .catch((error) => {
        console.error("Error sending message to Firestore: ", error);
      });
  };
  











  

 




 
       
  




  // const [image, setImage] = useState(null);
  // const [patientID, setPatientID] = useState('');


  // function handleChangeImg(event) {
  //   if (event.target.files[0]) {
  //     setImage(event.target.files[0]);
  //   }
  // }
  // function handleChangePatient(event) {
  //   setPatientID(event.target.value);
  // }
  

  // function handleUpload() {
  //   const storageRef = storage.ref(`images/${image.name}`);
  //   const uploadTask = storageRef.put(image);
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log(`Upload is ${progress}% done`);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         console.log(`File available at ${downloadURL}`);
  //       });
  //     }
  //   );
  // }



  // const [patientId, setPatientId] = useState("");
  // const [imageFile, setImageFile] = useState(null);

  // const handlePatientIdChange = (event) => {
  //   setPatientId(event.target.value);
  // };

  // const handleImageFileChange = (event) => {
  //   setImageFile(event.target.files[0]);
  // };

  // const handleUpload = (event) => {
  //   event.preventDefault();
  //   handleImageUpload(patientId, imageFile);
  // };

  // const handleImageUpload = async (patientId, imageFile) => {
  //   const storageRef = firebase.storage().ref();
  //   const imageRef = storageRef.child(`images/${patientId}/${imageFile.name}`);
  //   await imageRef.put(imageFile);
  
  //   const downloadURL = await imageRef.getDownloadURL();
  
  //   const firestoreRef = firebase.firestore().collection("patients");
  //   await firestoreRef.doc(patientId).set({
  //     imageUrl: downloadURL,
  //     patientId: patientId
  //   });
  // };
  
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
  
  
  // const handleImageFileChange = (event) => {
  //   const files = event.target.files;
  //   const newFiles = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     if (file.type.includes("image") || file.type.includes("pdf")) {
  //       newFiles.push(file);
  //     }
  //   }
  //   setImageFiles([...imageFiles, ...newFiles]); // add the new files to the existing files array
  // };
  // const handleUpload = async (event) => {
  //   event.preventDefault();
  //   for (let i = 0; i < imageFiles.length; i++) {
  //     const file = imageFiles[i];
  //     await handleFileUpload(patientId, file); // upload each file
  //   }
  // };
  // const handleFileUpload = async (patientId, file) => {
  //   const storageRef = firebase.storage().ref();
  //   const fileId = Date.now(); // generate a unique ID for the uploaded file
  //   const fileRef = storageRef.child(`files/${patientId}/${fileId}`);
  //   await fileRef.put(file);
    
  //   const downloadURL = await fileRef.getDownloadURL();
  //     //   const firestoreRef = firebase.firestore().collection("patients");

  //   const firestoreRef = firebase.firestore().collection("patients");
  //   const patientRef = firestoreRef.doc(patientId);
  //   const patientData = await patientRef.get();
  //   let files = [];
  //   if (patientData.exists) {
  //     files = patientData.data().files || []; // get the existing files for the patient, if any
  //   }
  //   files.push({ id: fileId, url: downloadURL }); // add the new file to the patient's files
  //   await patientRef.set({ files }, { merge: true });
  //     console.log("object",files);    

  // };
      
  
  
  


 



    // const [imageUrl, setImageUrl] = useState("");
  
    // useEffect(() => {
    //   const getImageUrl = async () => {
    //     const firestoreRef = firebase.firestore().collection("patients");
    //     const doc = await firestoreRef.doc(ID).get();
    //     const data = doc.data();
    //     setImageUrl(data.imageUrl);
    //   };
  
    //   getImageUrl();
    // }, [ID]);
    // console.log("firstpat",imageUrl)
  
    // const [patientData, setPatientData] = useState(null);
    // useEffect(() => {
    //   const fetchPatientData = async () => {
    //     const patientRef = firebase.firestore().collection("patients").doc(ID);
    //     const patientData = await patientRef.get();
    //     setPatientData(patientData.data());
    //   };
    //   fetchPatientData();
    // }, [ID]);
    
    
    
    
    
    
    
    
    // console.log("object",doc);
  // console.log("imageUrl:",imageUrl)
  // console.log("imageUrl1",ID)













 
  sessionStorage.setItem("id",refID);


  return (
    <>
       


    
      <div className="Container">
        <div className="left-profile">
          <Navbar />
        </div>

        <div className="right-profile">
          <Scrollbars>
            <SubTopbar />

            <button className="back-button1" onClick={handleBack}>
              {" "}
              <span>
                {" "}
                <TiArrowLeft size={25} />{" "}
              </span>{" "}
              Back
            </button>


            <button className="back-room" onClick={handleRoom}>
              Rooms
            </button>

            {patientList.map((patient) => {
              const time = formatTime(patient.latestTime);
              return (
                <>
                  <div style={{ padding: "50px", marginTop: "50px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <img
                          className="pro-img"
                          src={Avatar}
                          alt=""
                          srcset=""
                        />
                        <span style={{ fontSize: "30px", marginLeft: "10px" }}>
                          {patient.fName} {patient.lName}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "550px",
                        }}
                      >

                        <div className="msg-btn">
                          <div>
                          
                           <Link to="/Attachments" style={{textDecoration:'none'}}> Attachments </Link> 

                           
                          </div>
                        </div>


                        <div className="msg-btn">
                          <div>
                          
                            <span onClick={toggleForm1}>View message </span>

                            {isFormOpen1 && (
                              <div className="msg-container1">
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      Description <AiOutlineMessage />
                                    </span>
                                    <span
                                      style={{ fontWeight: "bold" }}
                                      onClick={handleCancel1}
                                    >
                                      {" "}
                                      <MdOutlineCancel />{" "}
                                    </span>
                                  </div>
                                  {msgView}
                                  {/* <ImageDisplay/> */}
                                  {/* <img src={imageUrl} alt="patient image" width={200} /> */}



                                  {/* {patientData && patientData.images && patientData.images.map((image) => (
                                    <img key={image.id} src={image.url} alt="patient image" />
                                  ))} */}





                                  <div>


                                 








      {/* {images.map((image) => (
        <img key={image.url} src={image.url} alt="" width="200" />
      ))} */}
    </div>
                                  {/* <img sizes="400px" src={imageUrl} alt="Image" /> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div>
                            <span className="attach-btn" onClick={toggleForm2}>
                              <GrAttachment />
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

                                  






                                  {/* <form onSubmit={handleUpload}>
                                    <label>
                                      Patient ID:
                                      <input type="text" value={patientId} onChange={handlePatientIdChange} />
                                    </label>
                                    <br />
                                    <label>
                                      Image:
                                      <input type="file" onChange={handleImageFileChange} />
                                    </label>
                                    <br />
                                    <button type="submit">Upload</button>
                                  </form> */}




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
                        <div className="msg-btn">
                          <div>
                            <p onClick={toggleForm}>
                              message <AiOutlineMessage />
                            </p>
                            {isFormOpen && (
                              <div className="msg-container">
                                <div>
                                  <form
                                    onSubmit={handleSubmit}
                                    className="msg-form"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span style={{ fontWeight: "bold" }}>
                                        Message <AiFillMessage />{" "}
                                      </span>
                                      <span
                                        style={{ fontWeight: "bold" }}
                                        onClick={handleCancel}
                                      >
                                        {" "}
                                        <MdOutlineCancel />{" "}
                                      </span>
                                    </div>
                                    <div>
                                      {error && (
                                        <p style={{ color: "red" }}>{error}</p>
                                      )}
                                    </div>
                                    <label className="label">Title*</label>
                                    <input
                                      type="text"
                                      name="title"
                                      value={formData.title}
                                      onChange={handleChange}
                                      className="form-input"
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <label className="label">
                                          Attender*
                                        </label>
                                        <input
                                          type="text"
                                          name="attender"
                                          value={formData.attender}
                                          onChange={handleChange}
                                          className="form-input"
                                          style={{ width: "270px" }}
                                        />
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <label className="label">
                                          AttenderID*
                                        </label>
                                        <input
                                          type="text"
                                          name="attenderID"
                                          value={formData.attenderID}
                                          onChange={handleChange}
                                          className="form-input"
                                          style={{ width: "270px" }}
                                        />
                                      </div>
                                    </div>
                                    <label className="label">PatientID*</label>
                                    <input
                                      type="text"
                                      name="patientID"
                                      value={formData.patientID}
                                      onChange={handleChange}
                                      className="form-input"
                                      // style={{width:'270px'}}
                                    />
                                    <label className="label">
                                      Description*
                                    </label>
                                    <textarea
                                      name="description"
                                      rows="4"
                                      value={formData.description}
                                      onChange={handleChange}
                                      className="form-input"
                                    />

                                    <button className="form-btn" type="submit">
                                      Submit
                                    </button>
                                  </form>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <span>
                            Latset Temperature {patient.latestTemp} C{" "}
                          </span>
                          <div>
                            <span
                              style={{ fontSize: "10px", marginLeft: "100px" }}
                            >
                              -last at {time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        border: "0.1px solid rgba(235, 230, 230, 0.592)",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    ></div>
                    <div className="pro-container">
                      <div style={{ flex: "2", padding: "15px" }}>
                        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          General Information
                        </h5>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Patient ID</span>
                          <span>{patient.id}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Date of birth</span>
                          <span>{patient.age}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>

                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Sex</span>
                          <span>{patient.gender}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Status</span>
                          <span>{patient.status}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Weight</span>
                          <span>{patient.weight}</span>{" "}
                        </p>
                        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          Contact Information
                        </h5>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Phone</span>
                          <span>{patient.phone}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Email</span>
                          <span>{patient.email}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                      </div>
                      <div className="vertical-line"></div>

                      <div style={{ flex: "3", padding: "15px" }}>
                        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          Latest Diagnoses
                        </h5>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Diagnoses</span>
                          <span>{patient.diagnoses}</span>{" "}
                        </p>

                        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          Doctor Information
                        </h5>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Doctor Id</span>
                          <span>{patient.docID}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Doctor</span>
                          <span>{patient.docName}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                        <p
                          style={{
                            fontSize: "12px",
                            justifyContent: "space-between",
                            display: "flex",
                          }}
                        >
                          <span>Department</span>
                          <span>{patient.department}</span>{" "}
                        </p>
                        <div
                          style={{
                            border: "0.1px solid rgba(235, 230, 230, 0.592)",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="Container2" style={{ display: "flex" }}>
              <div
                className="left-container"
                style={{ flex: "1", padding: "20px" }}
              >
                <h5 style={{ margin: "50px" }}>Readings </h5>
                <ResponsiveContainer
                  width={"100%"}
                  height={"60%"}
                  aspect={3}
                  className="graph"
                >
                  <LineChart data={Data}>
                    <Line dataKey="temp" stroke="red" />
                    <Legend />
                    <XAxis dataKey="time" interval={"preserveStartEnd"} />
                    <YAxis dataKey="temp" interval={"preserveStartEnd"} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* <div className="vertical-line"></div> */}

              <div
                className="right-container"
                style={{ flex: "1", marginLeft: "150px" }}
              >
                <h5 style={{ margin: "50px" }}>Readings Table</h5>

                <Scrollbars>
                  <TableRow>
                    <TableCell style={{ marginLeft: "300px", width: "300px" }}>
                      Time
                    </TableCell>
                    <TableCell>Temp</TableCell>
                    {/* <TableCell>Temp</TableCell> */}
                  </TableRow>

                  <TableBody>{ModerateTemperature}</TableBody>
                </Scrollbars>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;

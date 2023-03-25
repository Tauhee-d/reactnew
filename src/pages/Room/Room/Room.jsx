import "./Room.css";
import Navbar from "../../../components/Navbar/Navbar";
import { Scrollbars } from 'react-custom-scrollbars-2';
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import getRooms from "../../../Firebase/firebaseControllers/hosRoom";
import {db} from '../../../Firebase/firebase'
import { TiGroupOutline } from "react-icons/ti";


const Rooms = () => {
  const history = useNavigate();
  const [roomsDataroom, setRoomsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRooms();
      setRoomsData(data);
    };
    fetchData();
  }, []);

  
    const [documents, setDocuments] = useState([]);
  
    useEffect(() => {
      db.collection('rooms').onSnapshot((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(data);
        console.log("object",roomsDataroom);
      });
    }, []);

  return (
    <>
      <div className="Rooms">
        <div className="leftRoom"><Navbar /></div>
        <div className="rightRoom">
          <Scrollbars>
            <SubTopbar />

              {/* <p>Rooms list</p> */}
            <div id="Rooms-flex">



              {roomsDataroom.map((data,i) => {
                return (
                  <div
                  key={`room-card-${data.id}`}
                    id="room-card-1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history("/PatientList", { state: { id: data.id } })
                    }
                  >
                          

                    <Card
                      variant="outlined"
                      style={{ margin: "30px" }}
                     className={`card ${i % 2 === 0 ? 'even' : 'odd'}`}

                      // className="card-style"
                    >
                      <React.Fragment>
                        <CardContent>
                          <Typography
                            fontSize={"12px"}
                            fontWeight={"bold"}
                            color="text.secondary"
                            padding={"8px"}
                            gutterBottom
                          >
                            {data.name}
                          </Typography>


                          <span style={{display:'flex',alignItems:'center', justifyContent:'center'}}>  <TiGroupOutline size={60} /> </span>

                          <Typography
                            variant="p"
                            sx={{ mt: 2 }}
                            component="div"
                          >
                            <span style={{ marginLeft: "130px",fontSize:'35px' }}>
                              {data.pCount}
                          <span style={{display:'flex', top:'3',marginBottom:'10px', fontSize:'12px'}}> Total Patients{" "}</span> 
                            </span>
                          </Typography>
                          <Typography variant="body2">
                            <span style={{ marginLeft: "10px" }}>
                              {data.device}
                            </span>{" "}
                            <span style={{ marginLeft: "50px" }}>
                              {data.activecount}
                            </span>{" "}
                            <span
                              style={{ color: "green", marginLeft: "50px" }}
                            >
                              {data.activestatus}
                            </span>
                          </Typography>
                          <Typography variant="body2">
                            <span style={{ marginLeft: "10px" }}>
                              {data.device}
                            </span>{" "}
                            <span style={{ marginLeft: "50px" }}>
                              {data.deactivecount}
                            </span>{" "}
                            <span style={{ color: "red", marginLeft: "50px" }}>
                              {data.deactivestatus}
                            </span>
                          </Typography>
                        </CardContent>
                      </React.Fragment>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default Rooms;

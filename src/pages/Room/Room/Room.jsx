import "./Room.css";
import Navbar from "../../../components/Navbar/Navbar";
import { Scrollbars } from "react-custom-scrollbars";
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { rooms,RoomData } from "../RoomData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import Patient from "../PatientList/PatientList";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const history = useNavigate();

  return (
    <>
      <div className="Rooms">
        <div className="leftRoom"><Navbar/></div>
        <div className="rightRoom">
          <Scrollbars>
            <SubTopbar />

              <p>Rooms list</p>
            <div id="Rooms-flex">
            {/* {rooms.map(room => (
        <li key={room.id} onClick={() => history('/PatientList',{state:{id:room.id}})}>
            
          {room.name}
        </li>
      ))} */}
              {RoomData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="room-card"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history("/PatientList", { state: { id: data.id } })
                    }
                  >
                    <Card
                      variant="outlined"
                      style={{ margin: "30px" }}
                      className="card-style"
                    >
                      <React.Fragment>
                        <CardContent>
                          <Typography
                            fontSize={"20px"}
                            textAlign={"center"}
                            color="text.secondary"
                            backgroundColor={" #007bff"}
                            padding={"8px"}
                            gutterBottom
                          >
                            {data.room}
                          </Typography>

                          <Typography
                            variant="p"
                            sx={{ mt: 2 }}
                            component="div"
                          >
                            Patients{" "}
                            <span style={{ marginLeft: "130px" }}>
                              {data.patient}
                            </span>
                          </Typography>
                          <Typography sx={{ mt: 1.5 }} color="text.secondary">
                            Devices
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

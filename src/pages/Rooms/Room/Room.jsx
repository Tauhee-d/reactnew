import "./room.css";
import Navbar from "../../../components/Navbar/Navbar";
import { Scrollbars } from 'react-custom-scrollbars-2';
import SubTopbar from "../../../components/SubTopbar/SubTopbar";
import { RoomData } from "./RoomData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import Patient from "../Patient/Patient";
const Rooms = ({ state }) => {
  const [selectedId, setSelectedId] = useState(null);
  console.log("selectedId", setSelectedId);
  const [hide, setHide] = useState(false);
  const handleClick = () => {
    state(2);
  };
  return (
    <>
      <div className="rooms">
        <div className="rightRoom">
          <Scrollbars>
            <SubTopbar />

            <div id="Rooms-flex">
              {RoomData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="room-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedId(data.id)}
                  >
                    <Card
                      variant="outlined"
                      style={{ margin: "30px" }}
                      className="card-style"
                      onClick={() => handleClick()}
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
                            {data.id}
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
                    {selectedId && <Patient id={selectedId} />}
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

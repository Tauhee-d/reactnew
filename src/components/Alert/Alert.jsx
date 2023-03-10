import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { data } from "../Alert/data";
import getPatients from "../../Firebase/firebaseControllers/hosPatientList";

import "./Alert.css";

const Alert = () => {
  const [roomsDataroom, setRoomsData] = useState([]);
  // const highTemperature = roomsDataroom.filter(item => item.latestTemp >= 95);

  const slicedData = roomsDataroom.filter((item) => item.latestTemp >= 95);
  const highTemperature = slicedData.slice(0, 5);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
    };
    fetchData();
  }, []);
  console.log("object", roomsDataroom);

  return (
    <div className="Alert">
      <div className="Alert-container">
        <span className="icon-box">
          <AiOutlinePlus size={20} style={{ marginRight: "15px" }} />
        </span>
        <span>Alert</span>

        <span className="icon-box">
          <AiFillDelete size={20} style={{ marginRight: "15px" }} />
        </span>
      </div>
      {highTemperature.map((alert) => {
        return (
          <div className="Alert-message">
            <div key={alert.id}>
              <span>{alert.fName}</span>
              <span>{alert.latestTime}</span>
              <span>{alert.department}</span>
            </div>
            <div>
              <span>{alert.latestTemp}'C</span>
              <span>message</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Alert;

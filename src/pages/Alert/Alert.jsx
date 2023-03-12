import React,{useState,useEffect} from 'react'
import './Alert.css'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import getPatients from "../../Firebase/firebaseControllers/hosPatientList";
import { useNavigate } from "react-router-dom";




const Alert = () => {
    const navigate = useNavigate();

    const [roomsDataroom, setRoomsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const data = await getPatients();
          setRoomsData(data);
        };
        fetchData();
      }, []);
  const highTemperature = roomsDataroom.filter((item) => item.latestTemp >= 95);
  const HigherTemperature = highTemperature.map((data, i) => {
    const handleNotification = () => {
      navigate("/PatientProfile", { state: { id: data.id } });
     
    };
    console.log("first",highTemperature)
    return (
      <>
        <TableRow
          key={i}
          onClick={handleNotification}
          style={{ cursor: "pointer" }}
          className='table'
        >
          <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.age}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.department}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.docName}</TableCell>
          <TableCell style={{ fontSize: "12px" }}>{data.device}</TableCell>

          <TableCell style={{ padding: "2px", fontSize: "12px" }}>
            {" "}
            <div
              style={{
                backgroundColor: "rgb(231, 106, 129)",
                color: "white",
                textAlign: "center",
                padding: "2px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {data.latestTemp}
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  });
    //   console.log("object",t1);
  return (
    <div className='Alert-container'>
        <div className="Alert-left">
            <Navbar/>
        </div>
        <div className="Alert-right">
            <SubTopbar/>
            <div style={{padding:'40px'}}>
                {/* <span style={{fontSize:'25px',fontWeight:'bold'}}>Alerts</span> */}
                <div className="high-temparature">
                <span style={{fontWeight:'bold',fontSize:'14px'}}>High Temperature Alerts</span>

                <Scrollbars>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableCell>PatientName</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Doctor</TableCell>
                        <TableCell>Device</TableCell>

                        <TableCell>Alert</TableCell>
                      </TableRow>
                    </thead>
                    <TableBody>{HigherTemperature}</TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
        </div>

      
    </div>
  )
}

export default Alert

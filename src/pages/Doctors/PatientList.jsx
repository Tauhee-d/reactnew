import React,{useEffect,useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SubTopbar from "../../components/SubTopbar/SubTopbar";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import getPatients from '../../Firebase/firebaseControllers/hosPatientList';




const PatientList = () => {
    const navigate = useNavigate();

    const [roomsDataroom, setRoomsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getPatients();
          setRoomsData(data);
         
        };
        fetchData();
      }, []);

    const t1 = roomsDataroom.map((data, i) => {
        const handleAddPatient = () => {
          navigate("/PatientProfile", { state: { id: data.id } });
        };
    
        return (
          <>
            <TableRow
              key={data.id}
              onClick={handleAddPatient}
              style={{ cursor: "pointer" }}
              className="table"
            >
              <TableCell style={{ fontSize: "12px" }}>{data.id}</TableCell>
              <TableCell style={{ fontSize: "12px" }}>
                {data.fName} {data.lName}
              </TableCell>
              <TableCell style={{ fontSize: "12px" }}>{data.department}</TableCell>
              <TableCell style={{ fontSize: "12px" }}>{data.gender}</TableCell>
              <TableCell style={{ fontSize: "12px" }}>{data.status}</TableCell>
            </TableRow>
          </>
        );
      });


  return (
    <div style={{display:'flex'}}>
      <div style={{flex:1}} > <Navbar/> </div>
      <div style={{flex:6}}>
        <SubTopbar/>

      <div className="rec-patient">
                <span style={{ fontWeight: "bold" }}>Recent Patient</span>
                <Scrollbars>
                  <Table>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Patient</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>

                    <TableBody>
                      {/* <Scrollbars> */}

                      {t1}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </Scrollbars>
              </div>
      </div>
    </div>
  )
}

export default PatientList

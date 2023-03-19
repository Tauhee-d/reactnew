import React, { useState, useEffect } from "react";
import {
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import { TiGroupOutline } from "react-icons/ti";

import Navbar from "../../components/Navbar/Navbar";
import SubTopbar from "../../components/SubTopbar/SubTopbar";
// import "./DashboardDoc.css";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import getPatients from "../../Firebase/firebaseControllers/hosPatientList";
import getMessage from "../../Firebase/firebaseControllers/Message";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");
  const date = new Date();
  const hours = date.getHours();

  useEffect(() => {
    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());
  

  const currentDate = new Date();

  const Name = sessionStorage.getItem("name");

  const [roomsDataroom, setRoomsData] = useState([]);
  const [message, setMessage] = useState([]);


  const highTemperature = roomsDataroom.filter((item) => item.latestTemp >= 95);
  const moderateTemperature = roomsDataroom.filter(
    (item) => item.latestTemp < 95
  );
console.log("first",highTemperature)
console.log("secound",highTemperature)
  const sortedData = roomsDataroom.sort(
    (a, b) => new Date(b.addedon * 1000) - new Date(a.addedon * 1000)
  );
  const recentData = sortedData.slice(0, 6);

  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatients();
      setRoomsData(data);
      const data1 = await getMessage();
      setMessage(data1);

    };
    fetchData();
  }, []);

  const [data, setData] = useState([
    {
      gender: "Male",
      count: roomsDataroom.filter((patient) => patient.gender === "male")
        .length,
    },
    {
      gender: "Female",
      count: roomsDataroom.filter((patient) => patient.gender === "female")
        .length,
    },
    {
      date: "date",
      count: roomsDataroom.filter((patient) => patient.addedon === "date")
        .length,
    },
  ]);


 


  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, []);

  const t1 = roomsDataroom.map((data, i) => {
    const handleAddPatient = () => {
      navigate("/PatientProfile", { state: { id: data.id } });
     
    };

    return (
      <>
        <TableRow
          key={i}
          onClick={handleAddPatient}
          style={{ cursor: "pointer" }}
          className='table'
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




  const mappedData = message.map(({ formData: { title, patientID, attenderID } }) => ({
    title,
    patientID,
    attenderID,
    
  }));
  
  
  // console.log("mappedData",mappedData);
  const t2 = message.map((data, i) => {
    const handleNotification = () => {
      navigate("/PatientProfile", { state: { id: data.formData.patientID } });
     
    };
    // console.log("recentData",recentData);
    console.log("message",message)
    return (
      <>
         <TableRow
          key={i}
          onClick={handleNotification}
          style={{ cursor: "pointer" }}
          className='table'
        >
          <TableCell style={{ fontSize: "12px" }}>{data.formData.patientID}</TableCell>
          {/* <TableCell style={{ fontSize: "12px" }}>
            {data.fName} {data.lName}
          </TableCell> */}
          <TableCell style={{ fontSize: "12px" }}>{data.formData.title}</TableCell>
        </TableRow>



       
      </>
    );
  });
  const HigherTemperature = highTemperature.map((data, i) => {
    const handleNotification = () => {
      navigate("/PatientProfile", { state: { id: data.id } });
     
    };
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
  const ModerateTemperature = moderateTemperature.map((data, i) => {
    const handleNotification = () => {
      navigate("/PatientProfile", { state: { id: data.id } });
     
    };
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

          <TableCell style={{ fontSize: "12px" }}>{data.latestTemp}</TableCell>
        </TableRow>
      </>
    );
  });


  // Patient Added this month

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear(); 
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1); 
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0); 
  
  const patientsAddedThisMonth = roomsDataroom.filter(patient => {
    const date = new Date(patient.addedOn * 1000); 
    return date >= firstDayOfMonth && date <= lastDayOfMonth; 
  });

const count = patientsAddedThisMonth.length;

const totalPatientCount = roomsDataroom.length;

// Patient filter according to their gender 
const filterGender = "male";
const filteredPatients = roomsDataroom.filter(patient => patient.gender === filterGender);
const malecount = filteredPatients.length;

const filterFemale = "female";
const filtered = roomsDataroom.filter(patient => patient.gender === filterFemale);
const femalecount = filtered.length;


  return (
    <div className="MedDashboard">
      <div className="Med-left">
        <Navbar />
      </div>
      <div className="Med-right">
        <SubTopbar />

        <div style={{ margin: "20px" }}>
          <h3>
            {greeting} Mr.{Name}
          </h3>
          <div style={{ fontSize: "10px" }}>
            <span>{currentDate.toDateString()}</span>
            <span style={{ marginLeft: "100px" }}>
              {" "}
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="Container">
          <div className="Container-left">
            <div className="con-one">
             
              <div className="statistics">
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
                      <span style={{fontWeight:'bold'}}>Patients</span>
                      <span>This month</span>
                    </div>
                    <div>
                      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                          <span style={{fontSize:"40px"}}>{count}</span>
                          <span>New Patients</span>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                      <span style={{fontSize:"40px"}}>{totalPatientCount}</span>
                          <span>Total Patients</span>
                      </div>
                    </div>
               
              </div>
              <div className="statistics1">
                <div style={{marginTop:'20px'}}>
                <span style={{fontWeight:'bold'}}>Gender</span>
                  </div>
                  <div className="gender"  style={{display:'flex',height:'200px',flexDirection:'column'}}>
                    <div>

                  <span style={{marginLeft:'15px'}}>  <TiGroupOutline size={60} /> </span>
                  <div>

                  <span>Total Patient</span>
                    <span style={{marginLeft:'10px'}} >{totalPatientCount}</span>
                  </div>
                    </div>
                  <div>
                    
                    <div style={{display:'flex',justifyContent:'space-between',width:'150px'}}>
                      <div>Women:{femalecount}</div>
                      <div>Men:{malecount}</div>
                    </div>
                  </div>

                  </div>
              

               
              </div>
              <div className="notification">
              <span style={{fontWeight:'bold'}}>Notification</span>

                <Scrollbars>
                  <Table>
                    <TableRow >
                      <TableCell>ID</TableCell>
                      {/* <TableCell>Name</TableCell> */}
                      <TableCell>Message</TableCell>
                    </TableRow>

                    <TableBody>
                      {/* <Scrollbars> */}

                      {t2}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
            <div className="con-two">
              <div className="rec-patient">
              <span style={{fontWeight:'bold'}}>Recent Patient</span>
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
          {/* <div className="Container-right">
            <div className="alerts">
              <div className="high-temparature">
                <span style={{fontWeight:'bold',fontSize:'14px'}}>High Temperature Alerts</span>

                <Scrollbars>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableCell>Name</TableCell>

                        <TableCell>Alert</TableCell>
                      </TableRow>
                    </thead>
                    <TableBody>{HigherTemperature}</TableBody>
                  </Table>
                </Scrollbars>
              </div>
              <div className="low-temparature">
                <span style={{fontWeight:'bold',fontSize:'14px'}}>Moderate and low fever Alerts</span>

                <Scrollbars>
                  <Table>
                    <thead>
                      <TableRow>
                        <TableCell>Name</TableCell>

                        <TableCell>Alert</TableCell>
                      </TableRow>
                    </thead>
                    <TableBody>{ModerateTemperature}</TableBody>
                  </Table>
                </Scrollbars>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;









// import React, { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Button, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteStudentAction, fetchStudentAction } from "../actions/regActions";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import { MoonLoader } from "react-spinners";
// import "./listStudent.css";

// const ListStudents = () => {
//   const [page, setPage] = useState(0),
//     [rowsPerPage, setRowsPerPage] = useState(10),
//     [rows, setRow] = useState([]),
//     [loading, setLoading] = useState(true),
//     navigate = useNavigate(),
//     dispatch = useDispatch(),
//     listStud = useSelector((state) => state.fetchStudent.items),
//     columns = [
//       { id: "studentName", label: "Student Name", minWidth: 150 },
//       { id: "email", label: "Email", minWidth: 100 },
//       {
//         id: "PhNum",
//         label: "Phone Number",
//         minWidth: 130,
//         align: "right",
//       },
//       {
//         id: "RegDate",
//         label: "Registration Date",
//         minWidth: 130,
//         align: "right",
//       },
//       {
//         id: "gender",
//         label: "Gender",
//         minWidth: 130,
//         align: "right",
//       },
//       {
//         id: "regNumber",
//         label: "Register Number",
//         minWidth: 130,
//         align: "right",
//       },
//       {
//         id: "nationality",
//         label: "Nationality",
//         minWidth: 130,
//         align: "right",
//       },
//       {
//         id: "delete",
//         label: "Delete",
//         minWidth: 70,
//         align: "right",
//       },
//     ];

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   useEffect(() => {
//     dispatch(fetchStudentAction());
//   }, [dispatch]);

//   const createData = (
//     _id,
//     studentName,
//     email,
//     PhNum,
//     RegDate,
//     gender,
//     regNumber,
//     nationality
//   ) => {
//     return {
//       _id,
//       studentName,
//       email,
//       PhNum,
//       RegDate,
//       gender,
//       regNumber,
//       nationality,
//     };
//   };

//   useEffect(() => {
//     setLoading(listStud.loading);
//     if (listStud && listStud.length) {
//       let students = [];
//       setLoading(false);
//       listStud.forEach((data) => {
//         students.push(
//           createData(
//             data._id,
//             data.name,
//             data.email,
//             data.phNo,
//             data.regDate,
//             data.gender,
//             data.regNumber,
//             data.nationality
//           )
//         );
//       });
//       setRow(students);
//     }
//   }, [listStud]);

//   const deleteStudent = (studentDt) => {
//     Swal.fire({
//       title: `Do you want to delete ${studentDt.studentName}'s record ?`,
//       showDenyButton: true,
//       confirmButtonText: "Yes",
//       denyButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const studentData = rows.filter((stud) => studentDt._id !== stud._id);
//         setRow(studentData);
//         dispatch(deleteStudentAction(studentDt._id));
//         Swal.fire("SUCCESS", "Deleted Successfully", "success");
//       }
//     });
//   };

//   return (
//     <>
//       <Button
//         startIcon={<AddBoxIcon />}
//         style={{ margin: "20px", float: "right", backgroundColor: "#370041" }}
//         variant='contained'
//         onClick={() => navigate("/regStudent")}
//       >
//         Register Student
//       </Button>
//       <Grid container direction='column' alignItems='center' justify='center'>
//         <Paper
//           sx={{
//             width: "97.5%",
//             overflow: "hidden",
//           }}
//         >
//           <TableContainer sx={{ maxHeight: 700 }}>
//             <Table stickyHeader aria-label='sticky table'>
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       style={{
//                         minWidth: column.minWidth,
//                         backgroundColor: "#6A1B76",
//                         color: "#fff",
//                       }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => {
//                     return (
//                       <TableRow
//                         hover
//                         role='checkbox'
//                         tabIndex={-1}
//                         key={row._id}
//                       >
//                         {columns.map((column) => {
//                           const value = row[column.id];
//                           return (
//                             <TableCell key={column.id} align={column.align}>
//                               {column.id === "delete" ? (
//                                 <Grid item xs={8}>
//                                   <DeleteIcon
//                                     style={{ color: "red", cursor: "pointer" }}
//                                     onClick={() => deleteStudent(row)}
//                                   />
//                                 </Grid>
//                               ) : (
//                                 value
//                               )}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {!rows.length && (
//             <MoonLoader
//               color='#6A1B76'
//               loading={loading}
//               size={100}
//               id='loader'
//             />
//           )}

//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component='div'
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Grid>
//     </>
//   );
// };

// export default ListStudents;
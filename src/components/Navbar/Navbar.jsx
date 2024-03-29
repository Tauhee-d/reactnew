import React,{useState} from "react";
import { AiFillPieChart,AiOutlineLogout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { HiBellAlert } from "react-icons/hi2";
import { Link, Navigate } from "react-router-dom";
import "./navbar.css";
import yantram from "../../../src/assets/img/yantram.png";
import { Button } from "@mui/material";
import { useNavigate} from "react-router-dom";
import UserRoleContext from "../ContextApi/UserRoleContext";
import { useContext } from "react";
import {  NavDropdown, Nav } from "react-bootstrap";
import Protected from "../ProtectedRoutes/Protected";

const Navbar = ({ Alert }) => {
  const [active, setActive] = useState(true);
  const handleDashboardClick = () => {
    setActive(!active);
  };

const {userRole} = useContext(UserRoleContext)
  const UserTypes = {
    doctor: "doctor",
    nurse: "nurse",
    admin: "admin",
  };
  const Role = sessionStorage.getItem("user");

  const Navigation = useNavigate()
  const handleLogout = () =>{
    sessionStorage.clear()
    Navigation('/')

  }

  
  return (
    <div className="Navbar">

      <div style={{ display: "flex" }}>
        {/* <button style={{border:'none'}}> */}

        <img
          src={yantram}
          alt=""
          srcset=""
          style={{
            height: "42px",
            marginLeft: "70px",
            width: "75px",
            borderRadius: "2px",
            marginTop: "15px",
            cursor:'pointer'
          }}
        />
        {/* </button> */}
        {/* <p
          style={{
            color: "#c2c2d6",
            marginTop: "20px",
            marginLeft: "15px",
            fontSize: "20px",
          }}
        >
          YANTRAM
        </p> */}
      </div>

      <hr style={{ color: "white" }} />

      <ul
        className="nav d-md-block d-none border-primary rounded"
        id="leftside"
      >
        <li className={`nav-item ${active ? "active" : ""}`}>

          <Button className="nav-bttn">
            <Link className="nav-link" to="/dashboard" id="acolor" onClick={handleDashboardClick}>

              <MdDashboard size={20} style={{ marginRight: "15px" }} />
              <span>Dashboard</span>
            </Link>
          </Button>
        </li>
        {/* <Protected> */}
        {userRole === UserTypes.admin || userRole === UserTypes.nurse || userRole === UserTypes.doctor ? (
        <li className={`nav-item ${active ? "active" : ""}`}>
        <Button className="nav-bttn">
              <Link className="nav-link" to="/Room" id="acolor" onClick={handleDashboardClick}>
                <AiFillPieChart size={20} style={{ marginRight: "15px" }} />{" "}
                <span style={{ marginRight: "35px" }}>Rooms</span>
              </Link>
            </Button>
          </li>
        
        ) : <Navigate to="/"/>}
        {/* </Protected> */}
        {/* <Protected> */}
        {userRole === UserTypes.admin ? (
        <li className={`nav-item ${active ? "active" : ""}`}>
        <Button className="nav-bttn">
             <Link className="nav-link" to="/Doctor" id="acolor" onClick={handleDashboardClick}>
               <AiFillPieChart size={20} style={{ marginRight: "15px" }} />{" "}
               <span style={{ marginRight: "35px" }}>Doctor</span>
             </Link>
           </Button>
         </li>
        
        ) : null}
           {userRole === UserTypes.admin ? (
        <li className={`nav-item ${active ? "active" : ""}`}>
        <Button className="nav-bttn">
             <Link className="nav-link" to="/Nurse" id="acolor" onClick={handleDashboardClick}>
               <AiFillPieChart size={20} style={{ marginRight: "15px" }} />{" "}
               <span style={{ marginRight: "35px" }}>Nurse</span>
             </Link>
           </Button>
         </li>
        
        ) : null} 
        {userRole === UserTypes.admin ? (
        <li className={`nav-item ${active ? "active" : ""}`}>
        <Button className="nav-bttn">
             <Link className="nav-link" to="/DocPatientList" id="acolor" onClick={handleDashboardClick}>
               <AiFillPieChart size={20} style={{ marginRight: "15px" }} />{" "}
               <span style={{ marginRight: "35px" }}>Patient</span>
             </Link>
           </Button>
         </li>
        
        ) : null} 
     
        {/* </Protected> */}
            

      
      



         <li className="nav-item">
            <Button className="nav-bttn">
              <Link className="nav-link" to="/Alert" id="acolor" onClick={handleDashboardClick}>
                <HiBellAlert size={20} style={{ marginRight: "15px" }} />{" "}
                <span style={{ marginRight: "35px" }}>Alert</span>
              </Link>
            </Button>
          </li>
        <li>
        <Button className="nav-bttn" >

        <AiOutlineLogout size={20} style={{ marginLeft: "18px" }} />
        <span style={{marginLeft:'17px'}} onClick={handleLogout}>logout</span>
       
      </Button>

        </li>
       
       
      </ul>
      {Alert}
    </div>
  );
};

export default Navbar;




































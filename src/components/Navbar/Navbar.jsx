import { AiFillPieChart } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import "./navbar.css";
import yantram from "../../../src/assets/img/yantram.jpeg";
import { Button } from "@mui/material";
import UserRoleContext from "../ContextApi/UserRoleContext";
import { useContext } from "react";
const Navbar = ({ Alert }) => {
const {userRole} = useContext(UserRoleContext)
  const UserTypes = {
    doctor: "doctor",
    patient: "patient",
    admin: "admin",
  };
  const Role = sessionStorage.getItem("user");

  

  
  return (
    <div className="Navbar">
      {/* <div style={myStyle}>  */}

      <div style={{ display: "flex" }}>
        <img
          src={yantram}
          alt=""
          srcset=""
          style={{
            height: "40px",
            marginLeft: "20px",
            width: "60px",
            borderRadius: "2px",
            marginTop: "15px",
          }}
        />
        <p
          style={{
            color: "#c2c2d6",
            marginTop: "20px",
            marginLeft: "15px",
            fontSize: "20px",
          }}
        >
          YANTRAM
        </p>
      </div>

      <hr style={{ color: "white" }} />

      <ul
        className="nav d-md-block d-none border-primary rounded"
        id="leftside"
      >
        <li className="nav-item">
          <Button className="nav-bttn">
            <Link className="nav-link" to="/dashboard" id="acolor">
              <MdDashboard size={20} style={{ marginRight: "15px" }} />
              <span>Dashboard</span>
            </Link>
          </Button>
        </li>
        {userRole === UserTypes.admin || userRole === UserTypes.doctor ? (
          <li className="nav-item">
            <Button className="nav-bttn">
              <Link className="nav-link" to="/Room" id="acolor">
                <AiFillPieChart size={20} style={{ marginRight: "15px" }} />{" "}
                <span style={{ marginRight: "35px" }}>Rooms</span>
              </Link>
            </Button>
          </li>
        
        ) : null}
       
       
      </ul>
      {Alert}
    </div>
  );
};

export default Navbar;

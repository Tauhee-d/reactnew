import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import UserRoleContext from "../ContextApi/UserRoleContext";

function Header() {
  const User = sessionStorage.getItem("user");

  const { userRole } = useContext(UserRoleContext);

  const Navigation = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    Navigation("/");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span
        style={{
          fontSize: "1.3rem",
          color: "#c2c2d6",
          marginLeft: "50px",
          letterSpacing: "1px",
        }}
      >
        Yantram Medtech Dashboard
      </span>
    </Navbar>
  );
}

export default Header;

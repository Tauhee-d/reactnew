
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";


function Header() {
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  
  return (
    <Navbar bg="light" expand="lg">
     <span style={{    fontSize:'1.3rem', color:'#c2c2d6', marginLeft:'50px',letterSpacing:"1px" }}>Yantram Medtech Dashboard</span>
    </Navbar>
  );
}

export default Header;
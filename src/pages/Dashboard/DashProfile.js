import React from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Avatr from "../../assets/img/profile.jpg"

export default function DashProfile() {
  return (
    <div>
      <div  style={{display:'flex',margin:'20px',backgroundColor:'white',border: "1px solid #dee2e6",
            borderRadius: "4px"}}>
        <div>
        <img
                      alt="..."
                      className="avatar border-gray "
                      src={Avatr}
                      style={{width:'200px', borderRadius:'90%',margin:"20px",marginLeft:'80px'}}
                    ></img>
                    <p style={{marginLeft:'100px'}}>Henricues</p>
                    <p style={{marginLeft:'100px'}}>henricues@gmail.com</p>

        </div>
        <div style={{marginLeft:'100px',marginTop:'20px'}}>
            <label>Address: </label>
            <p>Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09</p>
            <label>City: </label>
            <p>Bangalore</p>
            <label>Country: </label>
            <p>India</p>
            <label>Postal Code: </label>
            <p>123456</p>
            
        </div>
      </div>


      
    </div>
  );
}

      
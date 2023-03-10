
import React from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import Typography from '@mui/material/Typography';


function Header() {
  const User = sessionStorage.getItem('user')

  const Navigation = useNavigate()
  const handleLogout = () =>{
    sessionStorage.clear()
    Navigation('/')

  }



 

  
  return (
    <Navbar bg="light" expand="lg" style={{display:'flex', justifyContent:"space-between"}} >
     <span style={{    fontSize:'1.3rem', color:'#c2c2d6', marginLeft:'50px',letterSpacing:"1px" }}>Yantram Medtech Dashboard</span>
     <Nav>
      <Typography  variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>

      <NavDropdown title={User} >
        <NavDropdown.Item  onClick={handleLogout} >Logout</NavDropdown.Item>
      </NavDropdown>
      </Typography>
    </Nav>
    </Navbar>
  );
}

export default Header;
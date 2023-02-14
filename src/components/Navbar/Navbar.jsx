import {  AiFillPieChart, AiOutlineRight } from 'react-icons/ai';
import {  MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './navbar.css'
import Typography from '@mui/material/Typography';
import yantram from '../../../src/assets/img/yantram.jpeg'
import background from '../../../src/assets/img/sidebar2.jpg'
import { Button } from '@mui/material';
const Navbar = () => {
  

  


  const myStyle={
    
    // backgroundImage: `url(${background})`,


    height:'100vh',
    flex:1,
    
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (

       <div className='Navbar'> 
       {/* <div style={myStyle}>  */}
         
      <div style={{ display:'flex'}}>

      <img src={yantram} alt="" srcset="" style={{height:'40px',marginLeft:'20px',width:'60px', borderRadius:'2px',marginTop:"15px"}} />
      <p style={{color:'#c2c2d6',marginTop:"20px",marginLeft:'15px',fontSize:'20px'}}>YANTRAM</p>
      </div>
   
    
      <hr style={{color:'white'}}/>

      <ul
        className="nav d-md-block d-none border-primary rounded"
        id="leftside"
      >
         
        
      
      
       
         
         
        <li className="nav-item">
        <Button className='nav-bttn'>
          <Link className="nav-link" to="/dashboard" id='acolor'>
            <MdDashboard size={20} style={{marginRight:'15px'}} /><span>Dashboard</span>

          </Link>
          </Button>
        </li>
        <li className="nav-item">
        <Button className='nav-bttn'>
          <Link className="nav-link" to="/Room" id='acolor'>
            <AiFillPieChart size={20} style={{marginRight:'15px'}} />  <span style={{marginRight:'35px'}}>Rooms</span>
          </Link>
          </Button>
        </li>
       
       
        
       
      
      </ul>


    </div>



  );
}

export default Navbar;



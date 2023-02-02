// import { MdSpeed, MdPersonOutline } from 'react-icons/md';
import {  AiFillPieChart, AiOutlineRight } from 'react-icons/ai';
// import { AiOutlinePlus, AiFillPieChart, AiOutlineRight } from 'react-icons/ai';
// import { RiBarChart2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
// import logo from '../../assets/img/yantram'
// import Dashboard from '../Dashboard/Dashboard';
import './navbar.css'
import yantram from '../../../src/assets/img/yantram.jpeg'
import background from '../../../src/assets/img/sidebar2.jpg'
const Navbar = () => {
  const myStyle={
    
    backgroundImage: `url(${background})`,

    height:'100vh',
    flex:1,
    
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (

      <div style={myStyle}>
         
      <div style={{ display:'flex'}}>

      <img src={yantram} alt="" srcset="" style={{height:'40px',marginLeft:'20px',width:'60px', borderRadius:'2px',marginTop:"15px"}} />
      <p style={{color:'white',marginTop:"20px",marginLeft:'5px',fontSize:'20px'}}>YANTRAM</p>
      </div>
      <hr style={{color:'white'}}/>

      <ul
        className="nav d-md-block d-none border-primary rounded"
        id="leftside"
      >
       
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Dashboard <AiOutlineRight className='icons3' />
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/users" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Users <AiOutlineRight className='icons2' />
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/Device" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Devices <AiOutlineRight className='icons4' />
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/table" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> UserTbl <AiOutlineRight className='icons4' />
          </Link>
        </li> */}
        
        {/* <li className="nav-item">
          <Link className="nav-link" to="/patient" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Patient <AiOutlineRight className='icons4' />
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/rooms" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Rooms <AiOutlineRight className='icons1' />
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/parentrooms" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Roomss <AiOutlineRight className='icons1' />
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/room1" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Room1 <AiOutlineRight className='icons1' />
          </Link>
        </li> */}
       
      
      </ul>


    </div>



  );
}

export default Navbar;



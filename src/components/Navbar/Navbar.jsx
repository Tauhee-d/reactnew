import { MdSpeed, MdPersonOutline } from 'react-icons/md';
import { AiOutlinePlus, AiFillPieChart, AiOutlineRight } from 'react-icons/ai';
import { RiBarChart2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
// import Dashboard from '../Dashboard/Dashboard';
import './navbar.css'
const Navbar = () => {
  return (

    <div className='Navbar'>

      {/* left side navbar  */}
      <ul
        className="nav d-md-block d-none border-primary rounded"
        id="leftside"
      >
        <li className="nav-item " id="l-color">
          <Link to='/'
            className="nav-link active"
            aria-current="page"
            id='acolor'
          >
            <MdSpeed size={20} className='icons' /> Dashboard <AiOutlineRight className='icons3' />
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/rooms' className="nav-link" id='acolor'>
            <MdPersonOutline size={20} className='icons' /> Rooms <AiOutlineRight className='icons4' />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/patients" id='acolor'>
            <AiOutlinePlus size={20} className='icons' /> Pateints <AiOutlineRight className='icons2' />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/devices" id='acolor'>
            <AiFillPieChart size={20} className='icons' /> Devices <AiOutlineRight className='icons2' />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/doctors" id='acolor'>
            <RiBarChart2Fill size={20} className='icons' /> Doctors <AiOutlineRight className='icons2' />
          </Link>
        </li>
      </ul>


    </div>



  );
}

export default Navbar;


import "./topbar.css";
import { FaSearch, FaEnvelope, FaBell } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

const Topbar = (props) => {
  return (
    <div className="Topbar">

      <nav className="navbar navbar-dark  border-primary  " id="navheight">
        <div className="container-fluid"  >
          <span className="navbar-brand mb-0 h1" id="title">{props.title}</span>

          <form className="d-flex ms-5">
            <input
              className="form-control me-2"
              type="search"
              placeholder="search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success " type="submit">
              <FaSearch size='20px' />
            </button>
          </form>

          <ul className="navbar">
            <li className="nav">
              <a className="nav-link active" aria-current="page" href="/">

                <FaEnvelope size='20px' />
              </a>
            </li>
            <li className="nav">
              <a className="nav-link" href="/">
                <FaBell size='20px' />
              </a>
            </li>
            <li className="nav">
              <a className="nav-link" href="/">
                <MdPerson size='20px' />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>


  );
}

export default Topbar;
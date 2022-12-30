
import React, { useState } from 'react'
// import { NavLink } from "react-router-dom";
import {NavLink, Link,Outlet } from 'react-router-dom';
import MainNavbar from '../../components/Navbar/Navbar';
// import Devices from 'views/Devices/Devices';


// react-bootstrap components
import './UserTable.css'

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Topbar from '../../components/Topbar/Topbar';

const UserData = [
        { userId: "1", name: "xyz", gender: "male", weight: "44", age: "12", addedOn: "11:00" },
        { userId: '2', name: 'abc', gender: 'female', weight: '44', age: "12", addedOn: '12:00' },
        { userId: '3', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '01:00' },
        { userId: '4', name: 'abc', gender: 'female', weight: '44', age: "12", addedOn: '02:00' },
        { userId: '5', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '03:00' },
        { userId: '6', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '03:00' },
        { userId: '7', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '03:00' },
        { userId: '8', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '03:00' },
        { userId: '9', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '03:00' },
    
    ]

    const Header = () => {
    return (
        <tr className='Heading' >
            <th>UserId</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Weight</th>
            <th>Age</th>
            <th>AddedOn</th>

        </tr>
    )
}
const Rows = (props) => {
    const { userId, name, gender, weight, age, addedOn } = props
    return (
        <tr>

            {/* <Outlet/> */}
            <td className='tabledata'><Link exact to="/dashboard">{userId}</Link></td>
            <td className='tabledata'><Link to='/dashboard'  > {name}</Link></td>
            <td className='tabledata'><Link to='./dashboard'  >{gender}</Link></td>
            <td className='tabledata'><Link to='./dashboard'  >{weight}</Link></td>
            <td className='tabledata'><Link to='./dashboard'  >{age}</Link></td>
            <td className='tabledata'><Link to='./dashboard'  >{addedOn}</Link></td>

          
        </tr>
    )
   
}
const RowTable = (props) => {
    const { data } = props
    console.log(data);
    return (
      
       <>
                {data.map(row =>
                    <Rows userId={row.userId} name={row.name} gender={row.gender}
                        weight={row.weight} age={row.gender} addedOn={row.addedOn} />
                    // <Row userId={row.userId} />
                )}
          </>
    )
}
function UserTable() {
        const [rows, setRows] = useState(UserData)

  return (
    <>
<div className="Maincontainer" >
    <div className="leftBox">

    <MainNavbar/>
    </div>
    <div className="rightBox">
    <Topbar/>
    <div style={{marginTop:'15px'}}>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
                
              <Card.Header>
              <Card.Title as="h4">Table </Card.Title>
                <p className="card-category">
                  Here is a list of users
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                                
                  <thead>
                <Header/>            
                  </thead>
                  <tbody>
                      <RowTable data={rows} />
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
      </div>
      </div>
      </div>
    </>
  );
}

export default UserTable;

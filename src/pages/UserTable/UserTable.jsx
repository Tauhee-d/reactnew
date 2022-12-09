import React, { useState } from 'react'
import './UserTable.css'
import UserDetail from '../UserDetail/UserDetail'
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';


const UserData = [
    { userId: "1", name: "xyz", gender: "m", weight: "44", age: "12", addedOn: "11:00" },
    { userId: '2', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '11:00' },
    { userId: '3', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '11:00' },
    { userId: '4', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '11:00' },
    { userId: '5', name: 'xyz', gender: 'male', weight: '44', age: "12", addedOn: '11:00' },

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
const Row = (props) => {
    const { userId, name, gender, weight, age, addedOn } = props
    return (
        // <Link to='../UserDetail/UserDetail.jsx'> <tr>
        <tr>


            {/* <td><Link to='./userDetail'>{userId}</Link></td>
            <td><Link to='./userDetail'>{name}</Link></td>
            <td><Link to='./userDetail'>{gender}</Link></td>
            <td><Link to='./userDetail'>{weight}</Link></td>
            <td><Link to='./userDetail'>{age}</Link></td>
            <td><Link to='./userDetail'>{addedOn}</Link></td> */}



            <td>{userId}</td>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{weight}</td>
            <td>{age}</td>
            <td>{addedOn}</td>
        </tr>
        // </tr></Link>
    )
}
const Table = (props) => {
    const { data } = props
    console.log(data);
    return (
        <table class="table table-hover">
            <tbody>
                <Header />
                {data.map(row =>
                    <Row userId={row.userId} name={row.name} gender={row.gender}
                        weight={row.weight} age={row.gender} addedOn={row.addedOn} />
                    // <Row userId={row.userId} />
                )}
            </tbody>
        </table>
    )
}

function UserTable() {
    const [rows, setRows] = useState(UserData)
    return (
        <div className='UserTable'>
            <h4>UserTAble</h4>
            <Table data={rows} />

        </div>

    )
}

export default UserTable
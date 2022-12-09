import React, { useState } from 'react'
import './TimeTemp.css'


const UserData = [
    { time: "12:00", temp: "120f" },
    { time: "01:00", temp: "130f" },
    { time: "02:00", temp: "140f" },
    { time: "03:00", temp: "150f" },
    { time: "04:00", temp: "160f" },
    { time: "05:00", temp: "170f" },
    { time: "06:00", temp: "180f" },


]
const Header = () => {
    return (
        <tr className='Heading' >
            <th>Time</th>
            <th>Temp</th>


        </tr>
    )
}
const Row = (props) => {
    const { time, temp } = props
    return (
        <tr>
            <td>{time}</td>
            <td>{temp}</td>

        </tr>
    )
}
const Table = (props) => {
    const { data } = props
    console.log(data);
    return (
        <table class="table table-hover" id='Table'>
            <tbody>
                <Header />
                {data.map(row =>
                    <Row time={row.time} temp={row.temp} />
                    // <Row userId={row.userId} />
                )}
            </tbody>
        </table>
    )
}

function TimeTemp() {
    const [rows, setRows] = useState(UserData)
    return (
        <div className='UserTable'>
            <h4>Time and Temperature Table</h4>
            <Table data={rows} />

        </div>

    )
}

export default TimeTemp
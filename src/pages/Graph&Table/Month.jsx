import React, { useState } from 'react'
import './Graph&Table.css'
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis } from 'recharts';


export default function Month() {




    function getZeroTimeOfMonth() {
        let today = new Date();
        var month = new Date(today.getTime() - 60 * 60 * 24 * 30 * 1000);
        month.setHours(0, 0, 0, 0);
        return month;
    }



    function addDateMonth(plus) {
        let month = getZeroTimeOfMonth();
        month.setDate(month.getDate() + plus);
        return month;
    }


    const monthData = []

    var ranMonth = [];



    const mmin = getZeroTimeOfMonth().getTime();
    const mmax = addDateMonth(1).getTime() - 1;

    for (let k = 0; k < 10; k++) {

        var monthtime = Math.round(Math.random() * (mmax - mmin) + mmin);
        ranMonth.push(monthtime);
    }

    ranMonth.sort();






    for (let i = 0; i < 10; i++) {
        var temp = Math.round(Math.random() * (450 - 220) + 220);
        temp = temp / 10;


        var m = new Date(ranMonth[i])

        console.log("month", m);

        var z = m.getHours() + ":" + m.getMinutes();

        monthData.push({
            Time: z,
            Temperature: temp
        })
    }






    //  Time Temperature Table 

    const Header = () => {
        return (
            <tr className='Heading' >
                <th>Time</th>
                <th>Temp</th>


            </tr>
        )
    }
    const Row = (props) => {
        const { Time, Temperature } = props
        return (
            <tr>
                <td>{Time}</td>
                <td>{Temperature}</td>

            </tr>
        )
    }
    const Table = (props) => {
        const { data } = props
        return (
            <table class="table table-striped table-bordered table-sm" id='Table'>
                <tbody>
                    <Header />
                    {data.map(row =>
                        <Row Time={row.Time} Temperature={row.Temperature} />
                    )}
                </tbody>
            </table>
        )
    }
    const [rows, setRows] = useState(monthData)




    return (
        <>


            <div className="Dashboard" >
                <div className="container">

                    <div className='left'>

                        <h4>Time and Temperature Table</h4>
                        <Table data={rows} />
                    </div>
                    {/* <div> */}
                    <div className='right'>

                        <h4>Time and Temperature</h4>

                        <ResponsiveContainer width={600} height={250} aspect={3} className='graph' >
                            <LineChart data={monthData}>
                                <Line dataKey='Temperature' stroke='red' />
                                <Legend />
                                <XAxis dataKey='Time' interval={'preserveStartEnd'} />
                                <YAxis dataKey='Temperature' interval={'preserveStartEnd'} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>

            </div>
        </>
    )
}
import React, { useState } from 'react'
import './Graph&Table.css'
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis } from 'recharts';


export default function Week() {




    function getZeroTimeOfWeek() {
        let today = new Date();
        var week = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000);
        week.setHours(0, 0, 0, 0);
        return week;
    }



    function addDateWeek(plus) {
        let week = getZeroTimeOfWeek();
        week.setDate(week.getDate() + plus);
        return week;
    }



    const weekData = []
    var ranWeek = [];


    const wmin = getZeroTimeOfWeek().getTime();
    const wmax = addDateWeek(1).getTime() - 1;



    for (let k = 0; k < 10; k++) {

        var weektime = Math.round(Math.random() * (wmax - wmin) + wmin);
        ranWeek.push(weektime);

    }
    ranWeek.sort();






    for (let i = 0; i < 10; i++) {
        var temp = Math.round(Math.random() * (450 - 220) + 220);
        temp = temp / 10;

        var w = new Date(ranWeek[i])
        console.log("week", w);
        var y = w.getHours() + ":" + w.getMinutes();

        weekData.push({
            Time: y,
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
    const [rows, setRows] = useState(weekData)




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
                            <LineChart data={weekData}>
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
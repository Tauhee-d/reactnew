import React, { useState } from 'react'
import './Graph&Table.css'
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis } from 'recharts';
import Button from './Button';


export default function Day() {


    function getZeroTime() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }



    function addDate(plus) {
        let today = getZeroTime();
        today.setDate(today.getDate() + plus);
        return today;
    }


    const Data = []

    var ranTime = [];


    const min = getZeroTime().getTime();
    const max = addDate(1).getTime() - 1;


    for (let k = 0; k < 10; k++) {
        var time = Math.round(Math.random() * (max - min) + min);
        ranTime.push(time);

    }
    ranTime.sort();







    for (let i = 0; i < 10; i++) {
        var temp = Math.round(Math.random() * (450 - 220) + 220);
        temp = temp / 10;

        var d = new Date(ranTime[i]);

        console.log("day", d);
        // console.log("week", w);
        // console.log("month", m);
        var x = d.getHours() + ":" + d.getMinutes();

        Data.push({
            Time: x,
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
    const [rows, setRows] = useState(Data)




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
                            <LineChart data={Data}>
                                <Line dataKey='Temperature' stroke='red' />
                                <Legend />
                                <XAxis dataKey='Time' interval={'preserveStartEnd'} />
                                <YAxis dataKey='Temperature' interval={'preserveStartEnd'} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                        {/* <Button /> */}
                        {/* <div className="button-group">
                            <div className="button">
                                <button type="button" class="btn btn-primary">Day</button>
                            </div>
                            <div className="button">
                                <button type="button" class="btn btn-primary">Week</button>
                            </div>
                            <div className="button">
                                <button type="button" class="btn btn-primary">Month</button>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
        </>
    )
}




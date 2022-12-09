// import React, { useState } from 'react'
// import './Dashboard.css'
// import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis } from 'recharts';


// export default function Dashboard() {


//   function getZeroTime() {
//     let today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return today;
//   }

//   function getZeroTimeOfWeek() {
//     let today = new Date();
//     var week = new Date(today.getTime() - 60 * 60 * 24 * 7 * 1000);
//     week.setHours(0, 0, 0, 0);
//     return week;
//   }

//   function getZeroTimeOfMonth() {
//     let today = new Date();
//     var month = new Date(today.getTime() - 60 * 60 * 24 * 30 * 1000);
//     month.setHours(0, 0, 0, 0);
//     return month;
//   }

//   function addDate(plus) {
//     let today = getZeroTime();
//     today.setDate(today.getDate() + plus);
//     return today;
//   }

//   function addDateWeek(plus) {
//     let week = getZeroTimeOfWeek();
//     week.setDate(week.getDate() + plus);
//     return week;
//   }

//   function addDateMonth(plus) {
//     let month = getZeroTimeOfMonth();
//     month.setDate(month.getDate() + plus);
//     return month;
//   }

//   const Data = []
//   const weekData = []
//   const monthData = []
//   var ranTime = [];
//   var ranWeek = [];
//   var ranMonth = [];

//   const min = getZeroTime().getTime();
//   const max = addDate(1).getTime() - 1;

//   const wmin = getZeroTimeOfWeek().getTime();
//   const wmax = addDateWeek(1).getTime() - 1;

//   const mmin = getZeroTimeOfMonth().getTime();
//   const mmax = addDateMonth(1).getTime() - 1;

//   for (let k = 0; k < 10; k++) {
//     var time = Math.round(Math.random() * (max - min) + min);
//     ranTime.push(time);
//     var weektime = Math.round(Math.random() * (wmax - wmin) + wmin);
//     ranWeek.push(weektime);
//     var monthtime = Math.round(Math.random() * (mmax - mmin) + mmin);
//     ranMonth.push(monthtime);
//   }
//   ranTime.sort();
//   ranWeek.sort();
//   ranMonth.sort();






//   for (let i = 0; i < 10; i++) {
//     var temp = Math.round(Math.random() * (450 - 220) + 220);
//     temp = temp / 10;

//     var d = new Date(ranTime[i]);
//     var w = new Date(ranWeek[i])
//     var m = new Date(ranMonth[i])
//     console.log("day", d);
//     console.log("week", w);
//     console.log("month", m);
//     var x = d.getHours() + ":" + d.getMinutes();
//     var y = w.getHours() + ":" + w.getMinutes();
//     var z = m.getHours() + ":" + m.getMinutes();
//     Data.push({
//       Time: x,
//       Temperature: temp
//     })
//     weekData.push({
//       Time: y,
//       Temperature: temp
//     })
//     monthData.push({
//       Time: z,
//       Temperature: temp
//     })
//   }






//   //  Time Temperature Table 

//   const Header = () => {
//     return (
//       <tr className='Heading' >
//         <th>Time</th>
//         <th>Temp</th>


//       </tr>
//     )
//   }
//   const Row = (props) => {
//     const { Time, Temperature } = props
//     return (
//       <tr>
//         <td>{Time}</td>
//         <td>{Temperature}</td>

//       </tr>
//     )
//   }
//   const Table = (props) => {
//     const { data } = props
//     return (
//       <table class="table table-striped table-bordered table-sm" id='Table'>
//         <tbody>
//           <Header />
//           {data.map(row =>
//             <Row Time={row.Time} Temperature={row.Temperature} />
//           )}
//         </tbody>
//       </table>
//     )
//   }
//   const [rows, setRows] = useState(monthData)




//   return (
//     <>


//       <div className="Dashboard" >
//         <div className="container">

//           <div className='left'>

//             <h4>Time and Temperature Table</h4>
//             <Table data={rows} />
//           </div>
//           {/* <div> */}
//           <div className='right'>

//             <h4>Time and Temperature</h4>

//             <ResponsiveContainer width={600} height={250} aspect={3} className='graph' >
//               <LineChart data={monthData}>
//                 <Line dataKey='Temperature' stroke='red' />
//                 <Legend />
//                 <XAxis dataKey='Time' interval={'preserveStartEnd'} />
//                 <YAxis dataKey='Temperature' interval={'preserveStartEnd'} />
//                 <Tooltip />
//               </LineChart>
//             </ResponsiveContainer>
//             <div className="button-group">
//               <div className="button">
//                 <button type="button" class="btn btn-primary">Day</button>
//               </div>
//               <div className="button">
//                 <button type="button" class="btn btn-primary">Week</button>
//               </div>
//               <div className="button">
//                 <button type="button" class="btn btn-primary">Month</button>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   )
// }

import React, { useState } from 'react'
import './Dashboard.css'
import Day from '../../pages/Graph&Table/Day'
import Week from '../../pages/Graph&Table/Week'
import Month from '../../pages/Graph&Table/Month'

function Dashboard() {
  const [active, setActive] = useState("dayData")
  return (
    <div className='Dashboard'>


      <div>
        {active === "dayData" && <Day />}
        {active === "weekData" && <Week />}
        {active === "monthData" && <Month />}
      </div>

      <nav className='button-group'>
        <button className='button' onClick={() => setActive("dayData")} >Day</button>
        <button className='button' onClick={() => setActive("weekData")} >Week</button>
        <button className='button' onClick={() => setActive("monthData")} >Month</button>
      </nav>
    </div>
  )
}

export default Dashboard


import React, { useState } from 'react'
import { useTable, usePagination } from "react-table";
import { useMemo } from "react";
import './Graph&Table.css'
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis,Brush } from 'recharts';
import Topbar from '../../components/Topbar/Topbar';
// import DashProfile from '../../';
import DashProfile from '../Dashboard/DashProfile';
import {
 
    Card,
   
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
// import DashProfile from '../Profile/DashProfile';


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



    for (let k = 0; k < 70; k++) {

        var weektime = Math.round(Math.random() * (wmax - wmin) + wmin);
        ranWeek.push(weektime);

    }
    ranWeek.sort();






    for (let i = 0; i < 70; i++) {
        var temp = Math.round(Math.random() * (450 - 220) + 220);
        temp = temp / 10;

        var w = new Date(ranWeek[i])
        console.log("week", w);
        var y = w.getDate() + "/" + w.getMonth() + " "+ w.getHours() + ":" + w.getMinutes();

        weekData.push({
            Time: y,
            Temperature: temp
        })

    }






    //  Time Temperature Table 

    // const Header = () => {
    //     return (
    //         <tr className='Heading' >
    //             <th>Time</th>
    //             <th>Temperature</th>
               
    
    //         </tr>
    //     )
    // }
    // const Rows = (props) => {
    //     const { Time, Temperature } = props
    //     return (
    //         <tr>
    
    //             <td className='tabledata'>{Time}</td>
    //             <td className='tabledata'>{Temperature}</td>
              
    
    
    
    
              
    //         </tr>
    //     )
       
    // }
    // const RowTable = (props) => {
    //     const { data } = props
    //     console.log(data);
    //     return (
    //        <>
    //                 {data.map(row =>
    //                     <Rows Time={row.Time} Temperature={row.Temperature}  />
    //                 )}
    //           </>
    //     )
    // }
    // const [rows, setRows] = useState(weekData)

    const [data, setData] = useState(weekData);

    const columns = useMemo(
      () => [
        {
          Header: "Time",
          accessor: "Time",
        },
        {
          Header: "Temperature",
          accessor: "Temperature",
        },
      ],
      [data]
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      pageIndex,
      pageOptions,
      previousPage,
      canPreviousPage,
      nextPage,
      canNextPage,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      usePagination
    );

    return (
        <>

<div className="containers">
      <div>
        <Topbar />
        <div style={{ marginTop: "20px", }}>
          <DashProfile />
          
        </div>
        <div style={{ margin: "15px",backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>
        <h4 style={{margin:'40px'}}>Graph</h4>
          <ResponsiveContainer
            width={"100%"}
            aspect={3}
            className="graph"
          >
            <LineChart data={weekData}>
              <Line dataKey="Temperature" stroke="red" />
              <Line dataKey="Date" stroke="blue" />
              <Legend />
              <XAxis dataKey="Time" interval={"preserveStartEnd"} />
              <YAxis dataKey="Temperature" interval={"preserveStartEnd"} />
              <Tooltip />
              <Brush height={30}  />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ margin: "15px",backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px',padding:'20px' }}>
          <h4>Time and Temperature Table</h4>
          {/* <Container fluid>
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
      </Container>     */}
      
      <table className="table-hover" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <span>
              Page{" "}
              <strong>
                {pageIndex+1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button style={{width:'200px', marginLeft:'20px'}} onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button style={{width:'200px', marginLeft:'20px'}} onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>


          </div>
      </div>
    </div>
        </>
    )
}
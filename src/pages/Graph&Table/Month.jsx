import React, { useState } from 'react'
import './Graph&Table.css'
import { LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis } from 'recharts';
import Topbar from '../../components/Topbar/Topbar';
import DashProfile from '../Dashboard/DashProfile';
import {
 
    Card,
   
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

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

        // var z = m.getHours() + ":" + m.getMinutes();
        var z = m.getDate() + "/" + m.getMonth() + " "+ m.getHours() + ":" + m.getMinutes();


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
                <th>Temperature</th>
               
    
            </tr>
        )
    }
    const Rows = (props) => {
        const { Time, Temperature } = props
        return (
            <tr>
    
                <td className='tabledata'>{Time}</td>
                <td className='tabledata'>{Temperature}</td>
              
    
    
    
    
              
            </tr>
        )
       
    }
    const RowTable = (props) => {
        const { data } = props
        console.log(data);
        return (
           <>
                    {data.map(row =>
                        <Rows Time={row.Time} Temperature={row.Temperature}  />
                    )}
              </>
        )
    }
    const [rows, setRows] = useState(monthData)




    return (
        <>


<div className="containers">
      <div>
        <Topbar />
        <div style={{ marginTop: "20px", }}>
          <DashProfile />
        </div>
        <div style={{ margin: "15px",backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>
          <h4>Time and Temperature</h4>
          <ResponsiveContainer
            width={"100%"}
            aspect={3}
            className="graph"
          >
            <LineChart data={monthData}>
              <Line dataKey="Temperature" stroke="red" />
              <Legend />
              <XAxis dataKey="Time" interval={"preserveStartEnd"} />
              <YAxis dataKey="Temperature" interval={"preserveStartEnd"} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ margin: "15px",backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px',padding:'20px' }}>
          <h4>Time and Temperature Table</h4>
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
      </Container>          </div>
      </div>
    </div>
        </>
    )
}
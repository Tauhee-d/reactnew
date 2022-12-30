import React, { useState } from "react";
import "./Graph&Table.css";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
 
  Card,
 
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Topbar from "../../components/Topbar/Topbar";
import DashProfile from '../Dashboard/DashProfile';

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

  const Data = [];

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
      Temperature: temp,
    });
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
  const [rows, setRows] = useState(Data);

  return (
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
            <LineChart data={Data}>
              <Line dataKey="Temperature" stroke="red" />
              <Legend />
              <XAxis dataKey="Time" interval={"preserveStartEnd"} />
              <YAxis dataKey="Temperature" interval={"preserveStartEnd"} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* <div style={{ margin: "15px",backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px',padding:'20px' }}>
          <h4>Time and Temperature Table</h4>
          <Table data={rows}  />
        </div> */}
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
      </Container>
        </div>
       
      </div>
    </div>
  );
}

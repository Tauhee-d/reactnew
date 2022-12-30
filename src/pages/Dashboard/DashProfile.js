import React from 'react'
import {Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

export default function DashProfile() {
  return (
    <div>
        <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4"> Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                       
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

                          xyz
                        </p>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        {/* <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control> */}
                         <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

xyz@gmail.com
</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

                          xyz
                        </p>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

                          xyz
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                       
                         <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

                         Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09
</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                         <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

bangalore</p>
xyz                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

xyz</p>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>

1234</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        "Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                        <p style={{ backgroundColor:'white',border: '1px solid #dee2e6',borderRadius:'4px' }}>
                        "Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button> */}
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}



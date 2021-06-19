import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Form, Button, Container, Row, Col, Table } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import getInvolvedPhoto from "./static/getinvolved-photo.jpg";

class GetInvolved extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/get-involved");
        document.title = "GSGGB U of T | Get Involved";
    }

    state = {
    };

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <div className="getinvolved-photo-container">
                    <Image className="getinvolved-photo" alt="2018-2019 Conference Q&A" src={getInvolvedPhoto} />
                    <span className="getinvolved-photo-title">
                        Get Involved
                        <h3 className="getinvolved-photo-subtitle">
                            (Applications for Fall 2021 - Winter 2022)
                        </h3>
                    </span>
                    <Container>
                      <Row>
                        <Col md="6" className="form">
                          <Form>
                              <br />
                              <Form.Group>
                                <Form.Label className="headers">Name</Form.Label>
                                <Form.Control type="text" placeholder="First and last name" />
                              </Form.Group>
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label className="headers">Email address</Form.Label>
                                <Form.Control type="email" placeholder="Your email" />
                                <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                              </Form.Group>
                              <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label className="headers">Year of study</Form.Label>
                                <Form.Control as="select">
                                  <option>1st year</option>
                                  <option>2nd year</option>
                                  <option>3rd year</option>
                                  <option>4th year</option>
                                  <option>Others</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">Program of Study</Form.Label>
                                <Form.Control type="text" placeholder="Your program of study" />
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">We sometimes have meetings to discuss club affairs or meetup for an event we planned. What days are you going to be free?</Form.Label>
                                <Table>
                                  <thead>
                                    <tr>
                                      <th>Day of the Week</th>
                                      <th>Morning</th>
                                      <th>Afternoon</th>
                                      <th>Evening</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        Monday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Tuesday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Wednesday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Thursday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Friday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Saturday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Sunday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="option 1" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Form.Group>
                              <Button variant="primary" type="submit">
                                Submit
                              </Button>
                            </Form>
                          </Col>
                      </Row>
                      <br />
                    </Container>
                </div>

            </BrowserRouter>
        );
    }
}

export default GetInvolved;

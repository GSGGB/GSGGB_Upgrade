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
                        <Col md="8" className="form">
                          <br />
                          <p className="description">
                          Thank you for your interest in Global Society for Genetics and Genome Biology (GSGGB). We are the campus's largest Life Sciences club and would like you to join our team! Please complete this form and we'll contact you as soon as possible.<br />
                          </p>
                          <Form>
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
                                  <option value="1">1st year</option>
                                  <option value="2">2nd year</option>
                                  <option value="3">3rd year</option>
                                  <option value="4">4th year</option>
                                  <option value="others">Others</option>
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
                                      <th></th>
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
                                        <Form.Check aria-label="monday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="monday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="monday night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Tuesday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="tuesday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="tuesday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="tuesdy night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Wednesday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="wednesday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="wednesday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="wednesday night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Thursday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="thursday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="thursday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="thursday night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Friday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="friday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="friday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="friday night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Saturday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="saturday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="saturday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="saturday night" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Sunday
                                      </td>
                                      <td>
                                        <Form.Check aria-label="sunday morning" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="sunday afternoon" />
                                      </td>
                                      <td>
                                        <Form.Check aria-label="sunday night" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">Which sub-team would you like to apply to?</Form.Label>
                                <Form.Control as="select">
                                  <option value="marketing">Marketing</option>
                                  <option value="affairs">Affairs</option>
                                  <option value="mentorship">Mentorship</option>
                                  <option value="events">Events</option>
                                  <option value="tech">Tech and Innovation</option>
                                  <option value="conference">Conference Committee</option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">Which position would you like to apply for ?</Form.Label>
                                <Table>
                                  <thead>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <b>Marketing</b>
                                      </td>
                                      <td>
                                        The marketing team is responsible for promoting the club through social media, class announcements and also designing posters, images or other promotional items.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="graphic">Graphic Designer</option>
                                          <option value="social-media">Social Media Coordinator</option>
                                          <option value="academic-affairs">Academic Affairs Director</option>
                                          <option value="videography">Videographer/Photographer</option>
                                          <option value="second-year">2nd Year Representative</option>
                                          <option value="first-year">1st Year Representative</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <b>Affairs</b>
                                      </td>
                                      <td>
                                        The affairs team oversees the internal and external relations of the club. They are responsible for communication and maintaining a budget.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="affairs-exec">Affairs Executive</option>
                                          <option value="treasurer">Treasurer</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <b>Mentorship</b>
                                      </td>
                                      <td>
                                      The mentorship associate assists the mentorship leader with setting up mentor-mentee groups and helping incoming students with various university aspects that might be new to them. Our vision for the mentorship program is to instill and intersect passion for science, research, and student empowerment to improve the quality of life for incoming University students at the University of Toronto.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="associate">Mentorship Associate</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <b>Events</b>
                                      </td>
                                      <td>
                                      The events team is responsible for organizing our monthly events. They especially handle fundraising events where we raise money to donate or to get funding for the club. The team is also responsible for organizing academic events open to the entire campus.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="social-events">Social Events Coordinator</option>
                                          <option value="fundraising">Fundraising Event Coordinator</option>
                                          <option value="academic-event">Academic Event Coordinator</option>
                                          <option value="event-marketing">Event / Marketing Liaison</option>
                                          <option value="team-member">Event Team Member</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <b>Tech and Innovation</b>
                                      </td>
                                      <td>
                                        The tech team is responsible for maintaining and updating the website and leading our bioinformatics events.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="webmaster">Webmaster</option>
                                          <option value="bioinformatics-lead">Bioinformatics Project Lead</option>
                                          <option value="workshop-organizer">Workshop Organizer</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <b>Conference Committee</b>
                                      </td>
                                      <td>
                                        Our annual conference is our biggest event of the year. The conference committee is responsible for organizing various aspect of the conference such as communication with the speakers, room booking and advertisement.
                                      </td>
                                      <td>
                                        <Form.Control as="select">
                                          <option value="senior-outreach">Senior Outreach Officer</option>
                                          <option value="junior-outreach">Junior Outreach Officer</option>
                                          <option value="communications">Communications Officer</option>
                                          <option value="senior-event">Senior Event Coordinator</option>
                                          <option value="junior-event">Junior Event Coordinator</option>
                                          <option value="social-media">Social Media Coordinator</option>
                                          <option value="fundraising">Fundraising Event Coordinator</option>
                                          <option value="senior-graphics">Senior Graphics Designer</option>
                                          <option value="junior-graphics">Junior Graphics Designer</option>
                                        </Form.Control>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Form.Group>
                              <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="headers">Tell us why you would like to be part of the GSGGB and this specific position in the team.</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">Please update a copy of your resume or cover letter.</Form.Label>
                                <Form.File id="exampleFormControlFile1" label="Example file input" />
                              </Form.Group>
                              <Form.Group>
                                <Form.Label className="headers">Please provide a copy of your photo.</Form.Label>
                                <Form.File id="exampleFormControlFile1" label="Example file input" />
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

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col, Card, Button, Form, Image, Table } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import getInvolvedPhoto from "./static/getinvolved-photo.jpg";

import { addPositionOptions } from "../../actions/position";
import { updateApplicantForm, sendApplication } from "../../actions/applicant";
import { updateResumeFile } from "../../actions/resume";

class GetInvolved extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/get-involved");
        document.title = "GSGGB U of T | Get Involved";

        this.state = {
            affairsPositions: [],
            conferencePositions: [],
            eventsPositions: [],
            marketingPositions: [],
            mentorshipPositions: [],
            techPositions: [],
            lastUpdated: "",
            dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            timeOptions: { hour: '2-digit', minute:'2-digit' }
        }
    }

    componentDidMount(){
        addPositionOptions(this);
    }

    state = {
        resumeFile: "",
        resumeId: "",
        applicantFullName: "",
        applicantEmail: "",
        applicantYear: "Year 1", // Default option.
        applicantProgram: "",
        applicantFridays: "No", // Default option.
        applicantTeam: "Affairs", // Default option.
        applicantPosition: "",
        applicantOtherPositions: "N/A", // Default option.
        applicantStatement: ""
    };

    // Display available positions for particular team after it has been chosen by the user.
    componentDidUpdate(prevState){
        if (this.state.applicantTeam !== prevState.applicantTeam){
            const affairs = document.querySelector("#affairs-applicant-positions");
            const conference = document.querySelector("#conference-applicant-positions");
            const events = document.querySelector("#events-applicant-positions");
            const marketing = document.querySelector("#marketing-applicant-positions");
            const mentorship = document.querySelector("#mentorship-applicant-positions");
            const tech = document.querySelector("#tech-applicant-positions");

            if (this.state.applicantTeam === "Affairs"){
                affairs.style.display = "block";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeam === "Conference Committee"){
                affairs.style.display = "none";
                conference.style.display = "block";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeam === "Events"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "block";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeam === "Marketing"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "block";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeam === "Mentorship"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "block";
                tech.style.display = "none";

            } else if (this.state.applicantTeam === "Tech & Innovations"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "block";
            }
        }
    }

    render() {
        // Load position options for each team to populate in form.
        var affairsOptions = (this.state.affairsPositions).map((title) => { return (<option value={title}>{title}</option>) });
        var conferenceOptions = (this.state.conferencePositions).map((title) => { return (<option value={title}>{title}</option>) });
        var eventsOptions = (this.state.eventsPositions).map((title) => { return (<option value={title}>{title}</option>) });
        var marketingOptions = (this.state.marketingPositions).map((title) => { return (<option value={title}>{title}</option>) });
        var mentorshipOptions = (this.state.mentorshipPositions).map((title) => { return (<option value={title}>{title}</option>) });
        var techOptions = (this.state.techPositions).map((title) => { return (<option value={title}>{title}</option>) });

        const lastUpdatedText = (
            "Last updated as of " + (new Date(this.state.lastUpdated)).toLocaleDateString('en-US', this.state.dateOptions) + " " +
            (new Date(this.state.lastUpdated)).toLocaleTimeString('en-US', this.state.timeOptions)
        );

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
                </div>

                <div className="container">
                    <br/><br/><br/>
                    <Card>
                        <Card.Header className="applicant-card-header">
                            Thank you for your interest in the Global Society for Genetics and Genome Biology (GSGGB).
                            We are one of the campus' largest Life Sciences organizations and we would like you to join our team!
                            Please complete this form and we'll contact you as soon as possible.
                            <br/><br/>
                            <small className="text-muted">{lastUpdatedText}</small>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                          <Form.Label className="applicant-form-header">Full name</Form.Label>
                                          <Form.Control
                                              name="applicantFullName"
                                              as="textarea"
                                              rows="1"
                                              placeholder="Your first and last name"
                                              onChange={e => updateApplicantForm(this, e.target)}
                                              required />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="applicant-form-header">Email address (preferably school)</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="applicantEmail"
                                                rows="1"
                                                placeholder="Your email address"
                                                onChange={e => updateApplicantForm(this, e.target)}
                                                required />
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label className="applicant-form-header">Year of study</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="applicantYear"
                                                onChange={e => updateApplicantForm(this, e.target)}
                                                required
                                            >
                                                <option value="1">Year 1</option>
                                                <option value="2">Year 2</option>
                                                <option value="3">Year 3</option>
                                                <option value="4">Year 4</option>
                                                <option value="5">Year 5</option>
                                                <option value="Masters">Masters</option>
                                                <option value="PhD">PhD</option>
                                                <option value="Other">Other</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="applicant-form-header">Program of Study (POSt)/Major</Form.Label>
                                            <Form.Control
                                                name="applicantProgram"
                                                as="textarea"
                                                rows="1"
                                                placeholder="Your program of study and/or major"
                                                onChange={e => updateApplicantForm(this, e.target)}
                                                required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <br/>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">
                                        We have weekly or biweekly meetings to discuss club affairs on Friday afternoons.
                                        Are you available on Fridays (from 4-6 PM preferably)?
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="applicantFridays"
                                        onChange={e => updateApplicantForm(this, e.target)}
                                        required
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Form.Control>
                                </Form.Group>

                                <br/><hr/><br/>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">
                                        Which team would you like to apply to? Click on a team name to learn more! (If dropdown
                                        is blank, no positions are currently available for that particular team.)
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="applicantTeam"
                                        onChange={e => updateApplicantForm(this, e.target)}
                                        required
                                    >
                                        <option value="Affairs">Affairs</option>
                                        <option value="Conference Committee">Conference Committee</option>
                                        <option value="Events">Events</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Mentorship">Mentorship</option>
                                        <option value="Tech & Innovations">Tech & Innovations</option>
                                    </Form.Control>
                                </Form.Group>

                                <br/>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">Which position would you like to apply for?</Form.Label>
                                    <Table>
                                        <tbody>

                                            <tr id="affairs-applicant-positions">
                                                <td className="col-sm-2"><b>Affairs</b></td>
                                                <td className="col-sm-7">
                                                    The affairs team oversees the internal and external relations of the club.
                                                    They are responsible for communication and maintaining a budget.
                                                </td>
                                                <td className="col-sm-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="applicantPosition"
                                                        onChange={e => updateApplicantForm(this, e.target)}
                                                    >
                                                        <option value=""></option>
                                                        {affairsOptions}
                                                    </Form.Control>
                                                </td>
                                            </tr>

                                            <tr id="conference-applicant-positions">
                                                <td className="col-sm-2"><b>Conference Committee</b></td>
                                                <td className="col-sm-7">
                                                    Our annual conference is our biggest event of the year. The conference committee
                                                    is responsible for organizing various aspect of the conference such as communication
                                                    with the speakers, room booking and advertisement.
                                                </td>
                                                <td className="col-sm-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="applicantPosition"
                                                        onChange={e => updateApplicantForm(this, e.target)}
                                                    >
                                                        <option value=""></option>
                                                        {conferenceOptions}
                                                    </Form.Control>
                                                </td>
                                            </tr>

                                            <tr id="events-applicant-positions">
                                                <td className="col-sm-2"><b>Events</b></td>
                                                <td className="col-sm-7">
                                                    The events team is responsible for organizing our monthly events. They especially
                                                    handle fundraising events where we raise money to donate or to get funding for
                                                    the club. The team is also responsible for organizing academic events open to
                                                    the entire campus.
                                                </td>
                                                <td className="col-sm-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="applicantPosition"
                                                        onChange={e => updateApplicantForm(this, e.target)}
                                                    >
                                                        <option value=""></option>
                                                        {eventsOptions}
                                                    </Form.Control>
                                                </td>
                                            </tr>

                                            <tr id="marketing-applicant-positions">
                                                <td className="col-sm-2"><b>Marketing</b></td>
                                                <td className="col-sm-7">
                                                    The marketing team is responsible for promoting the club through social media,
                                                    class announcements and also designing posters, images or other promotional items.
                                                </td>
                                                <td className="col-sm-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="applicantPosition"
                                                        onChange={e => updateApplicantForm(this, e.target)}
                                                    >
                                                        <option value=""></option>
                                                        {marketingOptions}
                                                    </Form.Control>
                                                </td>
                                            </tr>

                                            <tr id="mentorship-applicant-positions">
                                                <td className="col-sm-2"><b>Mentorship</b></td>
                                                <td className="col-sm-7">
                                                    The mentorship associates assist the mentorship leader with setting up mentor-mentee
                                                    groups and helping incoming students with various university aspects that might be
                                                    new to them. Our vision for the mentorship program is to instill and intersect passion
                                                    for science, research, and student empowerment to improve the quality of life for
                                                    incoming University students at the University of Toronto.
                                                </td>
                                                <td className="col-sm-3">
                                                  <Form.Control
                                                      as="select"
                                                      name="applicantPosition"
                                                      onChange={e => updateApplicantForm(this, e.target)}
                                                  >
                                                      <option value=""></option>
                                                      {mentorshipOptions}
                                                  </Form.Control>
                                                </td>
                                            </tr>

                                            <tr id="tech-applicant-positions">
                                                <td className="col-sm-2"><b>Tech & Innovations</b></td>
                                                <td className="col-sm-7">
                                                    The tech & innovations team is responsible for maintaining and updating the website
                                                    and leading our bioinformatics events and coding workshops.
                                                </td>
                                                <td className="col-sm-3">
                                                    <Form.Control
                                                        as="select"
                                                        name="applicantPosition"
                                                        onChange={e => updateApplicantForm(this, e.target)}
                                                    >
                                                        <option value=""></option>
                                                        {techOptions}
                                                    </Form.Control>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                </Form.Group>

                                <br/>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">
                                        If you are also interested in other positions, please list them here (and their respective team).
                                    </Form.Label>
                                    <Form.Control
                                        name="applicantOtherPositions"
                                        as="textarea"
                                        rows="1"
                                        placeholder="List other interested positions here"
                                        onChange={e => updateApplicantForm(this, e.target)}
                                        required />
                                </Form.Group>

                                <br/><hr/><br/>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">
                                        Tell us why you would like to be a part of GSGGB and why you are a strong candidate for the
                                        position(s) selected.
                                    </Form.Label>
                                    <Form.Control
                                        name="applicantStatement"
                                        as="textarea"
                                        rows="5"
                                        placeholder="Your statement"
                                        onChange={e => updateApplicantForm(this, e.target)}
                                        required />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="applicant-form-header">Please upload a copy of your resume (in PDF format).</Form.Label>
                                    <Form.File
                                        name="resumeFile"
                                        onChange={e => updateResumeFile(this, e.target)}
                                        required />
                                </Form.Group>

                                <br/><br/>

                                <div className="applicant-submission-note">
                                    NOTE: It may take several seconds for your submission to process successfully due to resume upload.
                                    Please wait until you receive two successive alerts to close your window.
                                </div>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sendApplication(this);
                                    }}
                                    >
                                        SUBMIT
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>

                    <br/><br/><br/>
                </div>

            </BrowserRouter>
        );
    }
}

export default GetInvolved;

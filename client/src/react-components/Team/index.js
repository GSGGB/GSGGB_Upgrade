import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import teamPhoto1819 from "./static/team-photo-18-19.jpg";

// Importing team actions/required methods.
import { updateImageFile } from "../../actions/image";
import { updateExecutiveForm, getAllExecutives, addExecutive } from "../../actions/executive";

class Team extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/team");
        document.title = "GSGGB U of T | Team";
    }

    state = {
        seniorStaffExecs: [],
        conferenceExecs: [],
        marketingExecs: [],
        affairsExecs: [],
        mentorshipExecs: [],
        eventsExecs: [],
        techExecs: [],
        jiggExecs: [],
        alumniExecs: [],
        displayExecModal: false,
        imageFile: "",
        imageId: "",
        execFirstName: "",
        execLastName: "",
        execTeam: "Senior Staff", // Default option.
        execPosition: "",
        execBiography: "",
        execLinkedin: "",
        execEmail: ""
    };

    componentDidMount(){
        getAllExecutives(this);
    }

    // Add executive button for editors and administrators only.
    addExecutiveButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (
          loggedIn === "true" &&
          (accountType === "Editor" || accountType === "Administrator")
        ) {
            return (
                <Button
                    id="add-exec-button"
                    variant="outline-info"
                    onClick={() => this.setState({ displayExecModal: true })}
                >
                    <FontAwesomeIcon icon={faPlus} size={20}/>
                </Button>
            )
        }
    }

    render() {
        const addExecutiveButton = this.addExecutiveButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="team-photo-container">
                    <Image className="team-photo" alt="2018-2019 GSGGB Executive Team" src={teamPhoto1819} />
                    <span className="team-photo-title">
                        Our Executive Team
                        <h3 className="team-photo-subtitle">
                            (Fall 2021 - Winter 2022)
                            {addExecutiveButton}
                        </h3>
                    </span>
                </div>

                <div className="team-section">
                    <h3 className="team-name" id="senior-staff">SENIOR STAFF</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.seniorStaffExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="conference">CONFERENCE</h3>
                    <br />
                    <div className="container" id="team-members">
                      <Row>
                          {this.state.conferenceExecs}
                      </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="marketing">MARKETING</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.marketingExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="affairs">AFFAIRS</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.affairsExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="mentorship">MENTORSHIP</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.mentorshipExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="events">EVENTS</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.eventsExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="tech-and-innovations">TECHNOLOGY &amp; INNOVATIONS</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.techExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="jigg">JIGG</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.jiggExecs}
                        </Row>
                    </div>
                    <br />


                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="alumni">ALUMNI</h3>
                    <br />
                    <div className="container" id="team-members">
                        <Row>
                            {this.state.alumniExecs}
                        </Row>
                    </div>
                    <br />

                    <hr className="team-section-separator" />
                    <br/><br/>
                </div>

                <Modal
                    show={this.state.displayExecModal}
                    onHide={() => this.setState({ displayExecModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new executive</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    label="Upload headshot (with square image orientation)"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="execFirstName"
                                    rows="1"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="execLastName"
                                    rows="1"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Team</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="execTeam"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                >
                                    <option>Senior Staff</option>
                                    <option>Conference Committee</option>
                                    <option>Marketing</option>
                                    <option>Affairs</option>
                                    <option>Mentorship</option>
                                    <option>Events</option>
                                    <option>Tech & Innovations</option>
                                    <option>JIGG</option>
                                    <option>Alumni</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="execPosition"
                                    rows="1"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Biography</Form.Label>
                                <Form.Control
                                    name="execBiography"
                                    as="textarea"
                                    placeholder="Add biography here..."
                                    rows="5"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>LinkedIn account (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="execLinkedin"
                                    rows="1"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Email address (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="execEmail"
                                    rows="1"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addExecutive(this);
                                    this.setState({ displayExecModal: false })
                                }}
                                >
                                    ADD
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </BrowserRouter>
        );
    }
}

export default Team;

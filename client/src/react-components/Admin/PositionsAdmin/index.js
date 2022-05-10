import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Card, Button, Dropdown, Accordion, Form, Modal, ModalBody } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalHeader from "react-bootstrap/ModalHeader";

import { updatePositionForm, getAllPositions, addPosition } from "../../../actions/position";

import "./styles.css";

class PositionsAdmin extends Component {
    state = {
        positionTeamDropdown: "Affairs", // Default value.
        affairsPositions: [],
        conferencePositions: [],
        eventsPositions: [],
        marketingPositions: [],
        mentorshipPositions: [],
        techPositions: [],
        displayPositionModal: false,
        positionTeam: "Affairs", // Default value.
        positionTitle: ""
    };

    componentDidMount(){
        getAllPositions(this);
    }

    // Display positions for particular team after selection by administrator.
    componentDidUpdate(prevState){
        if (this.state.positionTeamDropdown !== prevState.positionTeamDropdown){
            const affairs = document.querySelector("#affairs-position-accordion");
            const conference = document.querySelector("#conference-position-accordion");
            const events = document.querySelector("#events-position-accordion");
            const marketing = document.querySelector("#marketing-position-accordion");
            const mentorship = document.querySelector("#mentorship-position-accordion");
            const tech = document.querySelector("#tech-position-accordion");

            if (this.state.positionTeamDropdown === "Affairs"){
                affairs.style.display = "block";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.positionTeamDropdown === "Conference Committee"){
                affairs.style.display = "none";
                conference.style.display = "block";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.positionTeamDropdown === "Events"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "block";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.positionTeamDropdown === "Marketing"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "block";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.positionTeamDropdown === "Mentorship"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "block";
                tech.style.display = "none";

            } else if (this.state.positionTeamDropdown === "Tech & Innovations"){
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
        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Card>
                        <Card.Header className="position-card-header">
                            <Row>
                                <DropdownButton
                                    variant="info"
                                    id="position-team-dropdown"
                                    title="FILTER: Choose team"
                                    onSelect={e => this.setState({ positionTeamDropdown: e })}
                                >
                                      <Dropdown.Item eventKey="Affairs">Affairs</Dropdown.Item>
                                      <Dropdown.Item eventKey="Conference Committee">Conference Committee</Dropdown.Item>
                                      <Dropdown.Item eventKey="Events">Events</Dropdown.Item>
                                      <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
                                      <Dropdown.Item eventKey="Mentorship">Mentorship</Dropdown.Item>
                                      <Dropdown.Item eventKey="Tech & Innovations">Tech & Innovations</Dropdown.Item>
                                </DropdownButton>

                                <div className="position-team-selected">
                                    {this.state.positionTeamDropdown} Team selected
                                </div>
                            </Row>
                            <Row>
                                <Button
                                    id="add-position-button"
                                    variant="success"
                                    onClick={() => this.setState({ displayPositionModal: true })}>
                                    Add new position title
                                </Button>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Accordion id="affairs-position-accordion">
                                {this.state.affairsPositions}
                            </Accordion>

                            <Accordion id="conference-position-accordion">
                                {this.state.conferencePositions}
                            </Accordion>

                            <Accordion id="events-position-accordion">
                                {this.state.eventsPositions}
                            </Accordion>

                            <Accordion id="marketing-position-accordion">
                                {this.state.marketingPositions}
                            </Accordion>

                            <Accordion id="mentorship-position-accordion">
                                {this.state.mentorshipPositions}
                            </Accordion>

                            <Accordion id="tech-position-accordion">
                                {this.state.techPositions}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </div>

                <Modal
                    show={this.state.displayPositionModal}
                    onHide={() => this.setState({ displayPositionModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new position title</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label>Position team</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="positionTeam"
                                    onChange={e => updatePositionForm(this, e.target)}
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
                                <Form.Label>Position title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="positionTitle"
                                    rows="1"
                                    onChange={e => updatePositionForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addPosition(this);
                                    this.setState({ displayPositionModal: false });
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

export default PositionsAdmin;

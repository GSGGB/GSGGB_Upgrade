import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Card, Dropdown, Accordion } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

import { getAllApplicants } from "../../../actions/applicant";

import "./styles.css";

class ApplicationsAdmin extends Component {
    state = {
        applicantTeamDropdown: "Affairs", // Default value.
        affairsApplicants: [],
        conferenceApplicants: [],
        eventsApplicants: [],
        marketingApplicants: [],
        mentorshipApplicants: [],
        techApplicants: []
    };

    componentDidMount(){
        getAllApplicants(this);
    }

    // Display applicants for particular team after selection by administrator.
    componentDidUpdate(prevState){
        if (this.state.applicantTeamDropdown !== prevState.applicantTeamDropdown){
            const affairs = document.querySelector("#affairs-applicant-accordion");
            const conference = document.querySelector("#conference-applicant-accordion");
            const events = document.querySelector("#events-applicant-accordion");
            const marketing = document.querySelector("#marketing-applicant-accordion");
            const mentorship = document.querySelector("#mentorship-applicant-accordion");
            const tech = document.querySelector("#tech-applicant-accordion");

            if (this.state.applicantTeamDropdown === "Affairs"){
                affairs.style.display = "block";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeamDropdown === "Conference Committee"){
                affairs.style.display = "none";
                conference.style.display = "block";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeamDropdown === "Events"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "block";
                marketing.style.display = "none";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeamDropdown === "Marketing"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "block";
                mentorship.style.display = "none";
                tech.style.display = "none";

            } else if (this.state.applicantTeamDropdown === "Mentorship"){
                affairs.style.display = "none";
                conference.style.display = "none";
                events.style.display = "none";
                marketing.style.display = "none";
                mentorship.style.display = "block";
                tech.style.display = "none";

            } else if (this.state.applicantTeamDropdown === "Tech & Innovations"){
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
                        <Card.Header className="applicant-card-header">
                            <Row>
                                <DropdownButton
                                    variant="info"
                                    id="applicant-team-dropdown"
                                    title="FILTER: Choose team"
                                    onSelect={e => this.setState({ applicantTeamDropdown: e })}
                                >
                                      <Dropdown.Item eventKey="Affairs">Affairs</Dropdown.Item>
                                      <Dropdown.Item eventKey="Conference Committee">Conference Committee</Dropdown.Item>
                                      <Dropdown.Item eventKey="Events">Events</Dropdown.Item>
                                      <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
                                      <Dropdown.Item eventKey="Mentorship">Mentorship</Dropdown.Item>
                                      <Dropdown.Item eventKey="Tech & Innovations">Tech & Innovations</Dropdown.Item>
                                </DropdownButton>
                                <div className="applicant-team-selected">
                                    {this.state.applicantTeamDropdown} Team selected
                                </div>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Accordion id="affairs-applicant-accordion">
                                {this.state.affairsApplicants}
                            </Accordion>

                            <Accordion id="conference-applicant-accordion">
                                {this.state.conferenceApplicants}
                            </Accordion>

                            <Accordion id="events-applicant-accordion">
                                {this.state.eventsApplicants}
                            </Accordion>

                            <Accordion id="marketing-applicant-accordion">
                                {this.state.marketingApplicants}
                            </Accordion>

                            <Accordion id="mentorship-applicant-accordion">
                                {this.state.mentorshipApplicants}
                            </Accordion>

                            <Accordion id="tech-applicant-accordion">
                                {this.state.techApplicants}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </div>
            </BrowserRouter>
        );
    }
}

export default ApplicationsAdmin;

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Card, Dropdown, Accordion } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

import { getAllApplicants } from "../../../actions/applicant";

import "./styles.css";

class ApplicationsAdmin extends Component {
    state = {
        applicantTeam: "Affairs", // Default value.
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
        if (this.state.applicantTeam !== prevState.applicantTeam){
            const affairs = document.querySelector("#affairs-accordion");
            const conference = document.querySelector("#conference-accordion");
            const events = document.querySelector("#events-accordion");
            const marketing = document.querySelector("#marketing-accordion");
            const mentorship = document.querySelector("#mentorship-accordion");
            const tech = document.querySelector("#tech-accordion");

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
                                    onSelect={e => this.setState({ applicantTeam: e })}
                                >
                                      <Dropdown.Item eventKey="Affairs">Affairs</Dropdown.Item>
                                      <Dropdown.Item eventKey="Conference Committee">Conference Committee</Dropdown.Item>
                                      <Dropdown.Item eventKey="Events">Events</Dropdown.Item>
                                      <Dropdown.Item eventKey="Marketing">Marketing</Dropdown.Item>
                                      <Dropdown.Item eventKey="Mentorship">Mentorship</Dropdown.Item>
                                      <Dropdown.Item eventKey="Tech & Innovations">Tech & Innovations</Dropdown.Item>
                                </DropdownButton>
                                <div className="applicant-team-selected">
                                    {this.state.applicantTeam} Team selected
                                </div>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Accordion id="affairs-accordion">
                                {this.state.affairsApplicants}
                            </Accordion>

                            <Accordion id="conference-accordion">
                                {this.state.conferenceApplicants}
                            </Accordion>

                            <Accordion id="events-accordion">
                                {this.state.eventsApplicants}
                            </Accordion>

                            <Accordion id="marketing-accordion">
                                {this.state.marketingApplicants}
                            </Accordion>

                            <Accordion id="mentorship-accordion">
                                {this.state.mentorshipApplicants}
                            </Accordion>

                            <Accordion id="tech-accordion">
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

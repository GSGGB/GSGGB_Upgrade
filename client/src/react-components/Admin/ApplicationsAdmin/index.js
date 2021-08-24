import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Card, Dropdown, Accordion } from "react-bootstrap";

import { getAllApplicants } from "../../../actions/applicant";

import "./styles.css";

class ApplicationsAdmin extends Component {
    state = {
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

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Card>
                        <Card.Header className="applicant-card-header">
                            Filter

                            <Dropdown id="applicant-dropdown">
                                <Dropdown.Toggle variant="info">
                                    Filter by team
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/admin#applications#affairs">Affairs</Dropdown.Item>
                                    <Dropdown.Item href="/admin#applications#conference">Conference Committee</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Card.Header>
                        <Card.Body>
                            <Accordion id="affairs">
                                {this.state.affairsApplicants}
                            </Accordion>

                            <Accordion id="conference">
                                {this.state.conferenceApplicants}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </div>
            </BrowserRouter>
        );
    }
}

export default ApplicationsAdmin;

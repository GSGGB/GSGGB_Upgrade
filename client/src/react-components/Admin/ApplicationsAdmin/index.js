import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Card, Table, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

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
                </div>

            </BrowserRouter>
        );
    }
}

export default UsersAdmin;

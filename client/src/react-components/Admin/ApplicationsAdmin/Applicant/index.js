import React, { Component } from "react";
import { Button, Accordion, Card } from "react-bootstrap";

import { deleteApplication, viewConfirmed, viewUnconfirmed } from "../../../../actions/applicant";

import "./styles.css";

class Applicant extends Component {

    // Delete application button for all administrators.
    deleteApplicationButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            return (
                <Button
                    variant="outline-danger"
                    onClick={(e) => {
                        e.preventDefault();
                        deleteApplication(this, this.props.resumeCloudinaryId, this.props.applicantId);
                    }}
                    >
                        DELETE
                </Button>
            )
        }
    }

    // Viewed button for all administrators.
    viewedButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            if (this.props.viewed){
                return (
                    <Button
                        variant="outline-info"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            viewUnconfirmed(this, this.props.applicantId);
                        }}
                        >
                            UNCONFIRM VIEW
                    </Button>
                )
            } else{
                return (
                    <Button
                        variant="outline-info"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            viewConfirmed(this, this.props.applicantId);
                        }}
                        >
                            CONFIRM VIEW
                    </Button>
                )
            }
        }
    }

    render() {
        const deleteApplicationButton = this.deleteApplicationButton();
        const viewedButton = this.viewedButton();

        return (
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={this.props.applicantId}>
                        {this.props.fullName}{this.props.viewed}{deleteApplicationButton}{viewedButton}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.applicantId}>
                    <Card.Body>{this.props.fullName}</Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }
}

export default Applicant;

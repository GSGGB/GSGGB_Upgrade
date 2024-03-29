import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmAlert } from 'react-confirm-alert';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

import { deleteApplication, flagApplication, unflagApplication } from "../../../../actions/applicant";

import "./styles.css";
import "./styles-mobile.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

class Applicant extends Component {
    state = {
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        timeOptions: { hour: '2-digit', minute:'2-digit' }
    };

    // Flag icon.
    flagIcon(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            if (this.props.flagged){
                return (
                    <div className="flag-applicant-icon">
                        <FontAwesomeIcon icon={faFlag} size={30}/>
                    </div>
                )
            }
        }
    }

    // Delete application button for all administrators.
    deleteApplicationButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            return (
                <Button
                    id="delete-applicant-button"
                    variant="outline-danger"
                    onClick={() => {
                        confirmAlert({
                            message: 'Please confirm deletion of this application.',
                            buttons: [
                                {
                                    label: 'Yes',
                                    onClick: () => {
                                        deleteApplication(
                                            this.props.applicationsAdminComp,
                                            this.props.resumeCloudinaryId,
                                            this.props.applicantId
                                        )
                                    }
                                },
                                {
                                    label: 'No'
                                }
                            ]
                        });
                    }}
                >
                    DELETE
                </Button>
            )
        }
    }

    // Flag button for all administrators.
    flagApplicationButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            if (this.props.flagged){
                return (
                    <Button
                        id="flag-applicant-button"
                        variant="outline-warning"
                        type="submit"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm unflagging of this application.',
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () => {
                                            unflagApplication(this.props.applicationsAdminComp, this.props.applicantId)
                                        }
                                    },
                                    {
                                        label: 'No'
                                    }
                                ]
                            });
                        }}
                    >
                        UNFLAG APPLICATION
                    </Button>
                )
            } else{
                return (
                    <Button
                        id="flag-applicant-button"
                        variant="outline-warning"
                        type="submit"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm flagging of this application.',
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () => {
                                            flagApplication(this.props.applicationsAdminComp, this.props.applicantId)
                                        }
                                    },
                                    {
                                        label: 'No'
                                    }
                                ]
                            });
                        }}
                    >
                        FLAG APPLICATION
                    </Button>
                )
            }
        }
    }

    render() {
        const deleteApplicationButton = this.deleteApplicationButton();
        const flagApplicationButton = this.flagApplicationButton();
        const flagIcon = this.flagIcon();

        const submissionDateText = (
            "Submitted " + (new Date(this.props.submissionDate)).toLocaleDateString('en-US', this.state.dateOptions) + " " +
            (new Date(this.props.submissionDate)).toLocaleTimeString('en-US', this.state.timeOptions)
        );

        var renderedResume = []
        for (let num = 1; num <= this.props.resumePages; num++){
            renderedResume.push(
                <div>
                    <Image publicId={this.props.resumeCloudinaryId + ".png"} className="applicant-resume">
                        <Transformation border="2px_solid_black" page={String(num)}/>
                    </Image>
                    <br/><br/>
                </div>
            )
        }

        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col lg={7}>
                                    <Accordion.Toggle eventKey={this.props.applicantId}>
                                        <span className="applicant-name">{(this.props.fullName).toUpperCase()}</span>
                                    </Accordion.Toggle>
                                    {flagIcon}
                                    <small className="text-muted" id="applicant-submission-date">{submissionDateText}</small>
                                </Col>
                                <Col lg={5}>
                                    {deleteApplicationButton}
                                    {flagApplicationButton}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey={this.props.applicantId}>
                            <Card.Body>
                                <div className="applicant-details">
                                    <span className="bold-applicant-text">Full name:</span> {this.props.fullName}
                                    <br/>
                                    <span className="bold-applicant-text">Email:</span> {this.props.email}
                                    <br/>
                                    <span className="bold-applicant-text">Year of study:</span> {this.props.year}
                                    <br/>
                                    <span className="bold-applicant-text">Program of study (POSt)/Major:</span> {this.props.program}
                                    <br/>
                                    <span className="bold-applicant-text">Available on Fridays:</span> {this.props.fridays}
                                    <br/><br/>
                                    <span className="bold-applicant-text">Interested team:</span> {this.props.team}
                                    <br/>
                                    <span className="bold-applicant-text">Interested position:</span> {this.props.position}
                                    <br/>
                                    <span className="bold-applicant-text">Other interested positions:</span> {this.props.otherPositions}
                                    <br/><br/>
                                    <span className="bold-applicant-text">Statement:</span> {this.props.statement}
                                    <br/><br/>
                                    <span className="bold-applicant-text">Resume:</span>
                                    <br/><br/>

                                    <CloudinaryContext cloudName="gsggb">
                                        {renderedResume}
                                    </CloudinaryContext>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
            </BrowserRouter>
        );
    }
}

export default Applicant;

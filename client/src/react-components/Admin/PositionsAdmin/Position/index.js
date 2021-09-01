import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';

import { deletePosition } from "../../../../actions/position";
import "./styles.css";

class Position extends Component {
    state = {
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        timeOptions: { hour: '2-digit', minute:'2-digit' }
    }

    // Delete position button for administrators only.
    deletePositionButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true" && accountType === "Administrator"){
            return (
                <Button
                    id="delete-position-button"
                    variant="outline-info"
                    size="sm"
                    onClick={() => {
                        confirmAlert({
                            message: 'Please confirm deletion of this position title.',
                            buttons: [
                                {
                                  label: 'Yes',
                                  onClick: () => deletePosition(this.props.positionsAdminComp, this.props.positionId)
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

    render() {
        const deletePositionButton = this.deletePositionButton();

        const dateAddedText = (
            "Added " + new Date(this.props.dateAdded).toLocaleDateString('en-US', this.state.dateOptions) + " " +
            new Date(this.props.dateAdded).toLocaleTimeString('en-US', this.state.timeOptions)
        );

        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col lg={7}>
                                    <Accordion.Toggle eventKey={this.props.positionId}>
                                        <span className="position-name">{this.props.position}</span>
                                    </Accordion.Toggle>
                                    <small className="text-muted" id="position-added-date">{dateAddedText}</small>
                                </Col>
                                <Col lg={5}>
                                    {deletePositionButton}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey={this.props.positionId}>
                        </Accordion.Collapse>
                    </Card>
                </div>
            </BrowserRouter>
        );
    }
}

export default Position;

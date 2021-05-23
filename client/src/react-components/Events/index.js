import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import rWorkshop1920 from "./static/r-workshop-19-20.jpg";

// Importing announcement actions/required methods.
import { updateImageFile } from "../../actions/image";
import { updateEventContent, getAllEvents, addEvent } from "../../actions/event";

class Events extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/events");
        document.title = "GSGGB U of T | Events";
    }

    state = {
        gEvents: [],
        displayEventModal: false,
        imageFile: "",
        imageId: "",
        eventContent: ""
    };

    componentDidMount(){
        getAllEvents(this);
    }

    // Add event button for editors and administrators only.
    addEventButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (
          loggedIn === "true" &&
          (accountType === "Editor" || accountType === "Administrator")
        ) {
            return (
                <Button
                    id="add-event-button"
                    variant="outline-info"
                    onClick={() => this.setState({ displayEventModal: true })}
                >
                    <FontAwesomeIcon icon={faPlus} size={20}/>
                </Button>
            )
        }
    }

    render() {
        const addEventButton = this.addEventButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <div class="events-photo-container">
                    <Image className="events-photo" alt="2019-2020 Introduction to R Workshop" src={rWorkshop1920} />
                    <span class="events-photo-title">
                        Our Events
                        <h3 className="events-photo-subtitle">Please follow our Facebook and Instagram pages to stay up to date on our upcoming events!</h3>
                    </span>
                </div>

                <div className="events-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="events-title-section">Upcoming Events</h2>
                        <span>{addEventButton}</span>
                        <hr className="events-separator"></hr>
                        <div className="event-cards">{this.state.gEvents}</div>
                    </div>
                </div>
                <Modal
                    show={this.state.displayEventModal}
                    onHide={() => this.setState({ displayEventModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new event</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    id="imageFileAdd"
                                    label="Upload event image"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="eventContent"
                                    id="eventContent"
                                    as="textarea"
                                    placeholder="Add event content here..."
                                    rows="5"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addEvent(this)
                                    this.setState({ displayEventModal: false })
                                }}
                                >
                                    CREATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </BrowserRouter>
        );
    }
}

export default Events;

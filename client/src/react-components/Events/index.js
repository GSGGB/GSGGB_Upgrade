import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import "./styles-mobile.css";
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
        upcomingEvents: [],
        pastEvents: [],
        displayEventModal: false,
        imageFile: "",
        imageId: "",
        eventImageOrientation: "",
        eventType: "",
        eventTitle: "",
        eventDate: "",
        eventStartTime: "",
        eventEndTime: "",
        eventLocation: "",
        eventContent: "",
        fbEventLink: "",
        eventbriteLink: "",
        zoomLink: ""
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
                <div className="events-photo-container">
                    <Image className="events-photo" alt="2019-2020 Introduction to R Workshop" src={rWorkshop1920} />
                    <span className="events-photo-title">
                        Our Events
                        <h3 className="events-photo-subtitle">
                            Please follow our Facebook and Instagram pages to stay up to date on our upcoming events!
                        </h3>
                    </span>
                </div>

                <div className="events-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="events-title-section">
                            Upcoming Events
                            {addEventButton}
                        </h2>
                        <hr className="events-separator"></hr>
                        <div className="event-cards">{this.state.upcomingEvents}</div>
                    </div>
                </div>

                <div className="events-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="events-title-section">
                            Past Events
                        </h2>
                        <hr className="events-separator"></hr>
                        <div className="event-cards">{this.state.pastEvents}</div>
                    </div>
                </div>

                <Modal
                    show={this.state.displayEventModal}
                    onHide={() => this.setState({ displayEventModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
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
                                    label="Upload event image"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event image orientation</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="eventImageOrientation"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                >
                                    <option>Landscape</option>
                                    <option>Portrait</option>
                                    <option>Square</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="eventType"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                >
                                    <option>Academic Seminar</option>
                                    <option>Awareness</option>
                                    <option>Conference</option>
                                    <option>Fundraiser</option>
                                    <option>Promotional</option>
                                    <option>Workshop</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="eventTitle"
                                    rows="1"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="eventDate"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event start time (EST)</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="eventStartTime"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event end time (EST)</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="eventEndTime"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="eventLocation"
                                    rows="1"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Event content (excluding hyperlinks)</Form.Label>
                                <Form.Control
                                    name="eventContent"
                                    as="textarea"
                                    placeholder="Add event content here..."
                                    rows="5"
                                    onChange={e => updateEventContent(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Facebook event link (OPTIONAL)</Form.Label>
                                <Form.Control
                                    name="fbEventLink"
                                    as="textarea"
                                    rows="1"
                                    onChange={e => updateEventContent(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Eventbrite link (OPTIONAL)</Form.Label>
                                <Form.Control
                                    name="eventbriteLink"
                                    as="textarea"
                                    rows="1"
                                    onChange={e => updateEventContent(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Virtual Zoom link (OPTIONAL)</Form.Label>
                                <Form.Control
                                    name="zoomLink"
                                    as="textarea"
                                    rows="1"
                                    onChange={e => updateEventContent(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
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

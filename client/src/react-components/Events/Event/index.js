import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col, Card, Button, Modal, ModalBody, Form } from "react-bootstrap";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus, faBook, faHeart, faGraduationCap, faMoneyBill, faHandshake,
  faLaptop, faCalendarDay, faClock, faMapMarkerAlt, faTicketAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updateImageFile } from "../../../actions/image";
import { updateEventForm, getEventById, editEvent, deleteEvent } from "../../../actions/event";

class Event extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        timeOptions: { hour: '2-digit', minute:'2-digit' },
        displayModal: false,
        imageFile: "",
        imageId: "",
        imageOrientation: "Landscape", // Default option.
        type: "Academic Seminar", // Default option.
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        content: "",
        fbEventLink: "",
        eventbriteLink: "",
        zoomLink: ""
    };

    // Edit event button for editors and administrators only.
    editEventButton(){
        const username = sessionStorage.getItem("username");
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.props.username)
            ){
                return (
                    <Button
                        id="edit-event-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => getEventById(this, this.props.eventId)}
                    >
                        <FontAwesomeIcon icon={faEdit} size={4}/>
                    </Button>
                )
            }
        }
    }

    // Delete event button for editors and administrators only.
    deleteEventButton(){
        const username = sessionStorage.getItem("username");
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.props.username)
            ){
                return (
                    <Button
                        id="delete-event-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm deletion of this event.',
                                buttons: [
                                    {
                                      label: 'Yes',
                                      onClick: () => deleteEvent(this.props.eventsComp, this.props.imageCloudinaryId, this.props.eventId)
                                    },
                                    {
                                      label: 'No'
                                    }
                                ]
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faMinus} size={5}/>
                    </Button>
                )
            }
        }
    }

    // Checkbox for edit event form. Checked if user wishes to upload a new image.
    displayCheckbox(){
        const eventImageCheckbox = document.querySelector("#event-image-checkbox");
        const eventImageFileEdit = document.querySelector("#event-image-file-edit");

        // If the checkbox is checked, display the output text
        if (eventImageCheckbox.checked === true){
            eventImageFileEdit.style.display = "block";
        } else {
            eventImageFileEdit.style.display = "none";
        }
    }

    getEventTypeIcon(eventType){
        if (eventType === "Awareness"){
            return (<FontAwesomeIcon className="event-type-icon" icon={faHeart} size={4}/>)
        } else if (eventType === "Academic Seminar"){
            return (<FontAwesomeIcon className="event-type-icon" icon={faBook} size={4}/>)
        } else if (eventType === "Conference"){
            return (<FontAwesomeIcon className="event-type-icon" icon={faGraduationCap} size={4}/>)
        } else if (eventType === "Fundraiser"){
            return (<FontAwesomeIcon className="event-type-icon" icon={faMoneyBill} size={4}/>)
        } else if (eventType === "Promotional") {
            return (<FontAwesomeIcon className="event-type-icon" icon={faHandshake} size={4}/>)
        } else if (eventType === "Workshop"){
            return (<FontAwesomeIcon className="event-type-icon" icon={faLaptop} size={4}/>)
        }
    }

    getFacebookIcon(fbEventLink){
        if (fbEventLink){
            return (
                <span className="event-detail">
                    <FontAwesomeIcon className="event-detail-icon" icon={faFacebook} size={4}/>
                    <a href={fbEventLink} target="_blank" rel="noopener noreferrer">Facebook Event Link</a>
                </span>
            )
        }
    }

    getEventbriteIcon(eventbriteLink){
        if (eventbriteLink){
            return(
                <span className="event-detail">
                    <FontAwesomeIcon className="event-detail-icon" icon={faTicketAlt} size={4}/>
                    <a href={eventbriteLink} target="_blank" rel="noopener noreferrer">Eventbrite Link</a>
                </span>
            )
        }
    }

    getZoomIcon(zoomLink){
        if (zoomLink){
            return(
                <span className="event-detail">
                    <FontAwesomeIcon className="event-detail-icon" icon={faVideo} size={4}/>
                    <a href={zoomLink} target="_blank" rel="noopener noreferrer">Zoom Link</a>
                </span>
            )
        }
    }

    // Credit to Briguy37 for the code, retrieved from Stack Overflow.
    // https://stackoverflow.com/questions/14402922/how-to-change-24hr-time-to-12hr-time-with-javascript
    getFormattedTime(fourDigitTime){
        const hours24 = parseInt(fourDigitTime.substring(0,2));
        const hours = ((hours24 + 11) % 12) + 1;
        const amPm = hours24 > 11 ? 'PM' : 'AM';
        const minutes = fourDigitTime.substring(2);

        return (hours + minutes + " " + amPm)
    }

    render() {
        const editEventButton = this.editEventButton();
        const deleteEventButton = this.deleteEventButton();
        const eventTypeIcon = this.getEventTypeIcon(this.props.type);

        const imageOrientation = (this.props.imageOrientation).toLowerCase() + "-event-image";
        const infoOrientation = (this.props.imageOrientation).toLowerCase() + "-event-info";
        const lastUpdatedText = (
            "Last updated " + (new Date(this.props.lastUpdated)).toLocaleDateString('en-US', this.state.dateOptions) + " " +
            (new Date(this.props.lastUpdated)).toLocaleTimeString('en-US', this.state.timeOptions)
        );

        const date = (new Date(this.props.date + " EDT")).toLocaleDateString('en-US', this.state.dateOptions);
        const time = this.getFormattedTime(this.props.startTime) + " - " + this.getFormattedTime(this.props.endTime) + " (EST)";

        const fbIcon = this.getFacebookIcon(this.props.fbEventLink);
        const eventbriteIcon = this.getEventbriteIcon(this.props.eventbriteLink);
        const zoomIcon = this.getZoomIcon(this.props.zoomLink);

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="event-card">
                    <Card>
                        <Card.Header>
                            <small className="text-muted">{lastUpdatedText}</small>
                            <span>{deleteEventButton}{editEventButton}</span>
                        </Card.Header>
                        <Row>
                            <Col className={infoOrientation} lg={4}>
                                <CardActionArea className={imageOrientation}>
                                    <div className="event-type-overlay">
                                        {eventTypeIcon}{this.props.type}
                                    </div>
                                    <CardMedia
                                        component="img"
                                        className={imageOrientation}
                                        image={this.props.imageURL}
                                    />
                                </CardActionArea>
                            </Col>
                            <Col className={infoOrientation} lg={8}>
                                <Card.Body>
                                    <h4 className="event-title">{this.props.title}</h4>
                                    <div className="event-detail">
                                        <FontAwesomeIcon className="event-detail-icon" icon={faCalendarDay} size={4}/>{date}
                                    </div>
                                    <div className="event-detail">
                                        <FontAwesomeIcon className="event-detail-icon" icon={faClock} size={4}/>{time}
                                    </div>
                                    <div className="event-detail">
                                        <FontAwesomeIcon className="event-detail-icon" icon={faMapMarkerAlt} size={4}/>{this.props.location}
                                    </div>
                                    {fbIcon}{eventbriteIcon}{zoomIcon}
                                    <div className="event-detail" id="event-content">
                                        {this.props.content}
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                    <Modal
                        show={this.state.displayModal}
                        onHide={() => this.setState({ displayModal: false })}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <ModalHeader closeButton>
                            <h4>Edit event</h4>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        id="event-image-checkbox"
                                        type="checkbox"
                                        label="Change existing image"
                                        onClick={() => {
                                            this.displayCheckbox();
                                        }}
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.File
                                        name="imageFile"
                                        id="event-image-file-edit"
                                        onChange={e => updateImageFile(this, e.target)}
                                        required />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event image orientation</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="imageOrientation"
                                        defaultValue={this.state.imageOrientation}
                                        onChange={e => updateEventForm(this, e.target)}
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
                                        name="type"
                                        defaultValue={this.state.type}
                                        onChange={e => updateEventForm(this, e.target)}
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
                                        name="title"
                                        rows="1"
                                        defaultValue={this.state.title}
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        defaultValue={this.state.date}
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event start time (EST)</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="startTime"
                                        defaultValue={this.state.startTime}
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event end time (EST)</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="endTime"
                                        defaultValue={this.state.endTime}
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        rows="1"
                                        defaultValue={this.state.location}
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event content (excluding hyperlinks)</Form.Label>
                                    <Form.Control
                                        name="content"
                                        as="textarea"
                                        placeholder="Edit announcement content here..."
                                        defaultValue={this.state.content}
                                        rows="5"
                                        onChange={e => updateEventForm(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Facebook event link (OPTIONAL)</Form.Label>
                                    <Form.Control
                                        name="fbEventLink"
                                        as="textarea"
                                        defaultValue={this.state.fbEventLink}
                                        rows="1"
                                        onChange={e => updateEventForm(this, e.target)}
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Eventbrite link (OPTIONAL)</Form.Label>
                                    <Form.Control
                                        name="eventbriteLink"
                                        as="textarea"
                                        defaultValue={this.state.eventbriteLink}
                                        rows="1"
                                        onChange={e => updateEventForm(this, e.target)}
                                    />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Virtual Zoom link (OPTIONAL)</Form.Label>
                                    <Form.Control
                                        name="zoomLink"
                                        as="textarea"
                                        defaultValue={this.state.zoomLink}
                                        rows="1"
                                        onChange={e => updateEventForm(this, e.target)}
                                    />
                                </Form.Group>
                                <br/>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editEvent(this, this.props.eventsComp, this.props.imageCloudinaryId, this.props.eventId);
                                        this.setState({ displayModal: false });
                                    }}
                                    >
                                        UPDATE
                                </Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </BrowserRouter>
        );
    }
}

export default Event;

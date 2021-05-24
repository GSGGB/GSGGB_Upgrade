import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Card, Button, Modal, ModalBody, Form } from "react-bootstrap";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updateImageFile } from "../../../actions/image";
import { updateEventContent, getEventById, editEvent, deleteEvent } from "../../../actions/event";

class Event extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "Canada/Toronto"},
        displayModal: false,
        imageFile: "",
        imageId: "",
        type: "",
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

    displayCheckbox(){
        const eventImageCheckbox = document.querySelector("#eventImageCheckbox");
        const eventImageFileEdit = document.querySelector("#eventImageFileEdit");

        // If the checkbox is checked, display the output text
        if (eventImageCheckbox.checked === true){
            eventImageFileEdit.style.display = "block";
        } else {
            eventImageFileEdit.style.display = "none";
        }
    }

    render() {
        const eventDate = this.props.date.toLocaleString('en-US', this.state.options);

        const editEventButton = this.editEventButton();
        const deleteEventButton = this.deleteEventButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="event">
                    <Card>
                        <Card.Header closeButton="false">
                            <img src={`/headshots/${this.props.headshot}`} className="headshot" alt="headshot" />
                            <strong className="mr-auto">{this.props.fullName + " - " + this.props.execPosition}</strong>
                            <span>{deleteEventButton}{editEventButton}</span>
                        </Card.Header>
                        <CardActionArea>
                            <CardMedia
                              className="image__card-media"
                              image={this.props.imageURL}
                            />
                            <CardContent>
                                {this.props.type}
                                {this.props.title}
                                {eventDate}
                                {this.props.startTime}
                                {this.props.endTime}
                                {this.props.location}
                                {this.props.content}
                            </CardContent>

                        </CardActionArea>
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
                                        id="eventImageCheckbox"
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
                                        id="eventImageFileEdit"
                                        onChange={e => updateImageFile(this, e.target)}
                                        required />
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Event type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="type"
                                        defaultValue={this.state.type}
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
                                        name="title"
                                        rows="1"
                                        defaultValue={this.state.title}
                                        onChange={e => updateEventContent(this, e.target)}
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
                                        onChange={e => updateEventContent(this, e.target)}
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
                                        onChange={e => updateEventContent(this, e.target)}
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
                                        onChange={e => updateEventContent(this, e.target)}
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
                                        onChange={e => updateEventContent(this, e.target)}
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
                                        defaultValue={this.state.fbEventLink}
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
                                        defaultValue={this.state.eventbriteLink}
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
                                        defaultValue={this.state.zoomLink}
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

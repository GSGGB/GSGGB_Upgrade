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

import { getImageById } from "../../../actions/image";
import { retrieveAccountDetails } from "../../../actions/user";
import { updateImageFile, updateEventContent, getEventById, editEvent, deleteEvent } from "../../../actions/event";

class Event extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "Canada/Toronto"},
        displayModal: false,
        imageCheckbox: "",
        imageFile: "",
        imageCloudinaryId: "",
        imageURL: "",
        existingImageId: "",
        imageId: "", // Updated image ID.
        existingContent: "",
        updatedContent: "",
        firstName: "",
        lastName: "",
        username: "",
        execPosition: ""
    };

    // Edit event button for editors and administrators only.
    editEventButton(){
        const username = sessionStorage.getItem("username");
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.state.username)
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
              (accountType === "Editor" && username === this.state.username)
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
                                      onClick: () => deleteEvent(this.props.eventsComp, this.props.eventId)
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

    render() {
        getImageById(this, this.props.imageId);
        const imageURL = this.state.imageURL;

        retrieveAccountDetails(this, this.props.userId);
        const headshot = this.state.firstName + ".jpg";
        const fullName = this.state.firstName + " " + this.state.lastName;
        const eventDate = this.props.date.toLocaleString('en-US', this.state.options);

        const editEventButton = this.editEventButton(this.state.username);
        const deleteEventButton = this.deleteEventButton(this.state.username);

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="event">
                    <Card>
                        <Card.Header closeButton="false">
                            <img src={`/headshots/${headshot}`} className="headshot" alt="headshot" />
                            <strong className="mr-auto">{fullName + " - " + this.state.execPosition}</strong>
                            <small>{eventDate}</small>
                            <span>{editEventButton}{deleteEventButton}</span>
                        </Card.Header>
                        <CardActionArea>
                            <CardMedia
                              className="image__card-media"
                              image={imageURL}
                            />
                            <CardContent>
                                {this.props.content}
                            </CardContent>

                        </CardActionArea>
                    </Card>
                    <Modal
                        show={this.state.displayModal}
                        onHide={() => this.setState({ displayModal: false })}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <ModalHeader closeButton>
                            <h4>Edit event</h4>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        name="imageCheckbox"
                                        id="imageCheckbox"
                                        type="checkbox"
                                        label="Do you want to add a new image?"
                                        onChange={e => updateEventContent(this, e.target)}
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.File
                                        name="imageFile"
                                        id="imageFile"
                                        label="Upload new event image"
                                        onChange={e => updateImageFile(this, e.target)}
                                        disabled={this.state.imageCheckbox}
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        name="updatedContent"
                                        id="updatedContent"
                                        as="textarea"
                                        placeholder="Edit announcement content here..."
                                        defaultValue={this.state.existingContent}
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
                                        editEvent(this, this.props.eventsComp, this.props.eventId)
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

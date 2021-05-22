import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toast, Button, Modal, ModalBody, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updateAnnouncementContent, getAnnouncementById, editAnnouncement, deleteAnnouncement } from "../../../actions/announcement";

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: "Canada/Toronto"},
        displayModal: false,
        existingContent: "",
        updatedContent: ""
    }

    // Edit announcement button for editors and administrators only.
    editAnnouncementButton(){
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
                        id="edit-announcement-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => getAnnouncementById(this, this.props.announcementId)}
                    >
                        <FontAwesomeIcon icon={faEdit} size={4}/>
                    </Button>
                )
            }
        }
    }

    // Delete announcement button for editors and administrators only.
    deleteAnnouncementButton(){
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
                        id="delete-announcement-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm deletion of this announcement.',
                                buttons: [
                                    {
                                      label: 'Yes',
                                      onClick: () => deleteAnnouncement(this.props.homepageComp, this.props.announcementId)
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
        const editAnnouncementButton = this.editAnnouncementButton();
        const deleteAnnouncementButton = this.deleteAnnouncementButton();

        const announcementDate = this.props.date.toLocaleString('en-US', this.state.options);

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="announcement">
                    <Toast>
                        <Toast.Header closeButton="false">
                            <img src={`/headshots/${this.props.headshot}`} className="headshot" alt="headshot" />
                            <strong className="mr-auto">{this.props.fullName + " - " + this.props.execPosition}</strong>
                            <small>{announcementDate}</small>
                            <span>{editAnnouncementButton}{deleteAnnouncementButton}</span>
                        </Toast.Header>
                        <Toast.Body>
                            {this.props.content}
                        </Toast.Body>
                    </Toast>
                    <Modal
                        show={this.state.displayModal}
                        onHide={() => this.setState({ displayModal: false })}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <ModalHeader closeButton>
                            <h4>Edit announcement</h4>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        name="updatedContent"
                                        id="updatedContent"
                                        as="textarea"
                                        placeholder="Edit announcement content here..."
                                        defaultValue={this.state.existingContent}
                                        rows="5"
                                        onChange={e => updateAnnouncementContent(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editAnnouncement(this, this.props.homepageComp, this.props.announcementId);
                                        this.setState({ displayModal: false })
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

export default Announcement;

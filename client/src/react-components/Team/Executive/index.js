import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col, Card, Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin, FaEnvelope, FaInfo } from "react-icons/fa";

import "./styles.css";
import "./styles-mobile.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updateImageFile } from "../../../actions/image";
import { updateExecutiveForm, getExecutiveById, editExecutive, deleteExecutive } from "../../../actions/executive";

class Executive extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        modalId: "",
        displayModal: false,
        imageFile: "",
        imageId: "",
        firstName: "",
        lastName: "",
        team: "Senior Staff", // Default option.
        position: "",
        biography: "",
        linkedin: "",
        email: ""
    };

    handleClose() {
        this.setState({
            modalId: ""
        });
    }

    // Edit executive button for editors and administrators only.
    editExecutiveButton(){
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
                        id="edit-executive-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => getExecutiveById(this, this.props.executiveId)}
                    >
                        <FontAwesomeIcon icon={faEdit} size={4}/>
                    </Button>
                )
            }
        }
    }

    // Delete executive button for editors and administrators only.
    deleteExecutiveButton(){
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
                        id="delete-executive-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm deletion of this executive.',
                                buttons: [
                                    {
                                      label: 'Yes',
                                      onClick: () => deleteExecutive(
                                          this.props.teamComp,
                                          this.props.imageCloudinaryId,
                                          this.props.executiveId
                                      )
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

    // Checkbox for edit executive form. Checked if user wishes to upload a new headshot.
    displayCheckbox(){
        const execImageCheckbox = document.querySelector("#exec-image-checkbox");
        const execImageFileEdit = document.querySelector("#exec-image-file-edit");

        // If the checkbox is checked, display the output text
        if (execImageCheckbox.checked === true){
            execImageFileEdit.style.display = "block";
        } else {
            execImageFileEdit.style.display = "none";
        }
    }

    render() {
        const editExecutiveButton = this.editExecutiveButton();
        const deleteExecutiveButton = this.deleteExecutiveButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <Col>
                    <Card className="executive-card mx-auto">
                        <Card.Title>{deleteExecutiveButton}{editExecutiveButton}</Card.Title>
                        <Card.Img className="executive-photo" src={this.props.imageURL} key={this.props.firstName} />
                        <Card.Body>
                            <Card.Title className="executive-name">{this.props.firstName + " " + this.props.lastName}</Card.Title>
                            <Card.Text className="executive-position">{this.props.position}</Card.Text>

                            <Button className="view-biography" onClick={() =>
                                this.setState({
                                    modalId: `modal${this.props.executiveId}`
                                })
                            }>
                                <span className="card-icon" id="biography">
                                    <FaInfo />
                                </span>
                            </Button>
                            <a
                              href={this.props.linkedin}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                                <span className="card-icon" id="linkedin">
                                    <FaLinkedin />
                                </span>
                            </a>
                            <a
                              href={`mailto:${this.props.email}`}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                                <span className="card-icon" id="personal-email">
                                    <FaEnvelope />
                                </span>
                            </a>
                        </Card.Body>
                    </Card>

                    <Modal
                        show={this.state.modalId === `modal${this.props.executiveId}`}
                        onHide={this.handleClose}
                        aria-labelledby={`${this.props.firstName}ModalLabel`} backdrop="static"
                        keyboard={false}
                        key={this.props.firstName}
                        size = "lg">
                        <Modal.Header
                            id={`${this.props.firstName}ModalLabel`}
                            style={{
                                backgroundColor: "whitesmoke"
                            }}
                            closeButton>
                        </Modal.Header>
                        <Modal.Body className="biography-modal">
                            <Row>
                                <Col lg={4}>
                                    <Image className="enlarged-executive-photo" src={this.props.imageURL} />
                                </Col>
                                <Col lg={8} className="biography-content">
                                    <h3 className="name">{this.props.firstName + " " + this.props.lastName}</h3>
                                    <h5 className="position">{this.props.position}</h5>
                                    <hr className="biography-line" />
                                    <p className="biography">{this.props.biography}</p>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                </Col>
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
                        <h4>Edit executive</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    id="exec-image-checkbox"
                                    type="checkbox"
                                    label="Change existing headshot"
                                    onClick={() => {
                                        this.displayCheckbox();
                                    }}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    id="exec-image-file-edit"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    rows="1"
                                    defaultValue={this.state.firstName}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    rows="1"
                                    defaultValue={this.state.lastName}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Team</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="team"
                                    defaultValue={this.state.team}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                >
                                    <option>Senior Staff</option>
                                    <option>Conference Committee</option>
                                    <option>Marketing</option>
                                    <option>Affairs</option>
                                    <option>Mentorship</option>
                                    <option>Events</option>
                                    <option>Tech & Innovations</option>
                                    <option>JIGG</option>
                                    <option>Alumni</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    rows="1"
                                    defaultValue={this.state.position}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Biography</Form.Label>
                                <Form.Control
                                    name="biography"
                                    as="textarea"
                                    placeholder="Edit biography here..."
                                    defaultValue={this.state.biography}
                                    rows="5"
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>LinkedIn account (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="linkedin"
                                    rows="1"
                                    defaultValue={this.state.linkedin}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Email address (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    rows="1"
                                    defaultValue={this.state.email}
                                    onChange={e => updateExecutiveForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    editExecutive(this, this.props.teamComp, this.props.imageCloudinaryId, this.props.executiveId);
                                    this.setState({ displayModal: false });
                                }}
                                >
                                    UPDATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </BrowserRouter>
        );
    }
}

export default Executive;

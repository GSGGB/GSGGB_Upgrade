import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Col, Card, Button, Modal, ModalBody, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { retrieveAccountDetails } from "../../../actions/user";
import { updateResearchURL, getResearchPostById, editResearchPost, deleteResearchPost } from "../../../actions/research";

class Research extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        displayModal: false,
        existingURL: "",
        updatedURL: "",
        firstName: "",
        lastName: "",
        username: "",
        execPosition: ""
    }

    // Edit research post button for editors and administrators only.
    editResearchButton(){
        const username = localStorage.getItem("username");
        const accountType = localStorage.getItem("accountType");
        const loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.state.username)
            ){
                return (
                    <Button
                        id="edit-research-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => getResearchPostById(this, this.props.researchId)}
                    >
                        <FontAwesomeIcon icon={faEdit} size={4}/>
                    </Button>
                )
            }
        }
    }

    // Delete research post button for editors and administrators only.
    deleteResearchButton(){
        const username = localStorage.getItem("username");
        const accountType = localStorage.getItem("accountType");
        const loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.state.username)
            ){
                return (
                    <Button
                        id="delete-research-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm deletion of this research post.',
                                buttons: [
                                    {
                                      label: 'Yes',
                                      onClick: () => deleteResearchPost(this.props.homepageComp, this.props.researchId)
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
        retrieveAccountDetails(this, this.props.userId);
        const headshot = this.state.firstName + ".jpg";
        const fullName = this.state.firstName + " " + this.state.lastName;

        const editResearchButton = this.editResearchButton(this.state.username);
        const deleteResearchButton = this.deleteResearchButton(this.state.username);

        return (
            <BrowserRouter forceRefresh={true}>
                <Col xl={6}>
                    <Card className="researchPost">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">
                                <img src={`/headshots/${headshot}`} className="headshot" alt="headshot" />
                                <strong className="mr-auto">{fullName + " - " + this.state.execPosition}</strong>
                                <span>{deleteResearchButton}{editResearchButton}</span>
                            </Card.Subtitle>
                            <FacebookProvider appId="807067446817483">
                                <EmbeddedPost href={this.props.url}/>
                            </FacebookProvider>
                        </Card.Body>
                    </Card>
                    <Modal
                        show={this.state.displayModal}
                        onHide={() => this.setState({ displayModal: false })}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <ModalHeader closeButton>
                            <h4>Edit research post (Facebook URL)</h4>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        name="updatedURL"
                                        id="updatedURL"
                                        as="textarea"
                                        placeholder="Edit Facebook URL here..."
                                        defaultValue={this.state.existingURL}
                                        rows="1"
                                        onChange={e => updateResearchURL(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onClick={() => editResearchPost(this, this.props.homepageComp, this.props.researchId)}
                                    >
                                        UPDATE
                                </Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Col>
            </BrowserRouter>
        );
    }
}

export default Research;

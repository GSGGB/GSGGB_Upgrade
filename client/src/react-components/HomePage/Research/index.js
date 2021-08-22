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

import { updateResearchURL, getResearchPostById, editResearchPost, deleteResearchPost } from "../../../actions/research";

class Research extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        displayModal: false,
        url: ""
    }

    // Edit research post button for editors and administrators only.
    editResearchButton(){
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
        const editResearchButton = this.editResearchButton();
        const deleteResearchButton = this.deleteResearchButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <Col xl={6}>
                    <Card className="researchPost">
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">
                                <img src={this.props.headshot} className="headshot" alt="headshot" />
                                <strong className="mr-auto">{this.props.fullName + " - " + this.props.executivePosition}</strong>
                                <span>{deleteResearchButton}{editResearchButton}</span>
                            </Card.Subtitle>
                            <FacebookProvider appId="481552546265591">
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
                                        name="url"
                                        as="textarea"
                                        placeholder="Edit Facebook URL here..."
                                        defaultValue={this.state.url}
                                        rows="1"
                                        onChange={e => updateResearchURL(this, e.target)}
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="outline-info"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editResearchPost(this, this.props.homepageComp, this.props.researchId)
                                        this.setState({ displayModal: false })
                                    }}
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

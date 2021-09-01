import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Col, Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';
import { faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./styles.css";
import "./styles-mobile.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

import { updateImageFile } from "../../../actions/image";
import { updateSponsorForm, getSponsorById, editSponsor, deleteSponsor } from "../../../actions/sponsor";

class Sponsor extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        displayModal: false,
        imageFile: "",
        imageId: "",
        type: "Platinum", // Default option.
        name: "",
        link: "",
        width: 0,
        height: null,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0
    };

    // Manipulate DOM by editing sponsor logo/image CSS.
    componentDidMount(){
        const sponsorLogo = document.querySelector(`.${(this.props.name).toLowerCase().split(" ").join("-")}-logo`);

        // Set CSS attributes here. Any fields that were not filled in
        // were initialized to 0.
        sponsorLogo.style.width = this.props.width + "px";
        sponsorLogo.style.height = this.props.height + "px";
        sponsorLogo.style.marginLeft = this.props.marginLeft + "px";
        sponsorLogo.style.marginRight = this.props.marginRight + "px";
        sponsorLogo.style.marginTop = this.props.marginTop + "px";
        sponsorLogo.style.marginBottom = this.props.marginBottom + "px";
    }

    // Edit sponsor button for editors and administrators only.
    editSponsorButton(){
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
                        id="edit-sponsor-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => getSponsorById(this, this.props.sponsorId)}
                    >
                        <FontAwesomeIcon icon={faEdit} size={4}/>
                    </Button>
                )
            }
        }
    }

    // Delete sponsor button for editors and administrators only.
    deleteSponsorButton(){
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
                        id="delete-sponsor-button"
                        variant="outline-info"
                        size="sm"
                        onClick={() => {
                            confirmAlert({
                                message: 'Please confirm deletion of this sponsor.',
                                buttons: [
                                    {
                                      label: 'Yes',
                                      onClick: () => deleteSponsor(this.props.sponsorsComp, this.props.imageCloudinaryId, this.props.sponsorId)
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

    // Checkbox for edit sponsor form. Checked if user wishes to upload a new image.
    displayCheckbox(){
        const sponsorImageCheckbox = document.querySelector("#sponsor-image-checkbox");
        const sponsorImageFileEdit = document.querySelector("#sponsor-image-file-edit");

        // If the checkbox is checked, display the output text
        if (sponsorImageCheckbox.checked === true){
            sponsorImageFileEdit.style.display = "block";
        } else {
            sponsorImageFileEdit.style.display = "none";
        }
    }

    render() {
        const editSponsorButton = this.editSponsorButton();
        const deleteSponsorButton = this.deleteSponsorButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <Col sm>
                    <div className="sponsor-center">
                        {deleteSponsorButton}{editSponsorButton}
                        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                            <Image className={`${(this.props.name).toLowerCase().split(" ").join("-")}-logo`}
                            src={this.props.imageURL} />
                        </a>
                    </div>
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
                        <h4>Edit sponsor</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    id="sponsor-image-checkbox"
                                    type="checkbox"
                                    label="Change existing sponsor logo"
                                    onClick={() => {
                                        this.displayCheckbox();
                                    }}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    id="sponsor-image-file-edit"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Sponsor type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    defaultValue={this.state.type}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                >
                                    <option>Platinum</option>
                                    <option>Gold</option>
                                    <option>Silver</option>
                                    <option>Bronze</option>
                                    <option>Partner</option>
                                    <option>Special</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Sponsor name (Alphanumeric and spaces only, no commas)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    rows="1"
                                    defaultValue={this.state.name}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Sponsor link</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="link"
                                    rows="1"
                                    defaultValue={this.state.link}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>WIDTH</b> in pixels</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="width"
                                    rows="1"
                                    defaultValue={this.state.width}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>HEIGHT</b> in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="height"
                                    rows="1"
                                    defaultValue={this.state.height}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>LEFT</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marginLeft"
                                    rows="1"
                                    defaultValue={this.state.marginLeft}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>RIGHT</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marginRight"
                                    rows="1"
                                    defaultValue={this.state.marginRight}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>TOP</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marginTop"
                                    rows="1"
                                    defaultValue={this.state.marginTop}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>BOTTOM</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marginBottom"
                                    rows="1"
                                    defaultValue={this.state.marginBottom}
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    editSponsor(this, this.props.sponsorsComp, this.props.imageCloudinaryId, this.props.sponsorId);
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

export default Sponsor;

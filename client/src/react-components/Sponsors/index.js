import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Button, Modal, ModalBody, Form, Image } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import sponsorsPrincetonReview from "./static/sponsors-princeton-review.jpg";

// Importing sponsor actions/required methods.
import { updateImageFile } from "../../actions/image";
import { updateSponsorForm, getAllSponsors, addSponsor } from "../../actions/sponsor";

class Sponsors extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/sponsors");
        document.title = "GSGGB U of T | Sponsors";
    }

    state = {
        platinumSponsors: [],
        goldSponsors: [],
        silverSponsors: [],
        bronzeSponsors: [],
        partners: [],
        special: [],
        displaySponsorModal: false,
        imageFile: "",
        imageId: "",
        sponsorType: "Platinum", // Default option.
        sponsorName: "",
        sponsorLink: "",
        logoWidth: 0,
        logoHeight: null,
        logoMarginLeft: 0,
        logoMarginRight: 0,
        logoMarginTop: 0,
        logoMarginBottom: 0
    };

    componentDidMount(){
        getAllSponsors(this);
    }

    // Add sponsor button for editors and administrators only.
    addSponsorButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (
          loggedIn === "true" &&
          (accountType === "Editor" || accountType === "Administrator")
        ) {
            return (
                <Button
                    id="add-sponsor-button"
                    variant="outline-info"
                    onClick={() => this.setState({ displaySponsorModal: true })}
                >
                    <FontAwesomeIcon icon={faPlus} size={20}/>
                </Button>
            )
        }
    }

    render() {
        const addSponsorButton = this.addSponsorButton();

        return(
            <BrowserRouter forceRefresh={true}>
                <div className="sponsors-photo-container">
                    <Image className="sponsors-photo" alt="2019-2020 Introduction to R Workshop" src={sponsorsPrincetonReview} />
                    <span className="sponsors-photo-title">
                        Our Sponsors
                        <h3 className="sponsors-photo-subtitle">
                            Thank-you to our sponsors for supporting GSGGB and its chapters!
                            {addSponsorButton}
                        </h3>
                    </span>
                </div>

                <br /><br /><br /><br />
                <h4 className="sponsors-header" id="platinum-sponsor">PLATINUM: Awarded to sponsors with a contribution of $1000 or more.</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.platinumSponsors}
                    </Row>
                </div>
                <br />

                <br /><br />
                <h4 className="sponsors-header" id="gold-sponsor">GOLD: Awarded to sponsors with a contribution of $500 or more.</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.goldSponsors}
                    </Row>
                </div>
                <br/>

                <br /><br />
                <h4 className="sponsors-header" id="silver-sponsor">SILVER: Awarded to sponsors with a contribution of $250 or more.</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.silverSponsors}
                    </Row>
                </div>
                <br/>

                <br /><br />
                <h4 className="sponsors-header" id="bronze-sponsor">BRONZE: Awarded to sponsors with a contribution of $100 or more.</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.bronzeSponsors}
                    </Row>
                </div>

                <br /><br />
                <h4 className="sponsors-header" id="partner-sponsor">Thanks to our U of T club partners for their support!</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.partners}
                    </Row>
                </div>

                <br /><br />
                <h4 className="sponsors-header" id="special-sponsor">A special thank-you to the Rare Disease Foundation for our partnership!</h4>
                <br />
                <div className="container">
                    <Row>
                        {this.state.special}
                    </Row>
                </div>

                <Modal
                    show={this.state.displaySponsorModal}
                    onHide={() => this.setState({ displaySponsorModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new sponsor</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    label="Upload sponsor logo"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Sponsor type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sponsorType"
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
                                <Form.Label>Sponsor name <b>(Alphanumeric and spaces only, no commas or apostrophes)</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sponsorName"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Sponsor link</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sponsorLink"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>WIDTH</b> in pixels</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoWidth"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>HEIGHT</b> in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoHeight"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>LEFT</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoMarginLeft"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>RIGHT</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoMarginRight"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>TOP</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoMarginTop"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Logo/Image <b>BOTTOM</b> margin in pixels (OPTIONAL)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="logoMarginBottom"
                                    rows="1"
                                    onChange={e => updateSponsorForm(this, e.target)}
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addSponsor(this);
                                    this.setState({ displaySponsorModal: false })
                                }}
                                >
                                    ADD
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </BrowserRouter>
        )
    }
}

export default Sponsors;

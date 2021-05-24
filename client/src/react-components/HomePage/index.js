import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Button, Modal, ModalBody, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import banner from "./static/banner.jpg";
import teamPhotoHomepage from "./static/team-photo-homepage.jpg";
import conferencePhoto from "./static/conference-photo.jpg";

// Importing announcement actions/required methods.
import { updateAnnouncementContent, getAllAnnouncements, addAnnouncement } from "../../actions/announcement";
// Importing research post actions/required methods.
import { updateResearchURL, getAllResearchPosts, addResearchPost } from "../../actions/research";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/home");
        document.title = "GSGGB U of T | Home";
    }

    state = {
        announcements: [],
        displayAnnouncementModal: false,
        announcementContent: "",
        researchPosts: [],
        displayResearchModal: false,
        researchURL: ""
    };

    componentDidMount(){
        getAllAnnouncements(this);
        getAllResearchPosts(this);
    }

    // Add announcement button for editors and administrators only.
    addAnnouncementButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (
          loggedIn === "true" &&
          (accountType === "Editor" || accountType === "Administrator")
        ) {
            return (
                <Button
                    id="add-announcement-button"
                    variant="outline-info"
                    onClick={() => this.setState({ displayAnnouncementModal: true })}
                >
                    <FontAwesomeIcon icon={faPlus} size={20}/>
                </Button>
            )
        }
    }

    // Add research button for editors and administrators only.
    addResearchButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (
          loggedIn === "true" &&
          (accountType === "Editor" || accountType === "Administrator")
        ) {
            return (
                <Button
                    id="add-research-button"
                    variant="outline-info"
                    onClick={() => this.setState({ displayResearchModal: true })}
                >
                    <FontAwesomeIcon icon={faPlus} size={20}/>
                </Button>
            )
        }
    }


    render() {
        const addAnnouncementButton = this.addAnnouncementButton();
        const addResearchButton = this.addResearchButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="banner">
                    <Image id="banner-photo" alt="GSGGB Banner" src={banner} />
                </div>

                <div className="about-us-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="section-title" id="about-us">About Us</h2>
                        <hr className="homepage-separator"></hr>
                        <br/>
                        <Row id="our-purpose">
                            <Col>
                                <Image
                                    id="team-photo-homepage"
                                    alt="GSGGB Team Photo"
                                    src={teamPhotoHomepage}
                                />
                                <h4 className="about-us-subheader">Our Purpose</h4>
                                <br/>
                                <p className="description">
                                    Founded in 2016 at the University of
                                    Toronto, GSGGB - Global Society for Genetics
                                    and Genome Biology, is an international
                                    organization that strives to advance
                                    scientific research towards better
                                    treatments and cures for genetic disorders.
                                    We aim to accomplish our vision through a
                                    wide-spectrum of innovative projects,
                                    fundraising events, academic seminars,
                                    conferences, as well as local community and
                                    global outreach initiatives.
                                </p>
                            </Col>
                        </Row>
                        <Row id="our-mission">
                            <Col>
                                <Image
                                    id="conference-photo"
                                    alt="GSGGB Conference Photo"
                                    src={conferencePhoto}
                                />
                                <h4 className="about-us-subheader">Our Mission</h4>
                                <br/>
                                <p className="description">
                                    GSGGB focuses mainly on educating both its
                                    members and the public about genetic
                                    diseases. We strive to raise awareness about
                                    a wide array of genetic conditions, from the
                                    very rare Hutchinson–Gilford Progeria
                                    syndrome to the very common cystic fibrosis.
                                    GSGGB will also invite guest speakers who
                                    are leaders in their field of research, to
                                    talk about their research and educate the
                                    club members about the topics discussed.
                                    Furthermore, we try to raise funds for
                                    foundations such as the Canadian Gene Cure
                                    foundation to support research grants and
                                    clinical studies in the field of genetics.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="announcements-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="section-title" id="announcements">
                            Announcements
                            {addAnnouncementButton}
                        </h2>
                        <hr className="homepage-separator"></hr>
                        <div className="announcement-toasts">{this.state.announcements}</div>
                    </div>
                </div>
                <Modal
                    show={this.state.displayAnnouncementModal}
                    onHide={() => this.setState({ displayAnnouncementModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new announcement</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    name="announcementContent"
                                    as="textarea"
                                    placeholder="Add announcement content here..."
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
                                    addAnnouncement(this);
                                    this.setState({ displayAnnouncementModal: false })
                                }}
                                >
                                    CREATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <div className="latest-research-section">
                    <div className="container">
                        <hr></hr>
                        <h2 className="section-title" id="latest-research">
                            Latest Research
                            {addResearchButton}
                        </h2>
                        <hr className="homepage-separator"></hr>
                        <div className="research-posts">
                            <Row>{this.state.researchPosts}</Row>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.displayResearchModal}
                    onHide={() => this.setState({ displayResearchModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new research post (Facebook URL)</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    name="researchURL"
                                    as="textarea"
                                    placeholder="Add Facebook URL here..."
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
                                    addResearchPost(this);
                                    this.setState({ displayResearchModal: false })
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

export default HomePage;

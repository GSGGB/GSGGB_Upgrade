import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Button, Modal, ModalBody, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import "./styles.css";
import "./styles-mobile.css";
import banner from "./static/banner.jpg";
import teamPhoto from "./static/team-photo.jpg";
import conferencePhoto from "./static/conference-photo.jpg";

// Importing announcement actions/required methods.
import { getAnnouncements, updateContent, addAnnouncement } from "../../actions/announcement";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/home");
        getAnnouncements(this);
    }

    state = {
        announcements: [],
        displayAnnouncementModal: false,
        announcementContent: "",
        displayResearchModal: false,
        researchContent: ""
    };


    addAnnouncementButton() {
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if ((accountType === "Editor" || accountType === "Administrator") && loggedIn === "true") {
            return (
                <Button
                    variant="outline-info"
                    onClick={() => this.setState({ displayAnnouncementModal: true })}
                >
                    Add announcement
                </Button>
            )
        }
    }


    render() {
        const announcementButton = this.addAnnouncementButton();

        return (
            <BrowserRouter forceRefresh={true}>
                <div className="banner">
                  <Image id="banner-photo" alt="GSGGB Banner" src={banner} />
                </div>
                <div className="about-us-section">
                    <div className="container">
                        <h2 className="section-title" id="about-us">About Us</h2>
                        <hr className="title-separator"></hr>
                        <Row id="our-purpose">
                            <Col>
                                <Image
                                    id="team-photo"
                                    alt="GSGGB Team Photo"
                                    src={teamPhoto}
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
                      <h2 className="section-title" id="announcements">Announcements</h2>
                      <span>{announcementButton}</span>
                      <hr className="title-separator"></hr>
                      <span>{this.state.announcements}</span>
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
                                  id="announcementContent"
                                  as="textarea"
                                  placeholder="Add announcement content here..."
                                  rows="5"
                                  onChange={e => updateContent(this, e.target)}
                                  required
                              />
                          </Form.Group>
                          <Button
                              variant="outline-info"
                              type="submit"
                              onClick={() => addAnnouncement(this)}
                              >
                                  CREATE
                          </Button>
                      </Form>
                  </ModalBody>
              </Modal>

              <div className="latest-research-section">
                  <div className="container">
                      <h2 className="section-title" id="latest-research">Latest Research</h2>
                      <hr className="title-separator"></hr>

                  </div>
              </div>

              <div className="contact-us-section">
                  <div className="container">
                      <h2 className="section-title" id="contact-us">Contact Us</h2>
                      <hr className="title-separator"></hr>

                  </div>
              </div>
          </BrowserRouter>
        );
    }
}

export default HomePage;

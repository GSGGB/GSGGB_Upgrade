import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Button, Form, Modal, ModalBody} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import "./styles.css";
import "./styles-mobile.css";
import banner from "./static/banner.jpg";
import teamPhoto from "./static/team-photo.jpg";
import conferencePhoto from "./static/conference-photo.jpg";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/home");
        this.num = 0;
    }

    state = {
        announcements: [],
        displayModal: false,
        announcementModalHeader: "",
        announcementModalForm: "",
    };

    render() {
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
                      <Button
                          id="add-announcement-button"
                          variant="info"
                          onClick={() => this.newAnnouncementForm()}
                      >
                          Add announcement
                      </Button>
                      <hr className="title-separator"></hr>
                      <span>{this.state.announcements}</span>
                  </div>
              </div>
              <Modal
                  show={this.state.displayModal}
                  onHide={() => this.closeModal()}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
              >
                  <ModalHeader closeButton>{this.state.announcementModalHeader}</ModalHeader>
                  <ModalBody>{this.state.announcementModalForm}</ModalBody>
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

    getAnnouncements() {
        // the URL for the request
        const url = "/announcementsDatabase";

        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
            .then(res => {
                if (res.status === 200) {
                    // return a promise that resolves with the JSON body
                    return res.json();
                } else {
                    alert("Could not get announcements");
                }
            })
            .then(json => {
                // the resolved promise with the JSON body
                console.log(json)
                this.setState({announcements : []})
                for (let announcement of json.announcements) {
                    this.addAnnouncement(announcement._id, announcement.userId, announcement.paragraph)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default HomePage;

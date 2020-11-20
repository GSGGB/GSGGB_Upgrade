import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import "./styles.css";
import banner from "./static/banner.jpg";
import teamPhoto from "./static/team-photo.jpg";
import conferencePhoto from "./static/conference-photo.jpg";

class Home extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
      this.username = localStorage.getItem("username");
      this.accountType = localStorage.getItem("accountType");
      this.num = 0;
    }

    state = {
      announcements: [],
      displayModal: false,
      announcementModalHeader: "",
      announcementModalForm: "",
    };

    closeModal() {
      this.setState({ displayModal: false });
    }

    render() {
        return (
          <BrowserRouter forceRefresh={true}>
            <div className="banner-section">
              <Image id="banner" alt="banner" src={banner} />
            </div>
            <div className="about-section" id="about">
              <div className="container">
                <h2 className="about-title">About Us</h2>
                <hr className="title-separator"></hr>
                <Row id="first-row">
                  <Col>
                    <Image
                      id="team-photo"
                      alt="team-photo"
                      src={teamPhoto}
                    />
                    <h4 className="about-subtitle">Our Purpose</h4>
                    <br/>
                    <p className="paragraph">
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
                <Row id="second-row">
                  <Col>
                    <Image
                      id="conference-photo"
                      alt="conference-photo"
                      src={conferencePhoto}
                    />
                    <h4 className="about-subtitle">Our Mission</h4>
                    <br/>
                    <p className="paragraph">
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

            <div className="announcements-section" id="announcements">
              <div className="container">
                <h2 className="section-title">Announcements</h2>
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
          </BrowserRouter>
        );
    }
}

export default Home;

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Modal, Button, Card, Carousel } from "react-bootstrap";
import { FaLinkedin, FaEnvelope, FaInfo } from "react-icons/fa";

import "./styles.css";
import "./styles-mobile.css";
import { SENIOR_STAFF, CONFERENCE, MARKETING, AFFAIRS, MENTORSHIP, EVENTS, TECH_INNOVATIONS, JIGG, ALUMNI } from './executives.js';
import teamPhoto1819 from "./static/team-photo-18-19.jpg";
import teamPhoto1718 from "./static/team-photo-17-18.jpg";

class Team extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/team");
        this.renderExec = this.renderExec.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        modalId: ""
    }

    handleClose() {
        this.setState({
            modalId: ""
        });
    }

    renderExec(exec) {
        return (
          <Col>
              <Card className="executive-card mx-auto">
                  <Card.Img className="executive-photo" src={exec.image} key={exec.firstname} />
                  <Card.Body>
                  <Card.Title className="executive-name">{exec.name}</Card.Title>
                  <Card.Text className="executive-position">{exec.position}</Card.Text>

                  <Button className="view-biography" onClick={() =>
                      this.setState({
                          modalId: `modal${exec.id}`
                      })
                  }>
                      <span className="card-icon" id="biography">
                          <FaInfo />
                      </span>
                  </Button>
                  <a
                    href={exec.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                      <span className="card-icon" id="linkedin">
                          <FaLinkedin />
                      </span>
                  </a>
                  <a
                    href={`mailto:${exec.email}`}
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
                  show={this.state.modalId === `modal${exec.id}`}
                  onHide={this.handleClose}
                  aria-labelledby={`${exec.firstname}ModalLabel`} backdrop="static"
                  keyboard={false}
                  key={exec.firstname}
                  size = "lg">
                  <Modal.Header
                      id={`${exec.firstname}ModalLabel`}
                      style={{
                          backgroundColor: "whitesmoke"
                      }}
                      closeButton>
                  </Modal.Header>
                  <Modal.Body className="biography-modal">
                      <Row>
                          <Col lg={4}>
                              <Image className="enlarged-executive-photo" src={exec.image} />
                          </Col>
                          <Col lg={8} className="biography-content">
                              <h3 className="name">{exec.name}</h3>
                              <h5 className="position">{exec.position}</h5>
                              <hr class="biography-line" />
                              <p className="biography">{exec.biography}</p>
                          </Col>
                      </Row>
                  </Modal.Body>
              </Modal>
          </Col>
        );
    };

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <br/><br/>

                <div class="team-title-section">
                    <h2 className="team-page-title">OUR EXECUTIVE TEAM</h2>
                    <br />
                    <h4 className="team-page-subtitle">(Fall 2020 - Winter 2021)</h4>
                </div>

                <br/>
                <Carousel>
                    <Carousel.Item className="team-slideshow">
                        <Image className="team-photo" alt="2018-2019 GSGGB Executive Team" src={teamPhoto1819} />
                        <Carousel.Caption>
                            <h3 className="slideshow-caption">2018-2019 GSGGB Executive Team</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="team-slideshow">
                        <Image className="team-photo" alt="2017-2018 GSGGB Executive Team" src={teamPhoto1718} />

                        <Carousel.Caption>
                            <h3 className="slideshow-caption">2017-2018 GSGGB Executive Team</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="team-slideshow">
                    <br/>
                </div>

                <br /><br /><br />
                <h3 className="team-name" id="senior-staff">SENIOR STAFF</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {SENIOR_STAFF.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="conference">CONFERENCE</h3>
                <br />
                <div className="container" id="team-members">
                  <Row>
                      {CONFERENCE.map(this.renderExec)}
                  </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="marketing">MARKETING</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {MARKETING.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="affairs">AFFAIRS</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {AFFAIRS.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="mentorship">MENTORSHIP</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {MENTORSHIP.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="events">EVENTS</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {EVENTS.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="tech-and-innovations">TECHNOLOGY &amp; INNOVATIONS</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {TECH_INNOVATIONS.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="jigg">JIGG</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {JIGG.map(this.renderExec)}
                    </Row>
                </div>
                <br />


                <hr className="team-section-separator" />
                <br /><br />
                <h3 className="team-name" id="alumni">ALUMNI</h3>
                <br />
                <div className="container" id="team-members">
                    <Row>
                        {ALUMNI.map(this.renderExec)}
                    </Row>
                </div>
                <br />

                <hr className="team-section-separator" />
                <br/><br/>

            </BrowserRouter>
        );
    }
}

export default Team;

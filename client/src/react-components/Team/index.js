import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col, Modal, Button } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import { SENIOR_STAFF, CONFERENCE, MARKETING, AFFAIRS, MENTORSHIP, EVENTS, TECH_INNOVATIONS, JIGG } from './executives.js';

const Team = () => {
    const [modalId, setModalId] = React.useState("");
    const handleClose = () => setModalId("");

    const renderExec = (exec) => {
        return (
          <Col md={4}>
              <div>
                  <Button className="executive-photo" onClick={() => setModalId(`modal${exec.id}`)}>
                      <Image className="executive-photo" src={exec.image} key={exec.firstname} />
                  </Button>
                  <div>
                      <h3 className="executive-name">{exec.name}</h3>
                      <h5 className="executive-position">{exec.position}</h5>
                  </div>
              </div>

              <Modal show={modalId === `modal${exec.id}`} onHide={handleClose}
              aria-labelledby={`${exec.firstname}ModalLabel`} backdrop="static"
              keyboard={false} key={exec.firstname} size = "lg">
                  <Modal.Header id={`${exec.firstname}ModalLabel`} closeButton>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="container">
                          <Row>
                              <Col lg={12}>
                                  <Image className="enlarged-executive-photo" src={exec.image} />
                                  <h3 className="name">{exec.name}</h3>
                                  <h5 className="position">{exec.position}</h5>
                                  <hr className="divider" />
                                  <p className="biography">{exec.biography}</p>
                              </Col>
                          </Row>
                      </div>
                  </Modal.Body>
              </Modal>
          </Col>
        );
    };

    return (
        <BrowserRouter forceRefresh={true}>
            <div className="white-background-section">
                <div>
                    <br /><br /><br />
                    <h3 className="team-name" id="senior-staff">Senior Staff</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {SENIOR_STAFF.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="cloud-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="conference">Conference</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {CONFERENCE.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="white-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="marketing">Marketing</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {MARKETING.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="cloud-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="affairs">Affairs</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {AFFAIRS.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="white-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="mentorship">Mentorship</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {MENTORSHIP.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="cloud-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="events">Events</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {EVENTS.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="white-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="tech-and-innovations">Technology &amp; Innovations</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {TECH_INNOVATIONS.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="cloud-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name" id="jigg">JIGG</h3>
                    <br />
                    <Row className="grid-container team-members">
                        {JIGG.map(renderExec)}
                    </Row>
                </div>
                <br />
            </div>

            <div className="white-background-section">
                <div>
                    <hr className="team-section-separator" />
                    <br /><br />
                    <h3 className="team-name">Alumni</h3>
                    <br />
                    <p className="learn-more">You can click <a href="https://www.gsggb.org/team2019-2020">here</a> to learn more about our previous GSGGB executives from the 2019 - 2020 academic year.</p>
                    <p className="learn-more">You can click <a href="https://www.gsggb.org/team2018-2019">here</a> to learn more about our previous GSGGB executives from the 2018 - 2019 academic year.</p>
                    <p className="learn-more">You can click <a href="https://www.gsggb.org/team2017-2018">here</a> to learn more about our previous GSGGB executives from the 2017 - 2018 academic year.</p>
                    <br />
                </div>
            </div>

        </BrowserRouter>
    );
}

export default Team;

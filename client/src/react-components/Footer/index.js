import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import "./styles.css";

class Footer extends Component {
    render() {
        return (
            <div className="footer-section">
                <BrowserRouter forceRefresh={true}>
                    <Row>
                        <Col>
                            <a
                                href="mailto:info@gsggb.org"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <span className="social-media-icon" id="email">
                                    <FaEnvelope />
                                </span>
                            </a>
                            <a
                              href="https://www.instagram.com/uoftgsggb/"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                                <span className="social-media-icon" id="instagram">
                                    <FaInstagram />
                                </span>
                            </a>
                            <a
                                href="https://www.facebook.com/GSGGB/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <span className="social-media-icon" id="facebook">
                                    <FaFacebookF />
                                </span>
                            </a>
                            <a
                              href="https://twitter.com/uoftgenetics/"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                                <span className="social-media-icon" id="twitter">
                                    <FaTwitter />
                                </span>
                            </a>
                            <p className="copyright-text">
                                Copyright © 2022{" "}
                                <b>
                                    Global Society for Genetics and Genome
                                    Biology.
                                </b>{" "}
                                All rights reserved.
                            </p>
                        </Col>
                    </Row>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Footer);

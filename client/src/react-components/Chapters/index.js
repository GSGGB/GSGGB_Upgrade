import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import gsggb_logo from "./static/gsggb-logo.png";
import uoft_logo from "./static/uoft-logo.png";
import mcmaster_logo from "./static/mcmaster-logo.png";
import queens_logo from "./static/queens-logo.png";

class Chapters extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/");
        document.title = "GSGGB | Chapters";
    }

    render() {
        return (
            <div className="chapters-page">
                <BrowserRouter forceRefresh={true}>
                    <div className="chapters-layout">
                        <Row>
                            <Col xl={6}>
                                <Image id="gsggb-logo-chapters" alt="logo" src={gsggb_logo} />
                                <h2 className="logo-name">GSGGB</h2>
                            </Col>
                            <Col xl={6} className="text-center">
                                <div>
                                    <h1 className="chapters-title">Our Chapters</h1>
                                    <Button
                                        className="chapters-button"
                                        id="uoft-button"
                                        onClick={() => this.props.history.push("/home")}
                                    >
                                        <Image id="uoft-logo-chapters" alt="UofT Logo" src={uoft_logo} />
                                        University of Toronto
                                    </Button>
                                </div>
                                <br/>
                                <div>
                                    <Button
                                        className="chapters-button"
                                        id="mcmaster-button"
                                    >
                                        <Image id="mcmaster-logo-chapters" alt="McMaster Logo" src={mcmaster_logo} />
                                        McMaster University
                                    </Button>
                                </div>
                                <br/>
                                <div>
                                    <Button
                                        className="chapters-button"
                                        id="queens-button"
                                    >
                                        <Image id="queens-logo-chapters" alt="Queen's Logo" src={queens_logo} />
                                        Queen's University
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Chapters);

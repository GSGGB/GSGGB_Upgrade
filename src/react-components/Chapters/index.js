import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

import "./styles.css";
import gsggb_logo from "./static/gsggb-logo.png";
import uoft_logo from "./static/uoft-logo.png";
import mcmaster_logo from "./static/mcmaster-logo.png";
import queens_logo from "./static/queens-logo.png";

class Chapters extends Component {
    render() {
        return (
            <div className="chapters-page">
              <BrowserRouter forceRefresh={true}>
                <div className="chapters-box">
                  <Row>
                    <Col md={6}>
                      <Image id="gsggb-logo" alt="logo" src={gsggb_logo} />
                    </Col>
                    <Col md={6}>
                      <div>
                        <h1 className="chapters-title">GSGGB Chapters</h1>
                        <br/>
                        <Button className="chapters-button" id="uoft-button">
                          <Image id="uoft-logo" alt="logo" src={uoft_logo} />
                          University of Toronto
                        </Button>
                      </div>
                      <br/>
                      <div>
                        <Button className="chapters-button" id="mcmaster-button">
                          <Image id="mcmaster-logo" alt="logo" src={mcmaster_logo} />
                          McMaster University
                        </Button>
                      </div>
                      <br/>
                      <div>
                        <Button className="chapters-button" id="queens-button">
                          <Image id="mcmaster-logo" alt="logo" src={queens_logo} />
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

import React, { Component } from "react";
import { withRouter, BrowserRouter, Link } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

import "./styles.css";
import "./styles-mobile.css";
import gsggb_logo from "./static/gsggb-logo.png";

class Login extends Component {
    render() {
        return (
          <div className="login-page">
              <BrowserRouter forceRefresh={true}>
                  <div className="login-form">
                      <Row>
                          <Col xl={6}>
                              <Image id="gsggb-logo-login" alt="GSGGB Logo" src={gsggb_logo} />
                          </Col>

                          <Col xl={6}>
                              <h1 className="login-header">Login</h1>
                              <div
                                  className="alert alert-danger text-center"
                                  id="login-error"
                              >
                              <FaExclamationCircle />
                                    &nbsp; Invalid username or password. Please
                                    try again.
                              </div>

                            <Form>
                                <Form.Group>
                                  <Form.Label id="login-label">
                                     Username
                                  </Form.Label>

                                  <Form.Control
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    required
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <Form.Label id="login-label">
                                     Password
                                  </Form.Label>

                                  <Form.Control
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                  />
                                </Form.Group>
                                <Button id="login-button">
                                  LOGIN
                                </Button>
                                <hr />
                                <Link to="/home">
                                  <Button id="homepage-button">
                                    BACK TO HOMEPAGE
                                  </Button>
                                </Link>
                            </Form>
                          </Col>
                        </Row>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(Login);

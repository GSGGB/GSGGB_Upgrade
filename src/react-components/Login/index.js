import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

import "./styles.css";
import gsggb_logo from "./static/gsggb-logo.png";

class Login extends Component {
    render() {
        return (
            <div className="login-page">
              <BrowserRouter forceRefresh={true}>
                  <div className="login-form">
                      <Row>
                          <Col md={6}>
                              <Image id="logo" alt="logo" src={gsggb_logo} />
                          </Col>

                          <Col md={6}>
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
                                        <Form.Control
                                            id="username"
                                            type="text"
                                            placeholder="Username"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
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

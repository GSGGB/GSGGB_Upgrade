import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

// Importing actions/required methods
import { updateLoginCredentials, login, returnToHomePage } from "../../actions/user";

import "./styles.css";
import "./styles-mobile.css";
import gsggb_logo from "./static/gsggb-logo.png";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/login");
    }

    // Login information.
    state = {
        username: "",
        password: ""
    }

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
                                          name="username"
                                          id="username"
                                          type="text"
                                          placeholder="Username"
                                          onChange={e => updateLoginCredentials(this, e.target)}
                                          required
                                      />
                                    </Form.Group>

                                    <Form.Group>
                                      <Form.Label id="login-label">
                                         Password
                                      </Form.Label>

                                      <Form.Control
                                          name="password"
                                          id="password"
                                          type="password"
                                          placeholder="Password"
                                          onChange={e => updateLoginCredentials(this, e.target)}
                                          required
                                      />
                                    </Form.Group>
                                    <Button
                                        id="login-button"
                                        onClick={() => login(this)}
                                    >
                                        LOGIN
                                    </Button>
                                    <hr />
                                    <Button
                                        id="homepage-button"
                                        onClick={() => returnToHomePage(this)}
                                    >
                                        RETURN TO HOMEPAGE
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

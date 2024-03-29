import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";
import "./styles-mobile.css";
import gsggb_logo from "./static/gsggb-logo.png";

// Importing user actions/required methods.
import { updateLoginCredentials, login, returnToHomePage } from "../../actions/user";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/login");
        document.title = "GSGGB | Login";
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
                                      <FontAwesomeIcon icon={faExclamationCircle} size={25}/>
                                      &nbsp; Invalid username or password. Please
                                      try again.
                                </div>
                                <div
                                    className="alert alert-danger text-center"
                                    id="account-deactivated-error"
                                >
                                      <FontAwesomeIcon icon={faExclamationCircle} size={25}/>
                                      &nbsp; This account has been deactivated by an administrator.
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            login(this)
                                        }}
                                    >
                                        LOGIN
                                    </Button>
                                    <hr />
                                    <Button
                                        id="homepage-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            returnToHomePage(this)
                                        }}
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

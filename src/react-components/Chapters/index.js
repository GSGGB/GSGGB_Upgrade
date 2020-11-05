import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

import "./styles.css";
import logo from "./static/logo.png";

class Chapters extends Component {
    constructor(props) {
        super(props);
        this.userRouteChange = this.userRouteChange.bind(this);
        this.visitorRouteChange = this.visitorRouteChange.bind(this);
        this.registerRouteChange = this.registerRouteChange.bind(this);
    }

    render() {
        return (
            <div className="login-page">
                <BrowserRouter forceRefresh={true}>
                    <div className="login-form">
                        <Row>
                            <Col md={6}>
                                <Image id="logo" alt="logo" src={logo} />
                            </Col>

                            <Col md={6}>
                                <h1 className="login-title">Login</h1>
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
                                            id="user-name"
                                            type="text"
                                            placeholder="Type your username"
                                            onChange={e => {
                                                this.setState({
                                                    username: e.target.value
                                                });
                                            }}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label id="login-label">
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            id="user-pass"
                                            type="password"
                                            placeholder="Type your password"
                                            onChange={e =>
                                                this.setState({
                                                    password: e.target.value
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        id="user-button"
                                        onClick={this.userRouteChange}
                                    >
                                        LOGIN
                                    </Button>
                                    <hr></hr>
                                    <Button
                                        id="visitor-button"
                                        onClick={this.visitorRouteChange}
                                    >
                                        CONTINUE AS A VISITOR
                                    </Button>
                                    <Button
                                        id="create-account-button"
                                        onClick={this.registerRouteChange}
                                    >
                                        CREATE ACCOUNT
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

export default withRouter(Chapters);

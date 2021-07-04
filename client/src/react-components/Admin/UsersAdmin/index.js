import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Card, Table, Button, Form, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import { updateUserForm, getAllUsers, addUser } from "../../../actions/user";

import "./styles.css";

class UsersAdmin extends Component {
    state = {
        users: [],
        displayUserModal: false,
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userUsername: "",
        userPassword: "",
        userConfirmPassword: "",
        userAccountType: "Administrator", // Default option.
        userExecutivePosition: ""
    };

    componentDidMount(){
        getAllUsers(this);
    }

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Card>
                        <Card.Header className="user-table-header">
                            User Profiles
                            <Button
                                id="add-user-button"
                                variant="info"
                                onClick={() => this.setState({ displayUserModal: true })}>
                                Add new user
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table border hover>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.users}</tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>

                <Modal
                    show={this.state.displayUserModal}
                    onHide={() => this.setState({ displayUserModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Add new user</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userFirstName"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userLastName"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="userEmail"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userUsername"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="userPassword"
                                    autocomplete="off"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="userConfirmPassword"
                                    autocomplete="off"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Account type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="userAccountType"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                >
                                    <option>Administrator</option>
                                    <option>Editor</option>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Executive position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="userExecutivePosition"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    if (this.state.userPassword === this.state.userConfirmPassword){
                                        e.preventDefault();
                                        addUser(this);
                                        this.setState({ displayUserModal: false });
                                    } else{
                                        alert("Passwords don't match. Please try again.");
                                    }
                                }}
                                >
                                    CREATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </BrowserRouter>
        );
    }
}

export default UsersAdmin;

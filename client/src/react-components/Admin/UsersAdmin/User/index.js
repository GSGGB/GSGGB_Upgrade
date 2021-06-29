import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';

import { updateUserForm, getUserById, editUser, deleteUser, deactivateUser, reactivateUser } from "../../../../actions/user";

import "./styles.css";

class User extends Component {
    state = {
        displayModal: false,
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        accountType: "",
        executivePosition: "",
        deactivated: false
    };

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <tr>
                        <td>{this.props.username}</td>
                        <td>{this.props.accountType}</td>

                        {(this.props.deactivated ?
                          <td className="deactivated">Deactivated</td>
                          : <td className="activated">Activated</td>
                        )}

                        {(this.props.username === "jahn" ?
                          <td>No actions allowed</td>
                          : <td>
                              <Button
                                  variant="outline-info"
                                  onClick={() => getUserById(this, this.props.userId)}>
                                  Edit
                              </Button>
                              <Button
                                  variant="outline-danger"
                                  onClick={() => {
                                      confirmAlert({
                                          message: 'Please confirm deletion of this user.',
                                          buttons: [
                                              {
                                                label: 'Yes',
                                                onClick: () => deleteUser(this.props.usersAdminComp, this.props.userId)
                                              },
                                              {
                                                label: 'No'
                                              }
                                          ]
                                      });
                                  }}>
                                  Delete
                              </Button>
                              {(this.props.deactivated ?
                                <Button
                                    variant="outline-success"
                                    onClick={() => {
                                        confirmAlert({
                                            message: 'Please confirm reactivation of this user.',
                                            buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => reactivateUser(this.props.usersAdminComp, this.props.userId)
                                                },
                                                {
                                                  label: 'No'
                                                }
                                            ]
                                        });
                                    }}>
                                    Reactivate
                                </Button>
                                : <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        confirmAlert({
                                            message: 'Please confirm deactivation of this user.',
                                            buttons: [
                                                {
                                                  label: 'Yes',
                                                  onClick: () => deactivateUser(this.props.usersAdminComp, this.props.userId)
                                                },
                                                {
                                                  label: 'No'
                                                }
                                            ]
                                        });
                                    }}>
                                    Deactivate
                                </Button>
                              )}
                          </td>
                        )}
                    </tr>
                </div>

                <Modal
                    show={this.state.displayModal}
                    onHide={() => this.setState({ displayModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Edit user</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    rows="1"
                                    defaultValue={this.state.firstName}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    rows="1"
                                    defaultValue={this.state.lastName}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    rows="1"
                                    defaultValue={this.state.email}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    rows="1"
                                    defaultValue={this.state.username}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
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
                                    name="confirmPassword"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Executive position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="executivePosition"
                                    rows="1"
                                    defaultValue={this.state.executivePosition}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Button
                                variant="outline-info"
                                type="submit"
                                onClick={(e) => {
                                    if (this.state.password === this.state.confirmPassword){
                                        e.preventDefault();
                                        editUser(this, this.props.usersAdminComp, this.props.userId);
                                        this.setState({ displayModal: false });
                                    } else{
                                        alert("Passwords don't match. Please try again.");
                                    }
                                }}
                                >
                                    UPDATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </BrowserRouter>
        );
    }
}

export default User;

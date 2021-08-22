import React, { Component } from "react";
import { Button, Form, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import { updateImageFile } from "../../../../actions/image";
import { updateUserForm, getUserById, editUser, deleteUser, updateUserPassword,
  deactivateUser, reactivateUser } from "../../../../actions/user";

import "./styles.css";

class User extends Component {
    state = {
        displayEditModal: false,
        displayDeleteModal: false,
        displayPasswordModal: false,
        displayDeActivateModal: false,
        displayReactivateModal: false,
        imageFile: "",
        imageId: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        accountType: "Administrator", // Default option.
        executivePosition: "",
        deactivated: false,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    // Delete user button for all other users other than themselves.
    deleteUserButton(){
        const username = sessionStorage.getItem("username");
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (accountType === "Administrator" && username !== this.props.username){
                return (
                    <Button
                        variant="outline-danger"
                        onClick={() => this.setState({ displayDeleteModal: true })}>
                        Delete
                    </Button>
                )
            }
        }
    }

    // Deactivate/reactivate button for all other users other than themselves.
    activateButton(){
        const username = sessionStorage.getItem("username");
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (accountType === "Administrator" && username !== this.props.username){
                if (this.props.deactivated){
                    return (
                        <Button
                            variant="outline-success"
                            onClick={() => this.setState({ displayReactivateModal: true })}>
                            Reactivate
                        </Button>
                    )
                } else{
                    return (
                        <Button
                            variant="outline-danger"
                            onClick={() => this.setState({ displayDeactivateModal: true })}>
                            Deactivate
                        </Button>
                    )
                }
            }
        }
    }

    // Checkbox for edit user form. Checked if user wishes to upload a new headshot.
    displayCheckbox(){
        const userImageCheckbox = document.querySelector("#user-image-checkbox");
        const userImageFileEdit = document.querySelector("#user-image-file-edit");

        // If the checkbox is checked, display the output text
        if (userImageCheckbox.checked === true){
            userImageFileEdit.style.display = "block";
        } else {
            userImageFileEdit.style.display = "none";
        }
    }

    render() {
        const deleteUserButton = this.deleteUserButton();
        const activateButton = this.activateButton();

        return (
            <tr>
                <td>
                    <img src={this.props.imageURL} className="usersadmin-headshot" alt="headshot" />
                    {this.props.username}
                </td>
                <td>{this.props.executivePosition}</td>
                <td>{this.props.accountType}</td>

                {(this.props.deactivated ?
                  <td className="deactivated">Deactivated</td>
                  : <td className="activated">Activated</td>
                )}

                {(this.props.username === "master_admin" || this.props.username === "jahn" ?
                  <td>No actions allowed</td>
                  : <td>
                      <Button
                          variant="outline-info"
                          onClick={() => getUserById(this, this.props.userId)}>
                          Edit
                      </Button>

                      {deleteUserButton}

                      <Button
                          variant="outline-secondary"
                          onClick={() => this.setState({ displayPasswordModal: true })}>
                          Change password
                      </Button>

                      {activateButton}
                  </td>
                )}

                <Modal
                    show={this.state.displayEditModal}
                    onHide={() => this.setState({ displayEditModal: false })}
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
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    id="user-image-checkbox"
                                    type="checkbox"
                                    label="Change existing headshot (with square image orientation)"
                                    onClick={() => {
                                        this.displayCheckbox();
                                    }}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    name="imageFile"
                                    id="user-image-file-edit"
                                    onChange={e => updateImageFile(this, e.target)}
                                    required />
                            </Form.Group>
                            <br/>
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
                                <Form.Label>Username (Cannot be changed after account creation)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    rows="1"
                                    defaultValue={this.state.username}
                                    onChange={e => updateUserForm(this, e.target)}
                                    readOnly
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Account type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="accountType"
                                    defaultValue={this.state.accountType}
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
                                    name="executivePosition"
                                    rows="1"
                                    defaultValue={this.state.executivePosition}
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label><strong>Confirm changes with the user's password</strong></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    autocomplete="off"
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
                                    e.preventDefault();
                                    editUser(this, this.props.usersAdminComp, this.props.imageCloudinaryId, this.props.userId);
                                    this.setState({ displayEditModal: false });
                                }}
                                >
                                    UPDATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal
                    show={this.state.displayPasswordModal}
                    onHide={() => this.setState({ displayPasswordModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Change password</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label>Old password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="oldPassword"
                                    autocomplete="off"
                                    rows="1"
                                    onChange={e => updateUserForm(this, e.target)}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>New password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
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
                                    name="confirmPassword"
                                    autocomplete="off"
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
                                    if (this.state.newPassword === this.state.confirmPassword){
                                        e.preventDefault();
                                        updateUserPassword(this, this.props.usersAdminComp, this.props.userId);
                                        this.setState({ displayPasswordModal: false });
                                    } else{
                                        alert("Passwords don't match. Please try again.");
                                    }
                                }}
                                >
                                    CHANGE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal
                    show={this.state.displayDeleteModal}
                    onHide={() => this.setState({ displayDeleteModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Delete user</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label><strong>Confirm deletion with the user's password</strong></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    autocomplete="off"
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
                                    e.preventDefault();
                                    deleteUser(this, this.props.usersAdminComp, this.props.imageCloudinaryId, this.props.userId);
                                    this.setState({ displayDeleteModal: false });
                                }}
                                >
                                    DELETE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal
                    show={this.state.displayDeactivateModal}
                    onHide={() => this.setState({ displayDeactivateModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Deactivate user</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label><strong>Confirm deactivation with the user's password</strong></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    autocomplete="off"
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
                                    e.preventDefault();
                                    deactivateUser(this, this.props.usersAdminComp, this.props.userId);
                                    this.setState({ displayDeactivateModal: false });
                                }}
                                >
                                    DEACTIVATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal
                    show={this.state.displayReactivateModal}
                    onHide={() => this.setState({ displayReactivateModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <ModalHeader closeButton>
                        <h4>Reactivate user</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Form.Group>
                                <Form.Label><strong>Confirm reactivation with the user's password</strong></Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    autocomplete="off"
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
                                    e.preventDefault();
                                    reactivateUser(this, this.props.usersAdminComp, this.props.userId);
                                    this.setState({ displayReactivateModal: false });
                                }}
                                >
                                    REACTIVATE
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </tr>
        );
    }
}

export default User;

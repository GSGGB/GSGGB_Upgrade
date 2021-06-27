import React, { Component } from "react";
import { Card, Table, Button, Form, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import { confirmAlert } from 'react-confirm-alert';

import { getAllUsers, getUserById, deleteUser, deactivateUser, reactivateUser } from "../../../actions/user";

import "./styles.css";

class UsersAdmin extends Component {
    state = {
        displayModal: false,
        rows: [],
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        accountType: "",
        executivePosition: "",
        deactivated: ""
    };

    componentDidMount(){
        getAllUsers(this);
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header className="user-table-header">
                        User Profiles
                        <Button
                            id="add-user-button"
                            variant="info"
                            onClick={() => {}}>
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
                            <tbody>{this.state.rows}</tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Modal
                    show={this.state.displayModal}
                    onHide={() => this.setState({ displayModal: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    addRow(id, username, accountType, deactivated) {
        this.setState({
            rows: this.state.rows.concat(
              <tr>
                  <td>{username}</td>
                  <td>{accountType}</td>

                  {(deactivated ?
                    <td className="deactivated">Deactivated</td>
                    : <td className="activated">Activated</td>
                  )}

                  <td>
                      <Button
                          variant="outline-info"
                          onClick={() => getUserById(this, id)}>
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
                                        onClick: () => deleteUser(this, id)
                                      },
                                      {
                                        label: 'No'
                                      }
                                  ]
                              });
                          }}>
                          Delete
                      </Button>
                      {(deactivated ?
                        <Button
                            variant="outline-success"
                            onClick={() => {
                                confirmAlert({
                                    message: 'Please confirm reactivation of this user.',
                                    buttons: [
                                        {
                                          label: 'Yes',
                                          onClick: () => reactivateUser(this, id)
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
                                          onClick: () => deactivateUser(this, id)
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
              </tr>
            )
        })
    }
}

export default UsersAdmin;

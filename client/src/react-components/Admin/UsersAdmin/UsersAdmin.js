import React, { Component } from "react";
import { Table, Button, Form, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import { getAllUsers, getUserById, deleteUser } from "../../../actions/user";

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
                <Table striped border hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.rows}</tbody>
                </Table>

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

    addRow(id, username, accountType) {
        this.setState({
            rows: this.state.rows.concat(
              <tr>
                  <td>{username}</td>
                  <td>{accountType}</td>
                  <td>
                      <Button
                          variant="outline-info"
                          onClick={() => getUserById(this, id)}>
                          Edit
                      </Button>
                      <Button
                          variant="outline-info"
                          onClick={() => deleteUser(this, id)}>
                          Delete
                      </Button>
                  </td>
              </tr>
            )
        })
    }
}

export default UsersAdmin;

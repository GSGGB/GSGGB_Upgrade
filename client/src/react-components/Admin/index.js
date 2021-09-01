import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import UsersAdmin from "./UsersAdmin";
import PositionsAdmin from "./PositionsAdmin";
import ApplicationsAdmin from "./ApplicationsAdmin";

import "./styles.css";

const tables = {
    users: <UsersAdmin></UsersAdmin>,
    positions: <PositionsAdmin></PositionsAdmin>,
    applications: <ApplicationsAdmin></ApplicationsAdmin>
};

class Admin extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/admin");
        document.title = "GSGGB U of T | Admin Page";
    }

    state = {
        displayedTable: "users" // Default display.
    };

    render() {
        return (
            <BrowserRouter>

                <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                    <div className="container">
                        <Navbar.Brand>Admin</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link
                                    href="#users"
                                    onClick={() =>
                                        this.setState({
                                            displayedTable: "users",
                                        })
                                    }
                                >
                                    Users
                                </Nav.Link>
                                <Nav.Link
                                    href="#positions"
                                    onClick={() =>
                                        this.setState({
                                            displayedTable: "positions",
                                        })
                                    }
                                >
                                    Positions
                                </Nav.Link>
                                <Nav.Link
                                    href="#applications"
                                    onClick={() =>
                                        this.setState({
                                            displayedTable: "applications",
                                        })
                                    }
                                >
                                    Applications
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>

                <br/><br/>

                <div className="container">
                    <div id="displayedTable">
                        {tables[this.state.displayedTable]}
                    </div>
                </div>

                <br/><br/>

            </BrowserRouter>
        );
    }
}

export default Admin;

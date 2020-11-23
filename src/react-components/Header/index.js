import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Image, NavDropdown} from "react-bootstrap";

import "./styles.css";
import logo from "./static/logo.png";

class Header extends Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { location } = this.props;

    return (
        <div className="header">
          <BrowserRouter>
            <div className="container">
              <Navbar collapseOnSelect expand="lg" className="navbar">
                <Navbar.Brand>
                  <Image id="small-logo" alt="logo" src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav
                      className="ml-auto"
                      as="ul"
                      fill
                      variant="pills"
                      activeKey={location.pathname}
                  >
                    <NavDropdown title = "HOME" id="dropdown">
                        <NavDropdown.Item href = "/home" id="dropdown-item">
                            HOME
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "/home#about-us" id="dropdown-item">
                            ABOUT US
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "/home#announcements" id="dropdown-item">
                            ANNOUNCEMENTS
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link href="/events" className="navbar-item">
                            EVENTS
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title = "TEAM" id="dropdown">
                        <NavDropdown.Item href = "/team#2019-2020" id="dropdown-item">
                            2019 - 2020 STAFF
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "/team#2018-2019" id="dropdown-item">
                            2018 - 2019 STAFF
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "/team#2017-2018" id="dropdown-item">
                            2017 - 2018 STAFF
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link href="/sponsors" className="navbar-item">
                            SPONSORS
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/conference" className="navbar-item">
                            CONFERENCE
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/get-involved" className="navbar-item">
                            GET INVOLVED
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/contact-us" className="navbar-item">
                            CONTACT US
                        </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </BrowserRouter>
        </div>
      );
  }
}

export default withRouter(Header);

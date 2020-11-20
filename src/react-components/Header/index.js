import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";

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
              <Navbar collapseOnSelect expand="lg" id="nav-bar">
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
                    <Nav.Item as="li">
                        <Nav.Link href="/home">
                            <span className="navbar-item">
                                HOME
                            </span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/home#about">
                            <span className="navbar-item">
                                ABOUT US
                            </span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/home#announcements">
                            <span className="navbar-item">
                                ANNOUNCEMENTS
                            </span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/events">
                            <span className="navbar-item">
                                EVENTS
                            </span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/blog">
                            <span className="navbar-item">
                                BLOG
                            </span>
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

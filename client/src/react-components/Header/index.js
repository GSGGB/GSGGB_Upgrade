import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Image, NavDropdown, Button } from "react-bootstrap";

// Importing actions/required methods
import { logout } from "../../actions/user";

import "./styles.css";
import "./styles-mobile.css";
import logo from "./static/logo.png";

class Header extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        const header = document.querySelector(".header");
        const logo = document.querySelector("#small-logo");
        const navbarDropdowns = document.querySelectorAll("#dropdown");
        const navbarDropdownItems = document.querySelectorAll("#dropdown-item");
        const navbarItems = document.querySelectorAll(".navbar-item");

        window.addEventListener("scroll", () => {
             if (document.body.scrollTop < window.innerHeight){
                header.style.backgroundColor = "#FEFBEA";
                header.style.boxShadow = "0 0 0 0";

                logo.style.width = "175px";

                navbarDropdowns.forEach(function(dropdown){
                    dropdown.style.fontSize = "18px";
                    dropdown.style.backgroundColor = "#FEFBEA";
                })

                navbarDropdownItems.forEach(function(item){
                    item.style.backgroundColor = "#FEFBEA";
                })

                navbarItems.forEach(function(item){
                    item.style.fontSize = "18px";
                    item.style.backgroundColor = "#FEFBEA";
                })
            }
            else {
                header.style.backgroundColor = "ghostwhite";
                header.style.boxShadow = "0 1px 0 0 #DADADA";

                logo.style.width = "125px";

                navbarDropdowns.forEach(function(dropdown){
                    dropdown.style.fontSize = "16px";
                    dropdown.style.backgroundColor = "ghostwhite";
                })

                navbarDropdownItems.forEach(function(item){
                    item.style.backgroundColor = "ghostwhite";
                })

                navbarItems.forEach(function(item){
                    item.style.fontSize = "16px";
                    item.style.backgroundColor = "ghostwhite";
                })
            }
        }, true);
    }

    // Logout button for editors and administrators only.
    logoutButton() {
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true") {
            return (
                <Nav.Item as="li">
                    <Button
                        id="logout-button"
                        variant="outline-info"
                        onClick={() => logout(this)}
                    >
                        LOG OUT
                    </Button>
                </Nav.Item>
              )
        }
    }


    render() {
      const { location } = this.props;
      const logoutButton = this.logoutButton();

      return (
          <BrowserRouter>
              <div className="header">
                  <div className="container">
                      <Navbar collapseOnSelect expand="lg">
                          <Navbar.Brand>
                              <a href="/home">
                                  <Image id="small-logo" alt="GSGGB Logo" src={logo} />
                              </a>
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
                                      <NavDropdown.Item href = "/home#about-us" id="dropdown-item">
                                          ABOUT US
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/home#announcements" id="dropdown-item">
                                          ANNOUNCEMENTS
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/home#latest-research" id="dropdown-item">
                                          LATEST RESEARCH
                                      </NavDropdown.Item>
                                  </NavDropdown>
                                  <NavDropdown title = "TEAM" id="dropdown">
                                      <NavDropdown.Item href = "/team#senior-staff" id="dropdown-item">
                                          SENIOR STAFF
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#conference" id="dropdown-item">
                                          CONFERENCE
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#marketing" id="dropdown-item">
                                          MARKETING
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#affairs" id="dropdown-item">
                                          AFFAIRS
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#mentorship" id="dropdown-item">
                                          MENTORSHIP
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#events" id="dropdown-item">
                                          EVENTS
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#tech-and-innovations" id="dropdown-item">
                                          TECH &amp; INNOVATIONS
                                      </NavDropdown.Item>
                                      <NavDropdown.Item href = "/team#jigg" id="dropdown-item">
                                          JIGG
                                      </NavDropdown.Item>
                                  </NavDropdown>

                                  <Nav.Item>
                                      <Nav.Link href="/events" className="navbar-item">
                                          EVENTS
                                      </Nav.Link>
                                  </Nav.Item>
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
                                      <Nav.Link href="/jigg" className="navbar-item">
                                          JIGG
                                      </Nav.Link>
                                  </Nav.Item>
                                  <span>{logoutButton}</span>
                              </Nav>
                          </Navbar.Collapse>
                      </Navbar>
                  </div>
              </div>
          </BrowserRouter>
        );
    }
}

export default withRouter(Header);
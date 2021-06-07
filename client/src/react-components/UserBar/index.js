import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

// Importing actions/required methods
import { logout } from "../../actions/user";

import "./styles.css";
import "./styles-mobile.css";
import uoft_logo from "./static/uoft-logo.png";

class UserBar extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    // Button to go back to chapters page.
    chaptersButton() {
        return (
            <Button
                id="chapters-button"
                variant="outline-light"
                onClick={() => this.props.history.push("/")}
            >
                BACK TO CHAPTERS
            </Button>
        )
    }

    // Admin button to redirect to admin only page.
    adminButton() {
        const loggedIn = sessionStorage.getItem("loggedIn");
        const accountType = sessionStorage.getItem("accountType");

        if (loggedIn === "true" && accountType === "Administrator") {
            return (
                <Button
                    id="admin-button"
                    variant="outline-light"
                    onClick={() => this.props.history.push("/admin")}
                >
                    ADMIN PAGE
                </Button>
              )
        }
    }

    // Logout button for editors and administrators only.
    logoutButton() {
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true") {
            return (
                <Button
                    id="logout-button"
                    variant="outline-light"
                    onClick={() => logout(this)}
                >
                    LOG OUT
                </Button>
              )
        }
    }

    render() {
      const chaptersButton = this.chaptersButton();
      const adminButton = this.adminButton();
      const logoutButton = this.logoutButton();

      return (
          <BrowserRouter>
              <div className="user-bar">
                  <div className="container">
                      <Image id="uoft-logo-user-bar" alt="UofT Logo" src={uoft_logo} />
                      <span className="chapters-text">University of Toronto Chapter</span>
                      <span>{logoutButton}{adminButton}{chaptersButton}</span>
                  </div>
              </div>
          </BrowserRouter>
        );
    }
}

export default withRouter(UserBar);

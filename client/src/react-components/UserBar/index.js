import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

// Importing actions/required methods
import { logout } from "../../actions/user";

import "./styles.css";
import uoft_logo from "./static/uoft-logo.png";

class UserBar extends Component {
    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    // Logout button for editors and administrators only.
    logoutButton() {
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true") {
            return (
                <Button
                    id="logout-button"
                    variant="outline-info"
                    onClick={() => logout(this)}
                >
                    LOG OUT
                </Button>
              )
        }
    }


    render() {
      const logoutButton = this.logoutButton();

      return (
          <BrowserRouter>
              <div className="user-bar">
                  <div class="container">
                      <Image id="uoft-logo-user-bar" alt="UofT Logo" src={uoft_logo} />
                      <span class="chapters-text">University of Toronto Chapter</span>
                      <span>{logoutButton}</span>
                  </div>
              </div>
          </BrowserRouter>
        );
    }
}

export default withRouter(UserBar);

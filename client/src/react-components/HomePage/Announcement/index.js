import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toast, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";

import { retrieveAccountDetails } from "../../../actions/user";

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'},
        firstName: "",
        lastName: "",
        username: "",
        execPosition: ""
    }

    modifyAnnouncementButton(){
        const username = localStorage.getItem("username");
        const accountType = localStorage.getItem("accountType");
        const loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (
              accountType === "Administrator" ||
              (accountType === "Editor" && username === this.state.username)
            ){
                return (
                    <Button
                        id="modify-announcement-button"
                        variant="outline-info"
                        size="sm"
                    >
                        <FontAwesomeIcon icon={faMinus} size={5}/>
                    </Button>
                )
            }
        }
    }

    deleteAnnouncementButton(){
      const username = localStorage.getItem("username");
      const accountType = localStorage.getItem("accountType");
      const loggedIn = localStorage.getItem("loggedIn");

      if (loggedIn === "true"){
          if (
            accountType === "Administrator" ||
            (accountType === "Editor" && username === this.state.username)
          ){
              return (
                  <Button
                      id="delete-announcement-button"
                      variant="outline-info"
                      size="sm"
                  >
                      <FontAwesomeIcon icon={faEdit} size={5}/>
                  </Button>
              )
          }
      }
    }

    render() {
      retrieveAccountDetails(this, this.props.userId);
      const headshot = this.state.firstName + ".jpg";
      const fullName = this.state.firstName + " " + this.state.lastName;
      const announcementDate = this.props.announcementDate.toLocaleString('en-US', this.state.options);

      const modifyAnnouncementButton = this.modifyAnnouncementButton(this.state.username);
      const deleteAnnouncementButton = this.deleteAnnouncementButton(this.state.username);

      return (
          <BrowserRouter forceRefresh={true}>
              <div className="announcement">
                  <Toast>
                      <Toast.Header closeButton="false">
                          <img src={`/headshots/${headshot}`} className="headshot" alt="headshot" />
                          <strong className="mr-auto">{fullName + " - " + this.state.execPosition}</strong>
                          <small>{announcementDate}</small>
                          <span>{modifyAnnouncementButton}{deleteAnnouncementButton}</span>
                      </Toast.Header>
                      <Toast.Body>
                          {this.props.announcementContent}
                      </Toast.Body>
                  </Toast>
              </div>
          </BrowserRouter>
      );
    }
}

export default Announcement;

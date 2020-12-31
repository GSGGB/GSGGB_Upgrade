import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toast } from "react-bootstrap";

import "./styles.css";

import { retrieveAccountDetails } from "../../../actions/user";

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        retrieveAccountDetails(this, this.props.userId);
    }

    state = {
        date: new Date(),
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        firstName: "",
        lastName: "",
        execPosition: ""
    }

    render() {
      const headshot = "./static/headshots/" + this.state.firstName + ".jpg";
      const fullName = this.state.firstName + " " + this.state.lastName;
      const announcementDate = this.state.date.toLocaleString('en-US', this.state.options);

      return (
          <BrowserRouter forceRefresh={true}>
              <div className="announcement">
                  <Toast>
                      <Toast.Header closeButton="false">
                        <img src={`/headshots/${headshot}`} className="headshot" alt="headshot" />
                        <strong className="mr-auto">{fullName + " - " + this.state.execPosition}</strong>
                        <small>{announcementDate}</small>
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

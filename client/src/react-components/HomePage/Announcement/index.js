import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toast } from "react-bootstrap";

import "./styles.css";

class Announcement extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
      date: new Date(),
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }

    render() {
      let newDate = this.state.date.toLocaleString('en-US', this.state.options);

      return (
          <BrowserRouter forceRefresh={true}>
          <div className="announcement">
            <Toast>
              <Toast.Header closeButton="false">
                <img src={this.props.profilePic} className="profile-pic" alt="profile-pic" />
                <strong className="mr-auto">{this.props.fullName + " - " + this.props.userType}</strong>
                <small>{newDate}</small>
              </Toast.Header>
              <Toast.Body>
                {this.props.paragraph}
              </Toast.Body>
            </Toast>
          </div>
          </BrowserRouter>
      );
    }
}

export default Announcement;

import React, { Component } from "react";
import { Button, Accordion } from "react-bootstrap";

import { deleteApplication, viewConfirmed, viewUnconfirmed } from "../../../../actions/applicant";

import "./styles.css";

class Applicant extends Component {

    // Delete application button for all administrators.
    deleteApplicationButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (accountType === "Administrator"){
                return (
                    <Button
                        variant="outline-danger"
                        onClick={(e) => {
                            e.preventDefault();
                            deleteApplication(this, this.props.imageCloudinaryId, this.props.applicantId);
                        }}
                        >
                            DELETE
                    </Button>
                )
            }
        }
    }

    // Viewed button for all administrators.
    viewedButton(){
        const accountType = sessionStorage.getItem("accountType");
        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn === "true"){
            if (accountType === "Administrator"){
                if (this.props.viewed){
                    return (
                        <Button
                            variant="outline-info"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                viewUnconfirmed(this, this.props.applicantId);
                            }}
                            >
                                UNCONFIRM VIEW
                        </Button>
                    )
                } else{
                    return (
                        <Button
                            variant="outline-info"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                viewConfirmed(this, this.props.applicantId);
                            }}
                            >
                                CONFIRM VIEW
                        </Button>
                    )
                }
            }
        }
    }

    render() {
        const deleteApplicationButton = this.deleteApplicationButton();
        const viewedButton = this.viewedButton();

        return (

          <Accordion.Item eventKey="0">
              <Accordion.Header>{this.props.fullName}{this.props.viewed}{deleteApplicationButton}{viewedButton}</Accordion.Header>
              <Accordion.Body>
                  {this.props.fullName}
              </Accordion.Body>
          </Accordion.Item>
        );
    }
}

export default Applicant;

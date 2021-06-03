import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import getInvolvedPhoto from "./static/getinvolved-photo.jpg";

class GetInvolved extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/get-involved");
        document.title = "GSGGB U of T | Get Involved";
    }

    state = {
    };

    render() {
        return (
            <BrowserRouter forceRefresh={true}>
                <div className="getinvolved-photo-container">
                    <Image className="getinvolved-photo" alt="2018-2019 Conference Q&A" src={getInvolvedPhoto} />
                    <span className="getinvolved-photo-title">
                        Get Involved
                        <h3 className="getinvolved-photo-subtitle">
                            (Applications for Fall 2021 - Winter 2022)
                        </h3>
                    </span>
                </div>

            </BrowserRouter>
        );
    }
}

export default GetInvolved;

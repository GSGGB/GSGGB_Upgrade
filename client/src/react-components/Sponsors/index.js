import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Image, Row, Col } from "react-bootstrap";

import "./styles.css";
import "./styles-mobile.css";
import { PLATINUM, GOLD, SILVER, BRONZE, PARTNERS, SPECIAL } from './sponsors.js';

class Sponsors extends Component {
    constructor(props) {
        super(props);
        this.props.history.push("/sponsors");
        this.renderSponsors = this.renderSponsors.bind(this);
    }


    renderSponsors(sponsor) {
        return(
          <Col sm>
              <div className="img-center">
                  <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                      <Image className={`${sponsor.name}-logo`} src={sponsor.image} />
                  </a>
              </div>
          </Col>
        )
    }

    render() {
        return(
            <BrowserRouter forceRefresh={true}>
              <div className="white-background-section">
                  <br /><br />
                  <div class="sponsors-title-section">
                      <h2 className="page-title">OUR SPONSORS</h2>
                      <br />
                      <h4 className="page-subtitle">Thank-you to our sponsors for supporting GSGGB and its chapters!</h4>
                  </div>
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-title-separator" />
                      <br />
                      <h4 className="platinum-header">PLATINUM: Awarded to sponsors with a contribution of $1000 or more.</h4>
                      <br />
                      <Row>
                          {PLATINUM.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
              <div className="cloud-background-section">
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-section-separator" />
                      <br /><br />
                      <h4 className="gold-header">GOLD: Awarded to sponsors with a contribution of $500 or more.</h4>
                      <br />
                      <Row>
                          {GOLD.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
              <div className="white-background-section">
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-section-separator" />
                      <br /><br />
                      <h4 className="silver-header">SILVER: Awarded to sponsors with a contribution of $250 or more.</h4>
                      <br />
                      <Row>
                          {SILVER.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
              <div className="cloud-background-section">
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-section-separator" />
                      <br /><br />
                      <h4 className="bronze-header">BRONZE: Awarded to sponsors with a contribution of $100 or more.</h4>
                      <br />
                      <Row>
                          {BRONZE.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
              <div className="white-background-section">
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-section-separator" />
                      <br /><br />
                      <h4 className="partner-header">Thanks to our U of T club partners for their support!</h4>
                      <br />
                      <Row>
                          {PARTNERS.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
              <div className="cloud-background-section">
                  <div className="container" id="logo-spacing">
                      <hr className="sponsors-section-separator" />
                      <br /><br />
                      <h4 className="orange-header">A special thank-you to the Rare Disease Foundation for our partnership!</h4>
                      <br />
                      <Row>
                          {SPECIAL.map(this.renderSponsors)}
                      </Row>
                  </div>
              </div>
            </BrowserRouter>
        )
    }
}

export default Sponsors;

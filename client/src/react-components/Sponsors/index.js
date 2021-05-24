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
        document.title = "GSGGB U of T | Sponsors";
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
              <br /><br />
              <div className="sponsors-title-section">
                  <h2 className="sponsors-page-title">OUR SPONSORS</h2>
                  <br />
                  <h4 className="sponsors-page-subtitle">Thank-you to our sponsors for supporting GSGGB and its chapters!</h4>
              </div>

              <br /><br /><br />
              <h4 className="sponsors-header" id="platinum-sponsor">PLATINUM: Awarded to sponsors with a contribution of $1000 or more.</h4>
              <br />
              <div className="container">
                  <Row>
                      {PLATINUM.map(this.renderSponsors)}
                  </Row>
              </div>
              <br />

              <br /><br />
              <h4 className="sponsors-header" id="gold-sponsor">GOLD: Awarded to sponsors with a contribution of $500 or more.</h4>
              <br />
              <div className="container">
                  <Row>
                      {GOLD.map(this.renderSponsors)}
                  </Row>
              </div>
              <br/>

              <br /><br />
              <h4 className="sponsors-header" id="silver-sponsor">SILVER: Awarded to sponsors with a contribution of $250 or more.</h4>
              <br />
              <div className="container">
                  <Row>
                      {SILVER.map(this.renderSponsors)}
                  </Row>
              </div>
              <br/>

              <br /><br />
              <h4 className="sponsors-header" id="bronze-sponsor">BRONZE: Awarded to sponsors with a contribution of $100 or more.</h4>
              <br />
              <div className="container">
                  <Row>
                      {BRONZE.map(this.renderSponsors)}
                  </Row>
              </div>

              <br /><br />
              <h4 className="sponsors-header" id="partner-sponsor">Thanks to our U of T club partners for their support!</h4>
              <br />
              <div className="container">
                  <Row>
                      {PARTNERS.map(this.renderSponsors)}
                  </Row>
              </div>

              <br /><br />
              <h4 className="sponsors-header" id="special-sponsor">A special thank-you to the Rare Disease Foundation for our partnership!</h4>
              <br />
              <div className="container">
                  <Row>
                      {SPECIAL.map(this.renderSponsors)}
                  </Row>
              </div>
            </BrowserRouter>
        )
    }
}

export default Sponsors;

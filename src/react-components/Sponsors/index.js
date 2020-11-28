import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Image, Row, Col, Modal, ModalBody, Card, Button } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

import "./styles.css";
import "./styles-mobile.css";
import { PLATINUM, GOLD, SILVER, BRONZE, PARTNERS, SPECIAL } from './sponsors.js';

const Sponsors = () => {

  const renderSponsors = (sponsor) => {
    return (
      <Col sm>
          <div class="img-center">
            <a href={sponsor.link} target="_blank"><Image className={`${sponsor.name}-logo`} src={sponsor.image} /></a>
          </div>
      </Col>
    );
  };

    return (
          <BrowserRouter forceRefresh={true}>
          <div>
              <div class="container">
                  <br />
                  <h3 className="platinum-subtitle">Platinum</h3>
                    <Row>
                      {PLATINUM.map(renderSponsors)}
                    </Row>
                  <br />
                  <h3 className="gold-subtitle">Gold</h3>
                    <Row>
                      {GOLD.map(renderSponsors)}
                    </Row>
                  <br />
                  <h3 className="silver-subtitle">Silver</h3>
                    <Row>
                      {SILVER.map(renderSponsors)}
                    </Row>
                  <br />
                  <h3 className="bronze-subtitle">Bronze</h3>
                    <Row>
                      {BRONZE.map(renderSponsors)}
                    </Row>
                  <br />
                  <h3 className="partner-subtitle">Partners</h3>
                    <Row>
                      {PARTNERS.map(renderSponsors)}
                    </Row>
                  <h3 className="orange-subtitle">Special Thank You</h3>
                     <Row>
                      {SPECIAL.map(renderSponsors)}
                    </Row>
                  <br />
               </div>
            </div>
          </BrowserRouter>
        );
}

export default Sponsors;
